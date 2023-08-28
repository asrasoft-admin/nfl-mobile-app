const initialState = {
  deals: [],
};

export const dealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STORE_DEALS':
      console.log('storing deals', action.payload);
      return {
        ...state,
        deals: action.payload,
      };

    default:
      return state;
  }
};
