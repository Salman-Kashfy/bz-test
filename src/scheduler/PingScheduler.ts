import cron from 'node-cron';

/* 
    Scheule Job for every 5 mins
*/
export function pingScheduler(): cron.ScheduledTask {
    return cron.schedule('*/5 * * * * *', () => {
        console.log('hello world');
    });
}