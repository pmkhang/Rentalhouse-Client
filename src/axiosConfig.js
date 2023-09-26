import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api-rentalhouse-pmk.onrender.com',
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token =
      window.localStorage.getItem('persist:auth') &&
      JSON.parse(window.localStorage.getItem('persist:auth'))?.token.slice(1, -1);
    config.headers = {
      authorization: token ? `Bearer ${token}` : null,
    };
    return config;
  },
  (error) => {
    console.log('==> Request Error: ', error);
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log('=>> Response Error: ', error);
    return Promise.reject(error);
  },
);

export default instance;
