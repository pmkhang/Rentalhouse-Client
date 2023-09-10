import actionTypes from './actionTypes';
import { apiRegister, apiLogin } from '../../services/auth';

const { REGISTER_FAIL, REGISTER_SUCCES, LOGIN_SUCCES, LOGIN_FAIL, LOGOUT } = actionTypes;

export const register = (payload) => async (dispatch) => {
  try {
    const reponse = await apiRegister(payload);
    if (reponse?.data.error === 0) {
      dispatch({
        type: REGISTER_SUCCES,
        data: reponse.data.token,
        error: reponse.data.error,
      });
    } else {
      dispatch({
        type: REGISTER_FAIL,
        data: reponse.data.message,
        error: reponse.data.error,
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
        error: reponse.data.error,
      });
    } else {
      dispatch({
        type: LOGIN_FAIL,
        data: reponse.data.message,
        error: reponse.data.error,
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
