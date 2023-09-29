import { __DEV__ } from '../utils/env.utils';
import { genDevelopmentConfig } from './configuration.development';
import { genProductionConfig } from './configuration.production';

export interface IConfig {
  port: string | number; // 应用端口
  timeout: string; // 超时
  mysql: {
    host: string;
    port: number | string;
    username: string;
    password: string;
    database: string;
    logging: boolean;
    synchronize: boolean;
    poolSize: number;
    connectorPackage: 'mysql' | 'mysql2';
  };
  redis: {
    host: string;
    port: string;
  };
  email: {
    user: string;
    pass: string;
  };
  jwt: {
    secret: string;
    accessTokenExpiresTime: string;
    refreshTokenExpiresTime: string;
  };
}

export default (): IConfig => {
  if (__DEV__) {
    return genDevelopmentConfig();
  }
  return genProductionConfig();
};
