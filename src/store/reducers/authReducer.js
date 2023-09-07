import actionTypes from '../actions/actionTypes';

const { REGISTER_FAIL, REGISTER_SUCCES, LOGIN_FAIL, LOGIN_SUCCES, LOGOUT } = actionTypes;
const initState = {
  isLoggedIn: false,
  token: null,
  message: '',
  update: false,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case REGISTER_SUCCES:
      return {
        ...state,
        isLoggedIn: false,
        token: action.data,
        message: '',
      };
    case LOGIN_SUCCES:
      return {
        ...state,
        isLoggedIn: true,
        token: action.data,
        message: '',
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        message: action.data,
        token: null,
        update: !state.update,
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
