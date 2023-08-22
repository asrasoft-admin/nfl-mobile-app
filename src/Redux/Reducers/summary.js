import {GET_SUMMARY_DATA_FAIL, GET_SUMMARY_DATA_SUCCESS} from '../types';

// reducers.js
const initialState = {
  summaryData: {},
  error: '',
};

const summaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUMMARY_DATA_SUCCESS:
      return {
        ...state,
        summaryData: action.payload,
      };
    case GET_SUMMARY_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default summaryReducer;
