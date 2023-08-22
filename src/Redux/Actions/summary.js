import {GET_SUMMARY_DATA_FAIL, GET_SUMMARY_DATA_SUCCESS} from '../types';

export const getSummaryDataSucess = payload => ({
  type: GET_SUMMARY_DATA_SUCCESS,
  payload,
});

export const getSummaryDataFail = payload => ({
  type: GET_SUMMARY_DATA_FAIL,
  payload,
});
