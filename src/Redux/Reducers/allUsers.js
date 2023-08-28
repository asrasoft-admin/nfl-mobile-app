const initialState = {
  allCustomersDetails: [],
};

export const addUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CUSTOMER_DETAILS':
      return {
        ...state,
        allCustomersDetails: [...state.allCustomersDetails, action.payload],
      };
    case 'EMPTY_CUSTOMER_LIST':
      return initialState;
    default:
      return state;
  }
};
