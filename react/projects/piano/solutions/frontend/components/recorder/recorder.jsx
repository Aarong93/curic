import React from 'react';

const Recorder = ({ recording, playing, startRecording, stopRecording}) => (
    <div className='recorder'>
      <button
        className ='start-button'
        onClick={startRecording}
        disabled={recording || playing}>
        Start
      </button>
      <button
        className='stop-button'
        onClick={stopRecording}
        disabled={!recording || playing}>
        Stop
      </button>
  </div>
);


export default Recorder;
