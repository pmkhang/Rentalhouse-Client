import axiosConfig from '../axiosConfig';

export const apiGetProvince = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'get',
        url: '/api/v1/province/all-provinces',
      });
      resolve(response);
    } catch (error) {
      console.log('Error apiGetProvince: ', error);
      reject(error);
    }
  });
