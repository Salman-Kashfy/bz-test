# bz-test

A lightweight monitoring service that periodically executes synthetic HTTP requests, stores the results, and streams updates to clients in near real time.

## Architecture overview

The application is organized around a simple monitoring loop:

1. The HTTP server starts in [src/index.ts](src/index.ts).
2. A cron job in [src/scheduler/PingScheduler.ts](src/scheduler/PingScheduler.ts) triggers the monitoring flow on a schedule.
3. The ping logic lives in [src/schema/ping/model.ts](src/schema/ping/model.ts), which performs the outbound request, measures latency, and saves the result.
4. Data persistence is handled through TypeORM and PostgreSQL via [src/ormconfig.ts](src/ormconfig.ts) and [src/database/entity/Ping.ts](src/database/entity/Ping.ts).
5. Redis in [src/database/redis.ts](src/database/redis.ts) is used for real-time event broadcasting.
6. External clients access the data through endpoints in [src/endpoints/ping.ts](src/endpoints/ping.ts).

This gives the app a clear flow: schedule → send request → persist result → publish event → stream to clients.

## Core component selected

### `PingModel` as the core part

The component I consider most central is [src/schema/ping/model.ts](src/schema/ping/model.ts), specifically the `PingModel.send()` method.

This is the heart of the application because it carries the app’s primary business responsibility:

- generate a ping payload
- call the external HTTP endpoint
- capture latency and status information
- persist the result to the database
- publish the event for downstream subscribers

Without this component, the scheduler has nothing to execute, the API has no data to serve, and the streaming layer has nothing to broadcast.

### Why this is more central than the others

I chose `PingModel` over the scheduler, publishing events or other API endpoints because:

- the scheduler only triggers the behavior; it does not define the business outcome
- the API endpoints only expose or fetch the outcome; they do not generate it
- Redis only transports events; it does not create the monitoring signal itself
- PostgreSQL stores the results; it does not decide the monitoring logic

`PingModel` is the component where the meaningful work happens. It is the place where application intent becomes operational behavior.

### Core responsibilities of the chosen component

The selected core part is responsible for the following:

- creating the synthetic payload sent to the external service
- measuring round-trip latency and HTTP result status
- persisting the result with TypeORM
- notifying the rest of the application via Redis pub/sub
- making the monitored data available to both the list endpoint and the stream endpoint

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

## Scripts

- `npm run dev` — start the app in development mode
- `npm run build` — compile TypeScript to JavaScript
- `npm start` — run the compiled app
