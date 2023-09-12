import axiosConfig from '../axiosConfig';

export const apiGetPosts = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'get',
        url: '/api/v1/post/all-posts',
      });
      resolve(response);
    } catch (error) {
      console.log('Error apiGetPosts: ', error);
      reject(error);
    }
  });

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
