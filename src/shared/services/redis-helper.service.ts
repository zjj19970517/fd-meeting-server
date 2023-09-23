import { RedisClientType } from 'redis';
import { Inject, Injectable } from '@nestjs/common';

import { DataBaseProviderName } from 'src/constants/provider-names';

@Injectable()
export class RedisHelperService {
  @Inject(DataBaseProviderName.REDIS_DATA_SOURCE)
  private redisClient: RedisClientType;

  /**
   * 获取某个 key 的值
   * @param key
   * @returns
   */
  async get(key: string) {
    return await this.redisClient.get(key);
  }

  /**
   * 设置某个 key 的值（可配置过期时间）
   * @param key
   * @param value
   * @param ttl
   */
  async set(key: string, value: string | number, ttl?: number) {
    await this.redisClient.set(key, value);
    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }
}
