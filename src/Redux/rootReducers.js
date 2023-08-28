import {combineReducers} from 'redux';
import areaReducer from './Reducers/area';
import productsReducer from './Reducers/products';
import loginReducer from './Reducers/userReducer';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';
import recordingReducer from './Reducers/RecordAudio';
import customerReducer from './Reducers/customer';
import customerDetailReducer from './Reducers/customerDetail';
import summaryReducer, {
  summaryDataReducer,
  summaryTotalDataReducer,
} from './Reducers/summary';
import {addUsersReducer} from './Reducers/allUsers';
import {dealsReducer} from './Reducers/deals';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'allArea', 'allCustomers', 'deals'],
};

const rootReducer = combineReducers({
  user: loginReducer,
  allArea: areaReducer,
  allProducts: productsReducer,
  Recorder: recordingReducer,
  customer: customerReducer,
  customerDetail: customerDetailReducer,
  summaryData: summaryDataReducer,
  summaryTotalData: summaryTotalDataReducer,
  allCustomers: addUsersReducer,
  deals: dealsReducer,
});

export default persistReducer(persistConfig, rootReducer);
