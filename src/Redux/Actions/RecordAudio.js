// actions.js
export const startRecording = () => ({
  type: 'START_RECORDING',
});
// actions.js
export const stopAudioRecording = payload => ({
  type: 'STOP_RECORDING',
  payload,
});
