import actionTypes from './actionTypes';
import { apiRegister } from '../../services/auth';

const { REGISTER_FAIL, REGISTER_SUCCES, LOGIN, LOGOUT } = actionTypes;

export const register = (payload) => async (dispatch) => {
  try {
    const reponse = await apiRegister(payload);
    console.log('response:', reponse);
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
