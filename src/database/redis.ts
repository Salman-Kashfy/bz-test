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
    private static client: Redis | null = null;
    private static subscriber: Redis | null = null;
    private static listeners = new Map<string, Set<(message: string) => void>>();
    private static redisSuffix = 'bz'

    private static isEnabled() {
        return process.env.REDIS_ENABLE === 'true' || Boolean(process.env.REDIS_URL);
    }

    private static createConnection() {
        if (process.env.REDIS_URL) {
            return new Redis(process.env.REDIS_URL);
        }

        return new Redis({
            port: redis.connection.port,
            host: redis.connection.host,
            db: 0,
            connectTimeout: 5000,
            password: process.env.REDIS_PASSWORD,
        });
    }

    private static getClient() {
        if (!RedisClient.client) {
            RedisClient.client = RedisClient.createConnection();
        }
        return RedisClient.client;
    }

    private static async getSubscriber() {
        if (!RedisClient.subscriber) {
            RedisClient.subscriber = RedisClient.getClient().duplicate();
            RedisClient.subscriber.on('message', (channel, message) => {
                RedisClient.listeners.get(channel)?.forEach((listener) => listener(message));
            });
        }
        return RedisClient.subscriber;
    }

    static async get(key: string, params:any = null) {
        if (RedisClient.isEnabled()) {
            let res: any;
            try {
            res = await RedisClient.getClient().get(key + `:${RedisClient.redisSuffix}`);
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
        if (RedisClient.isEnabled()) {
            try {
            await RedisClient.getClient().set(
                    key + `:${RedisClient.redisSuffix}`,
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
        if (RedisClient.isEnabled()) {
            let res: any;
            try {
            res = await RedisClient.getClient().del(key + `:${RedisClient.redisSuffix}`);
            } catch (error) {
                console.log('Error deleting the cache', error);
                return null;
            }
            return res;
        }
        return null;
    }

    static async publish(channel: string, message: string) {
        if (!RedisClient.isEnabled()) {
            return;
        }

        try {
            await RedisClient.getClient().publish(channel, message);
        } catch (error) {
            console.log('Error publishing Redis message', error);
        }
    }

    static async subscribe(channel: string, listener: (message: string) => void) {
        if (!RedisClient.isEnabled()) {
            return () => undefined;
        }

        const subscriber = await RedisClient.getSubscriber();
        let channelListeners = RedisClient.listeners.get(channel);
        if (!channelListeners) {
            channelListeners = new Set();
            RedisClient.listeners.set(channel, channelListeners);
            await subscriber.subscribe(channel);
        }
        channelListeners.add(listener);

        return async () => {
            const listeners = RedisClient.listeners.get(channel);
            listeners?.delete(listener);
            if (listeners?.size === 0) {
                RedisClient.listeners.delete(channel);
                await subscriber.unsubscribe(channel);
            }
        };
    }
}

export default RedisClient;