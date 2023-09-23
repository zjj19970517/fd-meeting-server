import { IConfig } from './configuration';

export const genProductionConfig = (): IConfig => {
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
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
    email: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      accessTokenExpiresTime: process.env.JWT_ACCESS_TOKEN_EXPIRES_TIME,
      refreshTokenExpiresTime: process.env.JWT_REFRESH_TOKEN_EXPIRES_TIME,
    },
  };
};
