import actionTypes from '../actions/actionTypes';

const { REGISTER_FAIL, REGISTER_SUCCES, LOGIN, LOGOUT } = actionTypes;
const initState = {
  isLoggedIn: false,
  token: null,
  message: '',
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case REGISTER_SUCCES:
      return {
        ...state,
        isLoggedIn: true,
        token: action.data,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        message: action.data,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
