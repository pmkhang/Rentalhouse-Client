import { apiGetCategories } from '../../services/category';
import { getCategorySuccess, getCategoryFail } from '../Slice/CategorySlice';

export const getCategory = (payload) => async (dispatch) => {
  try {
    const response = await apiGetCategories(payload);
    if (response?.data.error === 0) {
      dispatch(getCategorySuccess(response.data));
    } else {
      dispatch(getCategoryFail(response.data));
    }
  } catch (error) {
    dispatch(getCategoryFail({ data: null, error: 2 }));
  }
};
