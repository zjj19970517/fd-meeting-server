import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { DataBaseProviderName } from 'src/constants/DBType';

export const DataBaseProviders = [
  {
    provide: DataBaseProviderName.MYSQL_DATA_SOURCE,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const config: DataSourceOptions = {
        type: 'mysql',
        host: configService.get<string>('mysql.host'),
        port: configService.get<number>('mysql.port'),
        username: configService.get<string>('mysql.username'),
        password: configService.get<string>('mysql.password'),
        database: configService.get<string>('mysql.database'),
        synchronize: configService.get<boolean>('mysql.synchronize'),
        logging: configService.get<boolean>('mysql.logging'),
        entities: [],
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
];
