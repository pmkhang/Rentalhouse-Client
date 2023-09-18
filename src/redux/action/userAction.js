import { apiGetUsersData, apiGetUserByID } from '../../services/user';
import { getUsersDataSuccess, getUsersDataFail } from '../Slice/UserSlice';

export const getUsersData = (payload) => async (dispatch) => {
  try {
    const response = await apiGetUsersData(payload);
    if (response?.data.error === 0) {
      dispatch(getUsersDataSuccess(response.data));
    } else {
      dispatch(getUsersDataFail(response.data));
    }
  } catch (error) {
    dispatch(getUsersDataFail({ data: null, error: 2 }));
  }
};

export const getUserDataByID = (payload) => async (dispatch) => {
  try {
    const response = await apiGetUserByID(payload);
    if (response?.data.error === 0) {
      dispatch(getUsersDataSuccess(response.data));
    } else {
      dispatch(getUsersDataFail(response.data));
    }
  } catch (error) {
    dispatch(getUsersDataFail({ data: null, error: 2 }));
  }
};
