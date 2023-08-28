export const saveUser = payload => ({
  type: 'ADD_CUSTOMER_DETAILS',
  payload: payload,
});

export const emptyList = () => ({
  type: 'EMPTY_CUSTOMER_LIST',
});
