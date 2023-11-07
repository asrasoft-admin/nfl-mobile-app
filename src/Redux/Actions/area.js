import axios from 'axios';
import {baseURL} from '../../helpers';
import {areaConstants} from '../types';

export const allAreaAction = () => {
  return async dispatch => {
    dispatch({type: areaConstants.FETCH_AREA_REQUEST});
    try {
      const area = await axios.get(`${baseURL}/api/area/all-areas`);
      const areaAll = area.data;
      console.log({areaAll});
      if (area) {
        dispatch({
          type: areaConstants.FETCH_AREA_SUCCESS,
          payload: {
            data: areaAll.data,
            error: '',
            success: areaAll.success,
          },
        });
      } else {
        dispatch({
          type: areaConstants.FETCH_AREA_FAILURE,
          payload: {error: area.error},
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};
