import { createClient } from 'redis';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import entities from '../../entities';

import { DataBaseProviderName } from 'src/constants/provider-names';

export const DataBaseProviders: Array<any> = [
  // 连接 mysql
  {
    provide: DataBaseProviderName.MYSQL_DATA_SOURCE,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      console.log('配置', configService);
      const config: DataSourceOptions = {
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
      };
      const ds = new DataSource(config);
      await ds.initialize();
      return ds;
    },
  },
  // 连接 redis
  {
    provide: DataBaseProviderName.REDIS_DATA_SOURCE,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const client = createClient({
        socket: {
          host: configService.get<string>('redis.user'),
          port: configService.get<number>('redis.port'),
        },
        database: 1,
      });
      await client.connect();
      return client;
    },
  },
];
