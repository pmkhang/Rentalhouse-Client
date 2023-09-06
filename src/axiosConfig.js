import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('persist:auth');
//     console.log('token: ', token);
//     return config;
//   },
//   (error) => {
//     console.log('Error Instance Axis: ', error);
//     return Promise.reject(error);
//   },
// );

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // Logic add token
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
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // Refresh Token
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('=>> Response Error: ', error);
    return Promise.reject(error);
  },
);

export default instance;
