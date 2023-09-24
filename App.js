import React from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {colors} from './src/assets/colors';
import AppView from './src/app';
import {useDispatch} from 'react-redux';
import {axiosInstance, getToken} from './src/helpers';
import {logout} from './src/Redux/Actions/userAction';

const MyTheme = {
  colors: {
    primary: colors.activeColor,
    background: colors.background,
  },
};

const App = () => {
  const dispatch = useDispatch();
  const navigation = useNavigationContainerRef();

  // request interceptor to attach token on all request
  axiosInstance.interceptors.request.use(async request => {
    const token = await getToken();

    if (request && request.headers && token) {
      request.headers.Authorization = token;
    }

    return request;
  });
  // response interceptor to catch token expired
  axiosInstance.interceptors.response.use(undefined, err => {
    if (err?.response?.status === 401) {
      dispatch(logout());

      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });

      return Promise.reject('Session Expired');
    }
    return Promise.reject(err);
  });

  return (
    <NavigationContainer theme={MyTheme} ref={navigation}>
      <AppView />
    </NavigationContainer>
  );
};

export default App;
