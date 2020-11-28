import axios from 'axios';
import { apiBaseUrl, userSessionKey } from 'config';

const requestInterceptor = (req) => {
  const user = window.localStorage.getItem(userSessionKey)
    ? JSON.parse(window.localStorage.getItem(userSessionKey))
    : null;

  if (user) {
    const { accessToken } = user;
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
      setAuthHeader(accessToken);
    }
  }

  return req;
};

const responseInterceptor = (res) => {
  return res.data;
};

export const init = () => {
  axios.defaults.baseURL = apiBaseUrl;
  axios.defaults.headers['Content-Type'] = 'application/json';
  axios.defaults.headers['X-Request-With'] = 'XMLHTTPRequest';
  axios.interceptors.request.use(requestInterceptor);
  axios.interceptors.response.use(responseInterceptor);
};

export const setAuthHeader = (token) => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
};

export const resetAuthHeader = () => {
  axios.defaults.headers.Authorization = undefined;
};

export const get = (url, options = null) => axios.get(url, options);

export const post = (url, data, options = null) =>
  axios.post(url, data, options);

export const put = (url, data, options = null) => axios.put(url, data, options);
