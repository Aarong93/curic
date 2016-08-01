import $ from 'jquery';
import { keyPressed, keyReleased } from '../actions/key_actions';
import TONES from '../constants/tones';

const tones = Object.keys(TONES);
const validKeys = ['a', 's', 'd', 'f', 'j', 'k', 'l'];

const keyMap = {};
validKeys.forEach((key, i) => {
  keyMap[key] = tones[i];
});

const heldKeys = [];

module.exports = function () {
  $(document).on('keydown', e => {
    const key = e.key;
    const valid = validKeys.indexOf(key) !== -1;
    const held = heldKeys.indexOf(key) !== -1;
    if (valid && !held) {
      heldKeys.push(key);
      // keyActions.keyPressed(keyMap[key]);
      // dispatch(keyPressed(keyMap[key]));
    }
  });

  $(document).on('keyup', e => {
    const key = e.key;
    const idx = heldKeys.indexOf(key);
    if (idx !== -1) {
      heldKeys.splice(idx, 1);
      // keyActions.keyReleased(keyMap[key]);
      // dispatch(keyReleased(keyMap[key]));
    }
  })
}
