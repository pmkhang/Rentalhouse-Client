import { apiGetAcreages, apiGetPrices } from '../../services/priceAndArceage';
import { getPricesSuccess, getPricesFail } from '../Slice/PricesSlice';
import { getAcreagesSuccess, getAcreagesFail } from '../Slice/AcreagesSlice';

export const getPrices = (payload) => async (dispatch) => {
  try {
    const response = await apiGetPrices(payload);
    if (response?.data.error === 0) {
      dispatch(getPricesSuccess(response.data));
    } else {
      dispatch(getPricesFail(response.data));
    }
  } catch (error) {
    dispatch(getPricesFail({ data: null, error: 2 }));
  }
};

export const getAcreages = (payload) => async (dispatch) => {
  try {
    const response = await apiGetAcreages(payload);
    if (response?.data.error === 0) {
      dispatch(getAcreagesSuccess(response.data));
    } else {
      dispatch(getAcreagesFail(response.data));
    }
  } catch (error) {
    dispatch(getAcreagesFail({ data: null, error: 2 }));
  }
};
