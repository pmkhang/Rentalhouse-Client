import actionTypes from './actionTypes';
import { apiGetPosts } from '../../services/post';

export const getPosts = () => async (dispatch) => {
  try {
    const reponse = await apiGetPosts();
    if (reponse?.data.error === 0) {
      dispatch({
        type: actionTypes.GET_POST,
        posts: reponse.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POST_FAIL,
        message: reponse.data.message,
      });
    }
  } catch (error) {
    console.log('Error getPosts: ', error);
    dispatch({
      type: actionTypes.GET_POST_FAIL,
      posts: null,
    });
  }
};
