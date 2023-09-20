import axiosConfig from '../axiosConfig';
import axios from 'axios';

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

export const apiGetPublicProvince = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'get',
        url: 'https://vapi.vnappmob.com/api/province',
      });
      resolve(response);
    } catch (error) {
      console.log('Error apiGetProvince: ', error);
      reject(error);
    }
  });

export const apiGetPublicDistrict = (provinceId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'get',
        url: `https://vapi.vnappmob.com/api/province/district/${provinceId}`,
      });
      resolve(response);
    } catch (error) {
      console.log('Error apiGetProvince: ', error);
      reject(error);
    }
  });

export const apiGetPublicWard = (districtId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'get',
        url: `https://vapi.vnappmob.com/api/province/ward/${districtId}`,
      });
      resolve(response);
    } catch (error) {
      console.log('Error apiGetProvince: ', error);
      reject(error);
    }
  });
