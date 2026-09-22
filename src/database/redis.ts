import Redis from 'ioredis';

const redis = {
    enable: process.env.REDIS_ENABLE === 'true',
    defaultLongExpiryTimeInSec: 86400 * 2, // 86400 = a day
    defaultMediumExpiryTimeInSec: 3600, // 3600 = 1 hour
    defaultShortExpiryTimeInSec: 300, // 300 = 5 min
    connection: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: Number(process.env.REDIS_PORT || 6380),
    },
}

class RedisClient {
    static options = {
        port: redis.connection.port, // Redis port
        host: redis.connection.host, // Redis host
        db: 0, // Defaults to 0
        connectTimeout: 5000,
        password: process.env.REDIS_PASSWORD
    };

    static client = redis.enable ? new Redis(RedisClient.options) : null;

    static async get(key: string, params:any = null) {
        if (redis.enable) {
            let res: any;
            try {
                res = await RedisClient.client?.get(key);
            } catch (error) {
                console.log('Error getting the cache', error);
                return null;
            }
            if (res && params && params.parse) {
                res = JSON.parse(res);
            }
            return res;
        }
        return null;
    }

    static async set(key: string, value: any, params: any) {
        if (redis.enable) {
            try {
                await RedisClient.client?.set(
                    key,
                    value,
                    'EX',
                    params?.ex ? params.ex : redis.defaultShortExpiryTimeInSec
                );
            } catch (error) {
                console.log('Error setting the cache', error);
            }
        }
    }

    static async delete(key: string) {
        if (redis.enable) {
            let res: any;
            try {
                res = await RedisClient.client?.del(key);
            } catch (error) {
                console.log('Error deleting the cache', error);
                return null;
            }
            return res;
        }
        return null;
    }
}

export default RedisClient;