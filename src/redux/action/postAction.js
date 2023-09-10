// postActions.js

import { getPostsSuccess, getPostsFail } from '../Slice/PostsSlice';
import { apiGetPosts, apiGetPostsLimit } from '../../services/post';

export const getPosts = () => async (dispatch) => {
  try {
    const response = await apiGetPosts();
    if (response?.data.error === 0) {
      dispatch(getPostsSuccess(response.data.response));
    } else {
      dispatch(getPostsFail({ message: response.data.message }));
    }
  } catch (error) {
    console.log('Error getPosts: ', error);
    dispatch(getPostsFail({ message: 'An error occurred' }));
  }
};

export const getPostsLimit = (page) => async (dispatch) => {
  try {
    if (!isNaN(page) && page >= 0) {
      const response = await apiGetPostsLimit(page);
      if (response?.data.error === 0) {
        dispatch(getPostsSuccess(response.data.response));
      } else {
        dispatch(getPostsFail({ message: response.data.message }));
      }
    } else {
      dispatch(getPostsFail({ message: 'Invalid page number' }));
    }
  } catch (error) {
    console.log('Error getPostsLimit: ', error);
    dispatch(getPostsFail({ message: 'An error occurred' }));
  }
};
