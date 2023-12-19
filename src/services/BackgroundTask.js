// import {NativeModules} from 'react-native';
// import BackgroundTask from 'react-native-background-task';

// const {InternetCheckModule} = NativeModules;

// BackgroundTask.define(async () => {
//   console.log('Background task starting...');

//   try {
//     const isConnected =
//       await InternetCheckModule.checkInternetConnection().then(
//         state => state.isConnected,
//       );

//     if (isConnected) {
//       console.log(
//         'Device is connected to the internet. Performing API call...',
//       );
//       // Your API call logic here
//     } else {
//       console.log('No network connectivity. API call skipped.');
//     }
//   } catch (error) {
//     console.error('Background task error:', error);
//   } finally {
//     console.log('Background task completed.');
//     BackgroundTask.finish();
//   }
// });

// export default BackgroundTask;
