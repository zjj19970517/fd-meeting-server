import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import entities from '../../../entities';

/**
 * TypeORM 配置选项
 * @param configService
 * @returns
 */
export const createTypeOrmOptions = (configService: ConfigService) => {
  return {
    type: 'mysql',
    host: configService.get<string>('mysql.host'),
    port: configService.get<number>('mysql.port'),
    username: configService.get<string>('mysql.username'),
    password: configService.get<string>('mysql.password'),
    database: configService.get<string>('mysql.database'),
    synchronize: configService.get<boolean>('mysql.synchronize'),
    logging: configService.get<boolean>('mysql.logging'),
    entities,
    poolSize: configService.get<number>('mysql.poolSize'),
    connectorPackage: configService.get<'mysql' | 'mysql2'>(
      'mysql.connectorPackage',
    ),
    extra: {
      authPlugin: 'sha256_password',
    },
  } as TypeOrmModuleOptions;
};
