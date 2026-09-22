import express, { Request, Response } from 'express';

import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import connection from './database/connection';
import createPingRouter from './endpoints/ping';
import Context from "./schema/context";

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
    'https://localhost:3000',
    'http://localhost:3000',
];
app.use(cors({ origin: allowedOrigins, optionsSuccessStatus: 200, credentials: true }));

const port = process.env.NODE_PORT || 5000;
const prefix = 'api';

export const setupWithoutAuthContext = (connection: any) => {
    return Context.setupWithoutAuthContext(connection);
};


(async () => {
    await connection.initialize();
    setupWithoutAuthContext(connection);

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