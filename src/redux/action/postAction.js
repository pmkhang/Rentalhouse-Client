// postActions.js

import { getPostsSuccess, getPostsFail, getNewPostsSuccess, getNewPostsFail } from '../Slice/PostsSlice';
import { apiGetPostsLimit, apiGetNewPosts } from '../../services/post';

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
    // console.log(response);
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
