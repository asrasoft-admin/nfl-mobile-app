import {
  GET_SUMMARY_DATA_FAIL,
  GET_SUMMARY_DATA_SUCCESS,
  GET_SUMMARY_TOTAL_FAIL,
  GET_SUMMARY_TOTAL_SUCCESS,
} from '../types';

// reducers.js
const initialState = {
  summaryData: {},
  error: '',
};

export const summaryDataReducer = (state = initialState, action) => {
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

export const summaryTotalDataReducer = (
  state = {summaryTotalData: {}, summaryTotalError: ''},
  action,
) => {
  switch (action.type) {
    case GET_SUMMARY_TOTAL_SUCCESS:
      return {
        ...state,
        summaryTotalData: action.payload,
      };
    case GET_SUMMARY_TOTAL_FAIL:
      return {
        ...state,
        summaryTotalError: action.payload,
      };
    default:
      return state;
  }
};
