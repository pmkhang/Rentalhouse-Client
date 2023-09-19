import { apiGetUsersData, apiGetUserByID } from '../../services/user';
import { getUsersDataSuccess } from '../Slice/UserSlice';
import { logout } from '../Slice/AuthSlice';

export const getUsersData = (payload) => async (dispatch) => {
  try {
    const response = await apiGetUsersData(payload);
    if (response?.data.error === 0) {
      dispatch(getUsersDataSuccess(response.data));
    } else {
      dispatch(logout());
    }
  } catch (error) {
    dispatch(logout());
  }
};

export const getUserDataByID = (payload) => async (dispatch) => {
  try {
    const response = await apiGetUserByID(payload);
    if (response?.data.error === 0) {
      dispatch(getUsersDataSuccess(response.data));
    } else {
      dispatch(logout());
    }
  } catch (error) {
    dispatch(logout());
  }
};
