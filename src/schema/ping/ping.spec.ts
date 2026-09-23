jest.mock('@faker-js/faker', () => ({
    faker: {
        lorem: {
            sentence: jest.fn(() => 'Mocked sentence'),
        },
        person: {
            fullName: jest.fn(() => 'Mock User'),
        },
    },
}));

jest.mock('../../database/redis', () => ({
    __esModule: true,
    default: {
        publish: jest.fn().mockResolvedValue(undefined),
    },
}));

jest.mock('axios', () => ({
    __esModule: true,
    default: {
        post: jest.fn(),
    },
}));

import axios from 'axios';
import RedisClient from '../../database/redis';
import PingModel from './model';

describe('PingModel', () => {
    const repository = {
        findAndCount: jest.fn(),
        find: jest.fn(),
        save: jest.fn(),
        query: jest.fn(),
    };

    const connection = {
        getRepository: jest.fn().mockReturnValue(repository),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        axios.post = jest.fn();
    });

    it("should send a ping and save the result", async () => {
        const model = new PingModel(connection as any);
        const dateNowSpy = jest.spyOn(Date, 'now')
            .mockReturnValueOnce(1000)
            .mockReturnValueOnce(1250);

        axios.post = jest.fn().mockResolvedValue({
            status: 200,
            data: {
                headers: {
                    "X-Amzn-Trace-Id": "trace-xyz"
                }
            }
        });

        const savedPing = {
            id: "ping-123",
            amznTraceId: "trace-xyz",
            responseTime: 250,
            statusCode: 200,
        };
        repository.save = jest.fn().mockResolvedValue(savedPing);
        repository.query = jest.fn().mockResolvedValue([{
            mean: '250',
            stddev: null,
        }]);
        repository.find.mockResolvedValue([]);

        const result = await model.send();

        expect(axios.post).toHaveBeenCalledWith(
            'https://httpbin.org/anything',
            {
                title: 'Mocked sentence',
                author: 'Mock User',
            },
        );
        expect(repository.save).toHaveBeenCalledWith({
            amznTraceId: 'trace-xyz',
            responseTime: 250,
            statusCode: 200,
            fResponseTime: 250,
            zScore: 0,
            isAnomaly: false,
            payload: {
                title: 'Mocked sentence',
                author: 'Mock User',
            },
        });
        expect(repository.query).toHaveBeenCalledWith(expect.stringContaining(
            "STDDEV_SAMP(response_time)",
        ));
        expect(RedisClient.publish).toHaveBeenCalledWith(
            'ping.created',
            JSON.stringify(savedPing),
        );

        expect(result.response.headers["X-Amzn-Trace-Id"])
            .toBe("trace-xyz");

        dateNowSpy.mockRestore();
    });

    it("should propagate an axios failure without saving or publishing", async () => {
        const model = new PingModel(connection as any);
        const requestError = new Error("HTTP request failed");

        (axios.post as jest.Mock).mockRejectedValue(requestError);

        await expect(model.send()).rejects.toBe(requestError);

        expect(repository.save).not.toHaveBeenCalled();
        expect(RedisClient.publish).not.toHaveBeenCalled();
    });

    it("should return paginated pings", async () => {
        const model = new PingModel(connection as any);
        const pings = [
            { id: "ping-1" },
            { id: "ping-2" },
        ];

        repository.findAndCount.mockResolvedValue([pings, 5]);

        const result = await model.getAll(2, 2);

        expect(repository.findAndCount).toHaveBeenCalledWith({
            order: {
                createdAt: 'DESC',
            },
            skip: 2,
            take: 2,
        });
        expect(result).toEqual({
            data: pings,
            pagination: {
                page: 2,
                limit: 2,
                total: 5,
                totalPages: 3,
            },
        });
    });

    it("should calculate the response-time mean and standard deviation for the last hour", async () => {
        const model = new PingModel(connection as any);
        const statistics = { mean: '250', stddev: '25' };

        repository.query.mockResolvedValue([statistics]);

        const result = await model.calcStdDev();

        expect(repository.query).toHaveBeenCalledWith(expect.stringContaining(
            "SELECT AVG(response_time) AS mean, STDDEV_SAMP(response_time) AS stddev",
        ));
        expect(repository.query).toHaveBeenCalledWith(expect.stringContaining(
            "FROM pings",
        ));
        expect(repository.query).toHaveBeenCalledWith(expect.stringContaining(
            "WHERE created_at >= NOW() - INTERVAL '1 hour'",
        ));
        expect(result).toEqual(statistics);
    });

    it("should return the current response time as the first forecast", async () => {
        const model = new PingModel(connection as any);
        repository.find.mockResolvedValue([]);

        await expect(model.nextForecast(100)).resolves.toBe(100);
    });

    it("should calculate the next forecast from the previous forecast", async () => {
        const model = new PingModel(connection as any);
        repository.find.mockResolvedValue([{ fResponseTime: 80 }]);

        await expect(model.nextForecast(100)).resolves.toBe(86);
    });

    it("should return the latest ping", async () => {
        const model = new PingModel(connection as any);
        const latestPing = {
            id: "latest",
            createdAt: new Date()
        };

        repository.find.mockResolvedValue([latestPing]);

        const result = await model.getLatest();

        expect(result).toBe(latestPing);
    });

    // getLatest() empty case
    it("should return undefined when no pings exist", async () => {
        const model = new PingModel(connection as any);
        repository.find.mockResolvedValue([]);
        const result = await model.getLatest();
        expect(result).toBeUndefined();
    });
});
