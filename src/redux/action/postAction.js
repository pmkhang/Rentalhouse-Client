// postActions.js

import {
  getPostsSuccess,
  getPostsFail,
  getNewPostsSuccess,
  getNewPostsFail,
  getUserPostFail,
  getUserPostSucces,
  getOutstandingSuccess,
  getOutstandingFail,
} from '../Slice/PostsSlice';
import { apiGetPostsLimit, apiGetNewPosts, apiGetUserPosts } from '../../services/post';

// export const getPosts = () => async (dispatch) => {
//   try {
//     const response = await apiGetPosts();
//     if (response?.data.error === 0) {
//       dispatch(getPostsSuccess(response.data.response));
//     } else {
//       dispatch(getPostsFail({ message: response.data.message }));
//     }
//   } catch (error) {
//     console.log('Error getPosts: ', error);
//     dispatch(getPostsFail({ message: 'An error occurred' }));
//   }
// };

export const getPostsLimit = (query) => async (dispatch) => {
  try {
    const response = await apiGetPostsLimit(query);
    if (response?.data.error === 0) {
      dispatch(getPostsSuccess(response.data.response));
    } else {
      dispatch(getPostsFail({ message: response.data.message }));
    }
  } catch (error) {
    console.log('Error getPostsLimit: ', error);
    dispatch(getPostsFail({ message: 'An error occurred' }));
  }
};

export const getNewPosts = (query) => async (dispatch) => {
  try {
    const response = await apiGetNewPosts(query);
    if (response?.data.error === 0) {
      dispatch(getNewPostsSuccess(response.data.response));
    } else {
      dispatch(getNewPostsFail({ message: response.data.message }));
    }
  } catch (error) {
    console.log('Error getPostsLimit: ', error);
    dispatch(getNewPostsFail({ message: 'An error occurred' }));
  }
};

export const getOutstandingPosts = () => async (dispatch) => {
  try {
    const response = await apiGetPostsLimit({
      limitPost: 5,
      order: ['star', 'DESC'],
    });
    if (response?.data.error === 0) {
      dispatch(getOutstandingSuccess(response.data.response));
    } else {
      dispatch(getOutstandingFail({ message: response.data.message }));
    }
  } catch (error) {
    console.log('Error getPostsLimit: ', error);
    dispatch(getOutstandingFail({ message: 'An error occurred' }));
  }
};

export const getUserPosts = (query) => async (dispatch) => {
  try {
    const response = await apiGetUserPosts(query);
    if (response?.data.error === 0) {
      dispatch(getUserPostSucces(response.data.response));
    } else {
      dispatch(getUserPostFail({ message: response.data.message }));
    }
  } catch (error) {
    console.log('Error getUserPosts: ', error);
    dispatch(getUserPostFail({ message: 'An error occurred' }));
  }
};
