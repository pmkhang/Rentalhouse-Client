import { registerSuccess, loginSuccess, registerFail, loginFail, logout } from '../action/authAction';
import { apiRegister, apiLogin } from '../../services/auth';

export const register = (payload) => async (dispatch) => {
  try {
    const response = await apiRegister(payload);
    if (response?.data.error === 0) {
      dispatch(registerSuccess(response.data));
    } else {
      dispatch(registerFail({ data: response.data.message, error: response.data.error }));
    }
  } catch (error) {
    dispatch(registerFail({ data: null, error: 2 }));
  }
};

export const login = (payload) => async (dispatch) => {
  try {
    const response = await apiLogin(payload);
    if (response?.data.error === 0) {
      dispatch(loginSuccess(response.data));
    } else {
      dispatch(loginFail({ data: response.data.message, error: response.data.error }));
    }
  } catch (error) {
    dispatch(loginFail({ data: null, error: 2 }));
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};
