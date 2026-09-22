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

import axios from 'axios';
import PingModel from './model';

describe('PingModel', () => {
    const repository = {
        findAndCount: jest.fn(),
        find: jest.fn(),
        save: jest.fn(),
    };

    const connection = {
        getRepository: jest.fn().mockReturnValue(repository),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should send a ping and save the result", async () => {
        const model = new PingModel(connection as any);

        axios.post = jest.fn().mockResolvedValue({
            status: 200,
            data: {
                headers: {
                    "X-Amzn-Trace-Id": "trace-xyz"
                }
            }
        });

        repository.save = jest.fn().mockResolvedValue({
            id: "ping-123",
            amznTraceId: "trace-xyz",
            responseTime: 250,
            statusCode: 200
        });

        const result = await model.send();

        expect(axios.post).toHaveBeenCalled();
        expect(repository.save).toHaveBeenCalled();

        expect(result.response.headers["X-Amzn-Trace-Id"])
            .toBe("trace-xyz");
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
});
