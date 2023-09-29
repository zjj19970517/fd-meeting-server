// 验证码缓存前缀
export const CaptchaCachePrefix = 'captcha';

/**
 * 获取验证码缓存 key
 * @param email
 * @param prefix 自定义前缀
 * @returns
 */
export const getCaptchaCacheKey = (email: string, prefix?: string) => {
  return (prefix ? prefix : CaptchaCachePrefix) + '__' + email;
};

/**
 * 获取更新密码所用的验证码缓存 key
 * @param email
 * @returns
 */
export const getCaptchaCacheKeyOfUpdatePwd = (email: string) => {
  return getCaptchaCacheKey(email, 'UPDATE_PASSWORD');
};

/**
 * 生成随机验证码
 * @returns
 */
export const genCaptchaCode = () => {
  return Math.random().toString().slice(2, 8);
};
