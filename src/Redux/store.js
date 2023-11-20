import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {persistStore} from 'redux-persist';
import rootReducer from './rootReducers';
import logger from 'redux-logger';

const middlewares = [thunk];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);
