import axiosConfig from '../axiosConfig';
import axios from 'axios';

// export const apiGetPosts = () =>
//   new Promise(async (resolve, reject) => {
//     try {
//       const response = await axiosConfig({
//         method: 'get',
//         url: '/api/v1/post/all-posts',
//       });
//       resolve(response);
//     } catch (error) {
//       console.log('Error apiGetPosts: ', error);
//       reject(error);
//     }
//   });

// export const apiGetPostsLimit = (page, query) =>
//   new Promise(async (resolve, reject) => {
//     try {
//       const response = await axiosConfig({
//         method: 'get',
//         url: `/api/v1/post/all-posts-limit`,
//         params: {
//           page,
//           query,
//         },
//       });
//       resolve(response);
//     } catch (error) {
//       console.log('Error apiGetPostsLimit: ', error);
//       reject(error);
//     }
//   });

export const apiGetPostsLimit = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'get',
        url: `/api/v1/post/all-posts-limit`,
        params: query,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetNewPosts = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'get',
        url: `/api/v1/post/all-new-posts`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiUploadImages = (images) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'post',
        url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        data: images,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiCreatePost = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'post',
        url: `/api/v1/post/create-new`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      console.log('apiCreatePost error: ', error);
      reject(error);
    }
  });

export const apiGetUserPosts = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'get',
        url: `/api/v1/post/user-posts`,
        params: query,
      });
      resolve(response);
    } catch (error) {
      console.log('apiGetUserPosts error: ', error);
      reject(error);
    }
  });

export const apiUpdateUserPosts = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'put',
        url: `/api/v1/post/update-user-post`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      console.log('apiUpdateUserPosts error: ', error);
      reject(error);
    }
  });
