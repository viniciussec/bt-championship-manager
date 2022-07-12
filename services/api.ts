import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({
  baseURL: 'http://20.248.240.40:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});

API.interceptors.request.use(
  async function (config : any) {
    const token = Cookies.get('BeachTennis.AuthToken');

    if (token !== null && token !== '') {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default API;
