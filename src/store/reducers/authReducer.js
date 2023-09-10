import actionTypes from '../actions/actionTypes';

const { REGISTER_FAIL, REGISTER_SUCCES, LOGIN_FAIL, LOGIN_SUCCES, LOGOUT } = actionTypes;
const initState = {
  isLoggedIn: false,
  token: null,
  message: '',
  update: false,
  error: 2,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case REGISTER_SUCCES:
      return {
        ...state,
        isLoggedIn: false,
        token: action.data,
        message: '',
        update: true,
        error: action.error,
      };
    case LOGIN_SUCCES:
      return {
        ...state,
        isLoggedIn: true,
        token: action.data,
        message: '',
        error: action.error,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        message: action.data,
        token: null,
        update: !state.update,
        error: action.error,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        message: '',
      };
    default:
      return state;
  }
};

export default authReducer;
