/* 所有数据库表集合 */

import { User } from '@modules/user/entities/user.entity';
import { Role } from '@modules/user/entities/role.entity';
import { Permission } from '@modules/user/entities/permission.entity';

export default [
  // 用户表
  User,
  // 角色表
  Role,
  // 权限表
  Permission,
];
