// 验证码缓存前缀
export const CaptchaCachePrefix = 'captcha';

/**
 * 获取验证码缓存 key
 * @param email
 * @returns
 */
export const getCaptchaCacheKey = (email: string) => {
  return CaptchaCachePrefix + email;
};

/**
 * 生成随机验证码
 * @returns
 */
export const genCaptchaCode = () => {
  return Math.random().toString().slice(2, 8);
};
