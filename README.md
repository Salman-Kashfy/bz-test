# Overview

A lightweight monitoring service that periodically executes HTTP requests, stores the results, and streams updates to clients in real time.

# Installation

Take a fresh pull of the repository, run the CLI commands given below:

`npm i` - Install the npm dependencies\
`docker-compose up -d` - Install Docker images of PostgreSQL and Redis\
`npm run dev` — start the app in development mode

#### Additional Scripts:

- `npm run build` — compile TypeScript to JavaScript
- `npm start` — run the compiled app

#### .env variable (Provided in Repo)

```
NODE_PORT
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB
POSTGRES_PORT
TYPEORM_URL
TYPEORM_SYNCHRONIZE
TYPEORM_LOGGING
REDIS_PORT
REDIS_URL
```

#### Table Schema (Auto created on app start)

```sql
CREATE TABLE public.pings (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    status_code integer NOT NULL,
    response_time integer NOT NULL,
    is_anomaly boolean NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    amzn_trace_id text NULL,
    payload jsonb NULL,
    z_score numeric(10, 2) NULL,
    f_response_time numeric(10, 2) NULL
);
```

# Tech Stack

Backend: Node.js / Express / Typescript\
Frontend: React.js\
Design System: React MUI\
Database: PostgresQL / Redis\
Testing: Jest\
Cloud Server: AWS\
ORM: TypeORM\
Git:  GitHub / Github Actions

For BE, we chose node.js, its a great choice for handling real-time events.

For FE, we chose React.js, its best for small to mediem size projects.

For DB, we chose PostgreSQL, best for structured data and native JSON support on column level.

For ORM, we chose TypeORM. Highly stable and supports auto syncing of schema.

For Cloud Server, I use AWS. I already have a paid EC2 instance. 

# Architecture

The application is organized around a simple monitoring loop:

1. The HTTP server starts in [src/index.ts](src/index.ts).
2. A cron job in [src/scheduler/PingScheduler.ts](src/scheduler/PingScheduler.ts) triggers the monitoring flow on a schedule.
3. The ping logic lives in [src/schema/ping/model.ts](src/schema/ping/model.ts), which performs the outbound request, measures latency, and saves the result. We use POST method for HTTP request. That's simply because sending a JSON payload on GET requests require more encryption, where most browsers accepts URL size not more than 2000 characters.
4. Data persistence is handled through TypeORM and PostgreSQL via [src/ormconfig.ts](src/ormconfig.ts) and [src/database/entity/Ping.ts](src/database/entity/Ping.ts).
5. Redis in [src/database/redis.ts](src/database/redis.ts) is used for real-time event broadcasting.
6. External clients access the data through endpoints in [src/endpoints/ping.ts](src/endpoints/ping.ts).

This gives the app a clear flow: schedule → send request → persist result → publish event → stream to clients.

## Core component selected

The component I consider most central is [src/schema/ping/model.ts](src/schema/ping/model.ts), specifically the `PingModel.send()` method.

This is the heart of the application because it carries the app’s primary business responsibility:

- generate a ping payload
- call the external HTTP endpoint
- capture latency and status information
- persist the result to the database
- publish the event for downstream subscribers

Without this component, the scheduler has nothing to execute, the API has no data to serve, and the streaming layer has nothing to broadcast.

## Strategic Descision Making

The ping endpoint returns Headers and Payload of our own HTTP request, we needed some data to apply statistical calculations. Hence we concluded monitoring the ping response time will be a good idea as it covers all of our requirements.

### Choosing a wise scheduler

We needed a scheduler to ping the given endpoint. To achieve this, we had two options.
1. setInterval 
2. Cron Jobs

We chose `node-cron`, since predictable, wall-clock-aligned ticks are a better fit for a monitoring service than an interval that resets on every deploy.

### Broadcasting Real-time Updates

We have three ways to keep our UI updated with the latest changes.

1. setTimeout on client side.
2. Websockets
3. SSE (Server Side Events)

We chose SSE. The reasons are as follows:

1. setTimeout is inaccurate, constantly ping the server to check for updates. This brings redundancy.

2. Websockets is a good choice, it keeps connection alive for both ends i.e client and server where communication can happen both ways. This also brings redundancy as we require only one way commuinication which is from server to client.

3. Server side events is a solid choice for this. Supports one way communication, clients are subscribed to an endpoint and the connection is kept alive. On other end, server publishes event on that endpoint. Client keeps receiving updates until its connection is closed.

### Recommended test coverage for the core component

The most important tests should target `PingModel.send()` because that is the real operational center of the app.

Suggested comprehensive test cases:

- generates a valid payload with expected fields
- calls the external endpoint with the correct request body
- measures response time and stores it in the database
- saves the `statusCode`, `amznTraceId`, and payload correctly
- publishes a `ping.created` event after the save succeeds
- handles failures from the HTTP request and does not silently corrupt state
- preserves transaction integrity when persistence or publishing fails

# AI Enhancement Challenge

This was entirely optional but since it was mentioned relevant to the work in Bizscout, I decided to give it a shot.

I decided to go with Option A.

## Anomaly Detection System

### Rolling Statistics

We calculated the `mean` and `standard deviation` in a 1 hour window. The formula is given below:

`mean` = (x₁ + x₂ + ... + xₙ) / n 

where x₁...xₙ are the response times within the rolling window, and n is the count of data points.

For sample standard deviation:

`std_dev` = √[ Σ(xᵢ − mean)² / (n − 1) ]

where xᵢ is each response time in the window, mean is the average calculated above, 
and n is the number of data points in the window.

### Anomaly Detection

To detect anomaly, we calculated the `z-score` of a single responseTime and checked it against a threshold value. We used a bollean flag `isAnomaly` in case it exceed threshold.

#### Formula:

`zScore` = (xᵢ - mean) / stddev

where xᵢ is a single response time

We have kept a sensitive threshold value `1`, Usually a threshold value of 2 is also acceptable.

### Predicting Next Response Time

To predict the next response time, we need the following data:

`prevResponseTime` - A most recent response time\
`currentResponseTime` - Current response time during forecast cycle.

#### Formula:

`nextForecast` = alpha * currentResponseTime + (1 - alpha) * prevResponseTime;

where `alpha` is a smoothing factor. A higher alpha value means a data with a higher noise factor. `0.2` - `0.3` is considered a default value in most cases. Also, for alpha `0.3`.

### Triggering Alert on 

As the data is shown in real-time, any anomaly detected will show an alert on the top bar and its kept active until the anomaly goes away. Here we monitor the key `isAnomaly` boolean.

### Visualize real-time data.

Every calculation we have made are displayed real-time i.e zScore, anomaly and forecast response time.


# Future improvements

- We can use graphs, pie or bar charts to further plot the response time, z-score and prediction errors.
- 24-hour window in addition to 1-hour


# Deployment process

1. Login to AWS EC2 or any other cloud platform via pem/ppk file.
2. Go to your prefered directory and take git pull. Repo is kept public.
3. Setup .env given in repo and use installation scripts as provided above.
4. Setup nginx with desired port and project root.
5. Use pm2 to serve app.
