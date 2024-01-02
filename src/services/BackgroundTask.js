import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

const BackgroundTask = () => {
  useEffect(() => {
    // Set the interval to 15 minutes (900,000 milliseconds)
    // const interval = 1 * 60 * 1000;
    const interval = 1000 * 60;

    // Create a function that will be called every 15 minutes
    const task = () => {
      console.log('Task executed!');
      // Your code that will be called every 15 minutes goes here
    };

    // Start the background timer with the task function and the interval
    const timerId = BackgroundTimer.setInterval(task, interval);

    // Clear the interval when the component is unmounted
    return () => {
      BackgroundTimer.clearInterval(timerId);
    };
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  return (
    <View>
      <Text>BackgroundTask</Text>
    </View>
  );
};

export default BackgroundTask;
