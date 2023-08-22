import {
  GET_SUMMARY_DATA_FAIL,
  GET_SUMMARY_DATA_SUCCESS,
  GET_SUMMARY_TOTAL_FAIL,
  GET_SUMMARY_TOTAL_SUCCESS,
} from '../types';

export const getSummaryDataSucess = payload => ({
  type: GET_SUMMARY_DATA_SUCCESS,
  payload,
});

export const getSummaryDataFail = payload => ({
  type: GET_SUMMARY_DATA_FAIL,
  payload,
});

export const getSummaryTotalDataSuccess = payload => ({
  type: GET_SUMMARY_TOTAL_SUCCESS,
  payload,
});

export const getSummaryTotalDataFail = payload => ({
  type: GET_SUMMARY_TOTAL_FAIL,
  payload,
});
