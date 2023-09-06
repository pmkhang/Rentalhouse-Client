import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('persist:auth');
    console.log('token: ', token);
    return config;
  },
  (error) => {
    console.log('Error Instance Axis: ', error);
    return Promise.reject(error);
  },
);

export default instance;
