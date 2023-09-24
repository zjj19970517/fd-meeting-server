import { APP_GUARD } from '@nestjs/core';

import { LoginGuard } from '../guards/login.guard';
import { PermissionGuard } from '../guards/permission.guard';

export const GuardProviders = [
  // 登录守卫
  {
    provide: APP_GUARD,
    useClass: LoginGuard,
  },
  // 权限守卫
  {
    provide: APP_GUARD,
    useClass: PermissionGuard,
  },
];
