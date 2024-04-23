export declare class RedisService {
    private redisClient;
    get(key: string): Promise<string>;
    set(key: string, value: string | number, ddl?: number): Promise<void>;
}
