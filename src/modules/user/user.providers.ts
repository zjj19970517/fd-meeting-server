import {
  DataBaseProviderName,
  RepositoryProvideNames,
} from 'src/constants/provider-names';

import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';

export const UserProviders = [
  // 用户表 users
  {
    provide: RepositoryProvideNames.USER_REPOSITORY,
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(User),
    inject: [DataBaseProviderName.MYSQL_DATA_SOURCE],
  },
  // 角色表 roles
  {
    provide: RepositoryProvideNames.ROLE_REPOSITORY,
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(Role),
    inject: [DataBaseProviderName.MYSQL_DATA_SOURCE],
  },
  // 权限表 permissions
  {
    provide: RepositoryProvideNames.PERMISSION_REPOSITORY,
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(Permission),
    inject: [DataBaseProviderName.MYSQL_DATA_SOURCE],
  },
];
