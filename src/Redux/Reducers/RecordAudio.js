// reducers.js
const initialState = {
  isRecording: false,
  audioPath: '',
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
        audio: action.payload,
      };
    default:
      return state;
  }
};

export default recordingReducer;
