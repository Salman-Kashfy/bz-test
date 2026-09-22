import { Router, Request, Response } from 'express';
import Context from '../schema/context';

export default function createPingRouter(connection: any) {
    const router = Router();
    const ctx:Context = Context.setupCtx(connection);

    router.get('/list', async (req: Request, res: Response) => {
        try {
            const page = Number(req.query.page || 1);
            const limit = 2
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

    return router;
}
