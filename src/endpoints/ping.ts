import { Router, Request, Response } from 'express';
import Context from '../schema/context';
import RedisClient from '../database/redis';

export default function createPingRouter(connection: any) {
    const router = Router();
    const ctx:Context = Context.setupCtx(connection);

    router.get('/list', async (req: Request, res: Response) => {
        try {
            const page = Number(req.query.page || 1);
            const limit = 10
            const data = await ctx.ping.getAll(page, limit);
            res.json({ status: true, data });
        } catch (e: any) {
            res.status(500).json({ status: false, message: e.message });
        }
    });

    router.get('/send', async (req: Request, res: Response) => {
        try {
            res.json({ status: true, data: await ctx.ping.send() });
        } catch (e: any) {
            res.status(500).json({ status: false, message: e.message });
        }
    });

    router.get('/stream', async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('X-Accel-Buffering', 'no');
        res.flushHeaders();

        let latestId: string | undefined;
        const sendMessage = (message: string) => {
            const ping = JSON.parse(message);
            if (!res.writableEnded && ping.id !== latestId) {
                latestId = ping.id;
                res.write(`event: ping\ndata: ${message}\n\n`);
            }
        };

        const unsubscribe = await RedisClient.subscribe('ping.created', sendMessage);

        req.on('close', () => {
            void unsubscribe();
        });

        try {
            const latest = await ctx.ping.getLatest();
            if (latest) {
                sendMessage(JSON.stringify(latest));
            }
        } catch (error) {
            if (!res.writableEnded) {
                res.write(`event: error\ndata: ${JSON.stringify({ message: (error as Error).message })}\n\n`);
            }
        }
    });

    return router;
}
