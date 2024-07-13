// 用户模块 path 集
export const UserModulePaths = {
  /** @path /user */
  base: 'user',
  contents: {
    /** @path POST /user/login 用户登录 */
    login: 'login',
    /** @path POST /user/info 用户信息查询 */
    info: 'info',
    /** @path POST /user/register 注册普通用户 */
    register: 'register',
  },
};
