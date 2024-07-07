import * as crypto from 'crypto';

const SALT = '#132A4FDS42#';

/**
 * md5 加密字符串
 * @param str
 * @returns
 */
export const md5Encrypt = (str: string) => {
  const hash = crypto.createHash('md5');
  hash.update(SALT + str + SALT);
  return hash.digest('hex');
};
