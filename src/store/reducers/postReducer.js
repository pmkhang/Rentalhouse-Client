import actionTypes from '../actions/actionTypes';

const { GET_POSTS, GET_POSTS_FAIL, GET_POSTS_LIMIT, GET_POSTS_LIMIT_FAIL } = actionTypes;
const initSate = {
  posts: [],
  message: '',
  count: 0,
};

const postReducer = (state = initSate, action) => {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_LIMIT:
      return {
        ...state,
        posts: action.posts,
        message: action.message,
        count: action.count,
      };
    case GET_POSTS_FAIL:
    case GET_POSTS_LIMIT_FAIL:
      return {
        ...state.posts,
        posts: [],
        message: '',
        count: 0,
      };

    default:
      return state;
  }
};

export default postReducer;
