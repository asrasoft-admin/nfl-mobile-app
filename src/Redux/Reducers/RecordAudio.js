// reducers.js
const initialState = {
  isRecording: false,
  audioPath: '',
  downloadLink: '',
};

const recordingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_RECORDING':
      return {
        ...state,
        isRecording: true,
      };
    case 'STOP_RECORDING':
      return {
        ...state,
        isRecording: false,
        audioPath: action.payload,
      };
    case 'UPLOAD_SUCCESS':
      console.log('UPLOAD_SUCCESS');
      return {
        ...state,
        downloadLink: action.payload,
      };
    case 'SUCCESS':
      return initialState;
    default:
      return state;
  }
};

export default recordingReducer;
