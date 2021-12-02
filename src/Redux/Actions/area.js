import axios from 'axios';
import {areaConstants} from '../types';

export const allAreaAction = () => {
  return async dispatch => {
    dispatch({type: areaConstants.FETCH_AREA_REQUEST});

    const area = await axios.get(
      'https://dev-nfl-dds-dashboard.herokuapp.com/api/area/all-areas',
    );
    const areaAll = area.data;
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
  };
};
