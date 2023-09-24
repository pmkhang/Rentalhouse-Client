import axiosConfig from '../axiosConfig';

export const apiGetUsersData = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'get',
        url: '/api/v1/user/all-users-data',
      });
      resolve(response);
    } catch (error) {
      console.log('Error apiGetUsersData: ', error);
      reject(error);
    }
  });

export const apiGetUserByID = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'get',
        url: '/api/v1/user/user-data',
      });
      resolve(response);
    } catch (error) {
      console.log('Error apiGetUsersData: ', error);
      reject(error);
    }
  });

export const apiUpdateUserByID = ({name, zalo, fbUrl, avatar}) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'put',
        url: '/api/v1/user/update-user-data',
        data: { name, zalo, fbUrl, avatar },
      });
      resolve(response);
    } catch (error) {
      console.log('Error apiGetUsersData: ', error);
      reject(error);
    }
  });
