import axiosConfig from '../axiosConfig';

export const apiGetPrices = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'get',
        url: '/api/v1/price/all-prices',
      });
      resolve(response);
    } catch (error) {
      console.log('Error apiGetPrices: ', error);
      reject(error);
    }
  });

export const apiGetAcreages = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'get',
        url: '/api/v1/acreage/all-acreages',
      });
      resolve(response);
    } catch (error) {
      console.log('Error apiGetAcreages: ', error);
      reject(error);
    }
  });
