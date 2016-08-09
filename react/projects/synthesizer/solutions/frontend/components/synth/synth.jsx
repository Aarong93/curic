import React from 'react';
import NoteKey from './note_key';
import $ from 'jquery';
import { NOTES, TONES } from '../../util/tones';
import Note from '../../util/note';

class Synth extends React.Component {
  constructor(props) {
     super(props);
     this.notes = NOTES.map(note => new Note(TONES[note])); // array of Note instances
  }

  componentDidMount() {
    $(document).on('keydown', e => this.onKeyDown(e));
    $(document).on('keyup', e => this.onKeyUp(e));
  }

  onKeyUp(e) {
    const { notes, recording, keyReleased, addNotes } = this.props;
    keyReleased(e.key);

    if (recording) {
      addNotes(notes);
    }
  }

  onKeyDown(e) {
    const { notes, recording, keyPressed, addNotes } = this.props;
    keyPressed(e.key);

    if (recording) {
      addNotes(notes);
    }
  }

  playNotes () {
    NOTES.forEach((note, idx) => {
      if (this.props.notes.includes(note)) { // play notes present in state
        this.notes[idx].start();
      } else {
        this.notes[idx].stop();
      }
    });
  }

  render() {
    this.playNotes();
    const noteKeys = NOTES.map((note, idx) => (
      <NoteKey key={idx} note={note} />
    ));

    return (
      <div className="synth">
        <div className='note-key-list'>
          {noteKeys}
        </div>
      </div>
    );
  }
};

export default Synth;
