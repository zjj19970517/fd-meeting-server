import { IConfig } from './configuration';

export const genDevelopmentConfig = (): IConfig => {
  return {
    port: process.env.PORT,
    mysql: {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      logging: true,
      synchronize: true,
      poolSize: 10,
      connectorPackage: 'mysql2',
    },
  };
};
