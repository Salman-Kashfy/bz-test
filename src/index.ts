import express, {Request, Response} from "express";
import cookieParser from 'cookie-parser'
import {ApolloServer, Config, ExpressContext} from 'apollo-server-express';
import schema from './shared/directives/loadSchema';
import connection from "./database/connection";
import { userLogin } from "./endpoints/user";
import {basePath, disableAuthAccess, disableGraphqlIntrospection, getFakeAuth, NODE_ENV} from './shared/config'
import { config }  from "dotenv"
import Context from "./schema/context";
import handleAuth from "./handleAuth";
import bodyParser from 'body-parser';
import cors from 'cors'
import https from 'https'
import fs from 'fs'

/**
 * Setup application config and environment variables.
 * */
config()
const app:any = express()
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

/**
* Configure cors. Whitelist origins for storing http only cookie on client-side.
* */
const allowedOrigins = ['https://app.cloudfitnest.com','https://dev.cloudfitnest.com','https://studio.apollographql.com','https://localhost','https://localhost:3000'];
const corsOptions = {
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
    credentials: true
};
app.use(cors(corsOptions));
const port = process.env.NODE_PORT || 6001;
const prefix = 'api';

/**
* Setup context with auth
* */
let authContext:any
const setupAuthContext = async (connection: any, schema: any, req: any) => {
    let auth
    if (disableAuthAccess) {
        auth = getFakeAuth()
    }else{
        const { user }: any = await handleAuth({ req });
        auth = user
    }
    if(!authContext){
        authContext =  Context.getInstance(connection, schema, req, auth);
    }
    return authContext
};

declare module 'express' {
    export interface Request {
        user?: any;
        file_uploaded?: any;
    }
}

(async () => {
    await connection.initialize();

    try{
        /**
         * Application routes
         * */
        app.get(`/${prefix}/health`, async (req:Request,res:Response) => {
            res.json({ message: 'Kudos!' })
            return
        })
        app.post(`/${prefix}/login`, userLogin)

        /**
         * Provide schema and resolvers to apollo server instance.
         * */
        const server = new ApolloServer({
            schema,
            introspection: !disableGraphqlIntrospection,
            async context({ req }) {
                if(authContext){
                    const { user }: any = await handleAuth({ req });
                    authContext.setReq(req)
                    authContext.setAuth(user)
                }
                const ctx = authContext || await setupAuthContext(connection, schema, req);
                ctx.req = req;
                return ctx;
            },
        } as Config<ExpressContext>)

        /**
        * Kickoff apollo and express server.
        * */
        await server.start();
        server.applyMiddleware({ app, path: '/graphql', cors: { origin: allowedOrigins, credentials: true } });
        if(process.env.NODE_HOST?.indexOf('https') !== -1 && process.env.NODE_ENV === NODE_ENV.local){
            const sslOptions = {
                key: fs.readFileSync(process.env.SSL_PRIVATE_KEY || '' ),
                cert: fs.readFileSync(process.env.SSL_CERTIFICATE || '' ),
            }
            https.createServer(sslOptions, app).listen(port , () => console.log(`Https server ready at ${basePath}`))
        }else{
            app.listen(port , () => console.log(`Server ready at ${basePath}`))
        }

    }catch (e) {
        console.log(e)
    }
})()