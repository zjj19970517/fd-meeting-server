import {
  NeedLogin,
  NeedPermissions,
} from './guard.decorator'; /* 守卫相关的 decorator */

import { GetLoginUserInfo } from './user-info-decorator';

export {
  // api 需要登录 - 方法装饰器
  NeedLogin,
  // api 需要权限 - 方法装饰器
  NeedPermissions,
  // 获取登录的用户信息 - 参数装饰器
  GetLoginUserInfo,
};
