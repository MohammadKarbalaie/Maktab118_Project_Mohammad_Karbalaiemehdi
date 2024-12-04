import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

/**
 * ذخیره کردن توکن‌ها در کوکی
 * @param accessToken
 * @param refreshToken
 */
export const setTokens = (accessToken: string, refreshToken: string) => {
  console.log('Storing tokens:');
  console.log('Access Token:', accessToken);
  console.log('Refresh Token:', refreshToken);

  Cookies.set(ACCESS_TOKEN_KEY, accessToken, { expires: 4  }); // 4 ساعت
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { expires: 4  }); // 4 ساعت
};

/**
 * دریافت توکن دسترسی (access token)
 */
export const getAccessToken = (): string | undefined => {
  const token = Cookies.get(ACCESS_TOKEN_KEY);
  console.log('Access Token Retrieved:', token);
  return token;
};

/**
 * دریافت توکن رفرش (refresh token)
 */
export const getRefreshToken = (): string | undefined => {
  const token = Cookies.get(REFRESH_TOKEN_KEY);
  console.log('Refresh Token Retrieved:', token);
  return token;
};

/**
 * حذف توکن‌ها از کوکی
 */
export const removeTokens = () => {
  console.log('Removing tokens from cookies');
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
};
