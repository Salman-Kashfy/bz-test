import { Router, Request, Response } from 'express';
import PingModel from '../schema/ping/model';
import Context from '../schema/context';

export default function createPingRouter(connection: any) {
    const router = Router();
    const ctx:Context = Context.setupCtx(connection);

    /** GET /api/ping — list all active pings */
    router.get('/', async (req: Request, res: Response) => {
        try {
            res.json({ status: true, name: 'salman kashfy' });
        } catch (e: any) {
            res.status(500).json({ status: false, message: e.message });
        }
    });

    /** GET /api/ping — list all active pings */
    router.get('/test', async (req: Request, res: Response) => {
        try {
            res.json({ status: true, name: ctx.ping.test() });
        } catch (e: any) {
            res.status(500).json({ status: false, message: e.message });
        }
    });

    return router;
}
