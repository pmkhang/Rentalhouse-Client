import { apiGetProvince } from '../../services/province';
import { getProvinceFail, getProvinceSuccess } from '../Slice/ProvinceSlice';

export const getProvince = (payload) => async (dispatch) => {
  try {
    const response = await apiGetProvince(payload);
    if (response?.data.error === 0) {
      dispatch(getProvinceSuccess(response.data.response));
    } else {
      dispatch(getProvinceFail(response.data));
    }
  } catch (error) {
    dispatch(getProvinceFail({ data: null, error: 2 }));
  }
};
