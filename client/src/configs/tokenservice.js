const ACCESS_TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refresh';

const TokenService = {
  /**
   * Manage the how Access Tokens are being stored and retrieved from storage.
   *
   * Current implementation stores to localStorage. Local Storage should always be
   * accessed through this instance.
   **/
  getToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  saveToken(accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  },

  removeToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  saveRefreshToken(refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  removeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

export default TokenService;
