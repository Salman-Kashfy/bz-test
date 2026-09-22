import cron from 'node-cron';
import Context from '../schema/context';
import connection from '../ormconfig';

const ctx:Context = Context.setupCtx(connection);
/* 
    Scheule Job for every 5 mins
*/
export function pingScheduler(): cron.ScheduledTask {
    return cron.schedule('*/10 * * * * *', () => {
        ctx.ping.send();
    });
}