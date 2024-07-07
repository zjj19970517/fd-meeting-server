import { SetMetadata } from '@nestjs/common';

import { OverrideNames } from 'src/constants/override-names';

// 需要登录
export const NeedLogin = () => SetMetadata(OverrideNames.NEED_LOGIN, true);

// 需要授权
export const NeedPermissions = (...permissions: string[]) =>
  SetMetadata(OverrideNames.NEED_PERMISSIONS, permissions);
