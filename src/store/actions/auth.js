import actionTypes from './actionTypes';
import { apiRegister, apiLogin } from '../../services/auth';
import { type } from '@testing-library/user-event/dist/type';

const { REGISTER_FAIL, REGISTER_SUCCES, LOGIN_SUCCES, LOGIN_FAIL, LOGOUT } = actionTypes;

export const register = (payload) => async (dispatch) => {
  try {
    const reponse = await apiRegister(payload);
    if (reponse?.data.error === 0) {
      dispatch({
        type: REGISTER_SUCCES,
        data: reponse.data.token,
      });
    } else {
      dispatch({
        type: REGISTER_FAIL,
        data: reponse.data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      data: null,
    });
  }
};

export const login = (payload) => async (dispatch) => {
  try {
    const reponse = await apiLogin(payload);
    if (reponse?.data.error === 0) {
      dispatch({
        type: LOGIN_SUCCES,
        data: reponse.data.token,
      });
    } else {
      dispatch({
        type: LOGIN_FAIL,
        data: reponse.data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      data: null,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
