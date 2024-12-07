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

  Cookies.set(ACCESS_TOKEN_KEY, accessToken, { expires: (1 / 24) * 0.5});

  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { expires: 7});
};

export const getAccessToken = (): string | undefined => {
  const token = Cookies.get(ACCESS_TOKEN_KEY);
  
  if (!token) {
    console.log('Access Token not found in cookies.'); 
  } else {
    console.log('Access Token Retrieved:', token); 
  }

  return token;
};

export const getRefreshToken = (): string | undefined => {
  const token = Cookies.get(REFRESH_TOKEN_KEY);
  console.log('Refresh Token Retrieved:', token);  
  return token;
};

export const removeTokens = () => {
  console.log('Removing tokens from cookies');
  Cookies.remove(ACCESS_TOKEN_KEY, { path: '/' });
  Cookies.remove(REFRESH_TOKEN_KEY, { path: '/' });
};

/**
 * @param token
 * @returns {boolean}   
 */
const isAccessTokenExpired = (token: string): boolean => {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = decoded.exp * 1000; 
    return expirationTime < Date.now(); 
  } catch (error) {
    console.error('Error decoding access token:', error);
    return true;
  }
};


export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    console.log('No refresh token available');
    return null;
  }

  try {
    const response = await fetch('http://localhost:8000/api/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();

    if (data.status === 'success' && data.token.accessToken) {
      const newAccessToken = data.token.accessToken;
      console.log('New Access Token:', newAccessToken);

      setTokens(newAccessToken, refreshToken);
      return newAccessToken; 
    }

    return null;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
};

export const getValidAccessToken = async (): Promise<string | null> => {
  const accessToken = getAccessToken();

  if (accessToken && !isAccessTokenExpired(accessToken)) {
    return accessToken;
  }

  console.log('Access token is expired or not available. Attempting to refresh token...');

  const newAccessToken = await refreshAccessToken();

  if (newAccessToken) {
    return newAccessToken; 
  }

  console.log('Failed to refresh access token.');
  return null;  
};
