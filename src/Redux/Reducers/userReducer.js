import {authConstants} from '../types';

const initialState = {
  id: '',
  number: '',
  role: '',
  activity_id: null,
  area_id: '',
  authenticated: false,
  category_id: '',
  token: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN:
      return {
        ...state,
        id: action.payload.data.data.id,
        number: action.payload.data.data.number,
        role: action.payload.data.data.role,
        activity_id: action.payload.data.data.activity_id,
        category_id: action.payload.data.data.category_id,
        areaId: action.payload.area?.id,
        token: action.payload.data.data.token,
        authenticated: true,
      };

    case authConstants.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default loginReducer;
