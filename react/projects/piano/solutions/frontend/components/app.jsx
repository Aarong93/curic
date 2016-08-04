import React from 'react';
import PianoContainer from './piano_container';
import RecorderContainer from './recorder_container';
import JukeBoxContainer from './juke_box_container';

const App = () => (
  <div className='app'>
    <PianoContainer />
    <RecorderContainer />
    <JukeBoxContainer />
  </div>
);

export default App;
