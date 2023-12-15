const initialState = {
  allCustomersDetails: [],
  loading: 0,
};

export const addUsersReducer = (state = initialState, action) => {
  console.log({type: action.type});
  switch (action.type) {
    case 'ADD_CUSTOMER_DETAILS':
      return {
        ...state,
        allCustomersDetails: [...state.allCustomersDetails, action.payload],
      };
    case 'UPDATE_LIST':
      return {
        allCustomersDetails: [...action.payload],
      };
    case 'SYNC_PROGRESS': {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case 'EMPTY_CUSTOMER_LIST':
      return initialState;
    default:
      return state;
  }
};
