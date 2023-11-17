import {areaConstants, areasConstants} from '../types';

const initialState = {
  error: '',
  data: [],
  area: '',
};

const areaReducer = (state = initialState, action) => {
  switch (action.type) {
    case areaConstants.FETCH_AREA_REQUEST:
      return {
        ...state,
      };
    case areaConstants.FETCH_AREA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
      };
    case areaConstants.FETCH_AREA_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case areasConstants.FETCH_AREAS:
      return {
        ...state,
        area: action.payload,
      };

    default:
      return state;
  }
};

export default areaReducer;
