import {authConstants} from '../types';

export const loginAction = (data, area) => ({
  type: authConstants.LOGIN,
  payload: {
    data,
    area,
  },
});

export const logout = () => ({
  type: authConstants.LOGOUT,
});
