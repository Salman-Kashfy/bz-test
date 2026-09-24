import express, { Request, Response } from 'express';
import path from 'path';

import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import connection from './database/connection';
import createPingRouter from './endpoints/ping';
import Context from "./schema/context";
import { pingScheduler } from './scheduler/PingScheduler';

/**
 * Setup application config and environment variables.
 */
config();

const app = express();
app.use(express.json());

app.use(bodyParser.json());

/**
 * Configure CORS.
 */
const allowedOrigins = [
    'https://localhost',
    'http://localhost:5173',
    'http://ozancube.com',
    '*',
];
app.use(cors({ origin: allowedOrigins, optionsSuccessStatus: 200, credentials: true }));

const port = process.env.NODE_PORT || 5000;
const prefix = 'api';

app.use('/coverage', express.static(path.join(process.cwd(), 'coverage', 'lcov-report')));

export const setupCtx = (connection: any) => {
    return Context.setupCtx(connection);
};


(async () => {
    await connection.initialize();
    setupCtx(connection);
    pingScheduler();

    try {
        /**
         * Health check
         */
        app.get(`/${prefix}/health`, (req: Request, res: Response) => {
            res.json({ status: true, message: 'Server is healthy.' });
        });

        /**
         * Ping routes
         */
        app.use(`/${prefix}/ping`, createPingRouter(connection));

        app.listen(port, () => console.log(`Server ready at http://localhost:${port}`));
    } catch (e) {
        console.error(e);
    }
})();