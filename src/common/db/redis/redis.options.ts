import { ConfigService } from '@nestjs/config';
import { RedisModuleOptions } from '@nestjs-modules/ioredis';

/**
 * ioredis 配置选项
 * @param configService
 * @returns
 */
export const createIoredisOptions = (configService: ConfigService) => {
  return {
    type: 'single',
    url: `redis://${configService.get<string>(
      'redis.host',
    )}:${configService.get<string>('redis.port')}`,
  } as RedisModuleOptions;
};
