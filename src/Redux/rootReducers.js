import {combineReducers} from 'redux';
import areaReducer from './Reducers/area';
import productsReducer from './Reducers/products';
import loginReducer from './Reducers/userReducer';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';
import recordingReducer from './Reducers/RecordAudio';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'allArea'],
};

const rootReducer = combineReducers({
  user: loginReducer,
  allArea: areaReducer,
  allProducts: productsReducer,
  Recorder: recordingReducer,
});

export default persistReducer(persistConfig, rootReducer);
