import actionTypes from './actionTypes';
import { apiGetPosts, apiGetPostsLimit } from '../../services/post';

export const getPosts = () => async (dispatch) => {
  try {
    const reponse = await apiGetPosts();
    if (reponse?.data.error === 0) {
      dispatch({
        type: actionTypes.GET_POSTS,
        posts: reponse.data?.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS_FAIL,
        message: reponse.data.message,
      });
    }
  } catch (error) {
    console.log('Error getPosts: ', error);
    dispatch({
      type: actionTypes.GET_POSTS_FAIL,
      posts: null,
    });
  }
};

export const getPostsLimit = (page) => async (dispatch) => {
  try {
    const reponse = await apiGetPostsLimit(page);
    if (reponse?.data.error === 0) {
      dispatch({
        type: actionTypes.GET_POSTS_LIMIT,
        posts: reponse.data.response?.rows,
        count: reponse.data.response?.count,
        
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS_LIMIT_FAIL,
        message: reponse.data.message,
      });
    }
  } catch (error) {
    console.log('Error getPosts: ', error);
    dispatch({
      type: actionTypes.GET_POSTS_LIMIT_FAIL,
      posts: null,
    });
  }
};
