export const saveUser = payload => ({
  type: 'ADD_CUSTOMER_DETAILS',
  payload: payload,
});

export const emptyList = () => ({
  type: 'EMPTY_CUSTOMER_LIST',
});

export const updateList = list => ({
  type: 'UPDATE_LIST',
  payload: list,
});

export const syncLoader = progress => ({
  type: 'SYNC_PROGRESS',
  payload: progress,
});
