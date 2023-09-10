import actionTypes from '../actions/actionTypes';

const { GET_POST, GET_POST_FAIL } = actionTypes;
const initSate = {
  posts: [],
  message: '',
};

const postReducer = (state = initSate, action) => {
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        posts: action.posts,
        message: action.message,
      };
    case GET_POST_FAIL:
      return {
        ...state.posts,
        posts: [],
        message: '',
      };

    default:
      return state;
  }
};

export default postReducer;
