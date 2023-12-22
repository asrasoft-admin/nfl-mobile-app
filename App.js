import React, {useEffect} from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {colors} from './src/assets/colors';
import AppView from './src/app';
import {useDispatch, useSelector} from 'react-redux';
import {axiosInstance, getToken, handleSync} from './src/helpers';
import {logout} from './src/Redux/Actions/userAction';
import ErrorBoundary from './src/common/ErrorBoundary/ErrorBoundary';
import {NativeModules} from 'react-native';
// import BackgroundTask from './src/services/BackgroundTask';
import BackgroundTimer from 'react-native-background-timer';

const {InternetCheckModule} = NativeModules;

const MyTheme = {
  colors: {
    primary: colors.activeColor,
    background: colors.background,
  },
};

const App = () => {
  const dispatch = useDispatch();
  const navigation = useNavigationContainerRef();
  const {allCustomersDetails} = useSelector(state => state.allCustomers);

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

  // const TestErrorBoundary = () => {
  //   throw new Error('This is a test error');
  // };

  useEffect(() => {
    const interval = 1000 * 60;

    // Create a function that will be called every 15 minutes
    const task = async () => {
      await handleSync(allCustomersDetails);
      console.log('Task executed!');
      // Your code that will be called every 15 minutes goes here
    };

    // Start the background timer with the task function and the interval
    const timerId = BackgroundTimer.setInterval(task, interval);

    // Clear the interval when the component is unmounted
    return () => {
      BackgroundTimer.clearInterval(timerId);
    };
  }, [allCustomersDetails]);

  return (
    <ErrorBoundary navigation={navigation}>
      {/* <TestErrorBoundary /> */}
      <NavigationContainer theme={MyTheme} ref={navigation}>
        <AppView />
      </NavigationContainer>
    </ErrorBoundary>
  );
};

export default App;
