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
import config from './src/config';
import Geolocation from 'react-native-geolocation-service';

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
  const {user} = useSelector(state => state);
  const syncDataFeatureFlag = config.featureFlags.syncDataFeature;
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
    const userId = user?.id; // Replace with your user authentication logic
    const socket = new WebSocket(
      'wss://a560-39-50-160-200.ngrok-free.app/websocket',
    );
    console.log({socket});
    socket.onopen = () => {
      console.log('WebSocket connected');

      const sendLocationToServer = (latitude, longitude) => {
        console.log({latitude, longitude});
        // Send location data to the server using the existing WebSocket connection
        socket.send(JSON.stringify({userId, latitude, longitude}));
      };

      const watchId = Geolocation.watchPosition(
        position => {
          const {latitude, longitude} = position.coords;
          sendLocationToServer(latitude, longitude);
        },
        error => console.error('Geolocation error:', error),
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
          distanceFilter: 10,
        },
      );

      // Cleanup function
      return () => {
        Geolocation.clearWatch(watchId);
        // Close the WebSocket connection when the component is unmounted
        socket.close();
      };
    };

    socket.onclose = event => {
      console.log('WebSocket closed:', event);
    };

    socket.onerror = error => {
      console.error('WebSocket error:', error);
    };

    return () => {
      // Close the WebSocket connection when the component is unmounted
      socket.close();
    };
  }, []);

  useEffect(() => {
    const interval = 1000 * 60;

    // Create a function that will be called every 15 minutes
    const task = async () => {
      if (syncDataFeatureFlag) {
        await handleSync(allCustomersDetails);
        console.log('Task executed!');
      }
      // Your code that will be called every 15 minutes goes here
    };

    // Start the background timer with the task function and the interval
    const timerId = BackgroundTimer.setInterval(task, interval);

    // Clear the interval when the component is unmounted
    return () => {
      BackgroundTimer.clearInterval(timerId);
    };
  }, [allCustomersDetails, syncDataFeatureFlag]);

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
