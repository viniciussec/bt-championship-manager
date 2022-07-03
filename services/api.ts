import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
});

API.interceptors.request.use(
  async function (config) {
    const token = Cookies.get('BeachTennis.AuthToken');

    if (token !== null && token !== '') {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default API;
