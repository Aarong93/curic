# Redux Synthesizer

Live demo available [here]!

[here]:https://www.youtube.com/watch?v=J---aiyznGQ

## Overview

Today we're using React.js and Redux to create our own musical keyboard!

## Phase 1: Frontend Structure

* Create a project directory.
* Create an `index.html` file and give it a `<div id="root"></div>` container.
* Run `npm init --yes` to set up your `package.json`.
* To set up React and Redux `npm install --save` the following packages:
  * `webpack`
  * `react`
  * `react-dom`
  * `react-redux`
  * `redux`
  * `babel-core`
  * `babel-loader`
  * `babel-preset-react`
  * `babel-preset-es2015`
* Run `npm install --save jquery`. We'll be using jQuery later to install key listeners.
* Run `npm install --save lodash`. We'll be using `merge` from the [lodash][lodash] library later to help prevent object mutation.
* Create a `/frontend` folder at the root directory of your project to contain
 all of your front-end code.
* Model your `/frontend` folder to look like the directory tree below:

  ```
  /frontend
    + /actions
    + /components
    + /constants
    + /reducers
    + /store
    + /util
    + synthesizer.jsx
  ```

* Setup your entry file `synthesizer.jsx` to render your app into the into the
 `root` container.
* Configure your webpack setup in `webpack.config.js` to compile all of your JS
 into a `bundle.js`.
* Run `wepback --watch` and test that your app renders before moving on.

[lodash]:https://lodash.com/docs

## Phase 2: Notes and Tones

#### `Note` Class

Make a `note.js` file inside of your `util` folder. This file will contain the
code for your `Note` class which you will use to actually play tones using the
`start` and `stop` functions. We'll provide the code for this phase. Copy and
paste the following into your `note.js`.

```js
// util/note.js
const ctx = new (window.AudioContext || window.webkitAudioContext)();

const createOscillator = (freq) => {
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = freq;
  osc.detune.value = 0;
  osc.start(ctx.currentTime);
  return osc;
};

const createGainNode = () => {
  const gainNode = ctx.createGain();
  gainNode.gain.value = 0;
  gainNode.connect(ctx.destination);
  return gainNode;
};

class Note {
  constructor(freq) {
    this.oscillatorNode = createOscillator(freq);
    this.gainNode = createGainNode();
    this.oscillatorNode.connect(this.gainNode);
  }

  start() {
    this.gainNode.gain.value = 0.3;
  }

  stop() {
    this.gainNode.gain.value = 0;
  }
};

module.exports = Note;
```

Before moving on, test that you can instantiate and play a `Note` from the
console.

#### `TONES` and `NOTES` Constants

Create a `constants/tones.js` file. From there export a `TONES` constant, a
JavaScript object mapping note names to frequencies. Also export a `NOTES`
constant, an array of all of the keys in `TONES`. We'll be using these constants
later to map our keyboard keys to notes names to tones!

Feel free to use [this table][note-frequencies] as a resource.

[note-frequencies]: http://www.phy.mtu.edu/~suits/notefreqs.html

## Phase 3: Notes Redux Structure

### Designing the State Shape

In Redux, all app state is stored as a single JavaScript object. It's good
practice to think about its shape before writing any code. Ask yourself what's
the minimal representation of your app's state as an object?

For our synthesizer app, we first and foremost want to store the `notes` in
play, as an array of note names.

### Action Creators

We need to define our first action creators. Remember, an action creator is
simply a function that returns an action. Actions define what we can do in our
app. In Redux, they are POJOs that have a `type` property indicating the type of
action being performed.

* Create an `actions/note_actions.js` file which will house our action creators for `notes`.

#### `NOTES_CONSTANTS`

Action `type`s are typically defined as string constants.

* In our new file, let's export a `NOTES_CONSTANTS`, an object containing keys for `KEY_PRESSED` and `KEY_RELEASED`. Technically, the values of these keys can
be anything, but our convention is to use the string literal of the key.

For example,

```js
export const NotesConstants = {
  KEY_PRESSED: "KEY_PRESSED",
  ...
};
```

#### `keyPressed`

+ Export a `keyPressed` function which takes the keyboard `key` pressed and
returns an action of `type` `KEY_PRESSED`.
+ Add `key` as a property to the action to let the store know which `key` to add to its `notes` array.

#### `keyReleased`

+ Export a `keyReleased` function which takes the keyboard `key` released and
returns an action of `type` `KEY_RELEASED`.
+ Add `key` as a property to the action to let the store know which `key` to remove from its `notes` array.

### Handling Actions - Reducers
Now that we’ve decided what our state shape looks like and defined the actions
that will send data from your app to the store, we need reducers that update the
state base on the actions.

A reducer is a *pure* function that takes the previous state and an action, and
returns the next state. It manages the shape of our application's state. Given
the same arguments for `state` and `action`, a reducer should calculate the next
state and return it. No side effects, such as mutating its arguments!

Let's write a reducer for our app which handles the actions we defined above.

#### `notes` Reducer

+ Create a `reducers/notes_reducer.js` file that exports a `notes` reducer, a pure function that takes two arguments:
  + `state` - the previous `notes` state;
  + `action` - the action object dispatched.
+ Import `NotesConstants` from `notes_actions.js`.
+ Redux will call our reducer with an `undefined` state for the first time so use the [ES6 default arguments syntax][default-args] to return an empty array as
the initial state.
+ Add a `switch` statement evaluating `action.type`.
+ Return the previous `state` as the `default` case.
+ Then add a case for each key (i.e. action type) defined in `NOTES_CONSTANTS`.
  + `KEY_PRESSED` - if the `action.key` isn't already in the state (i.e. already
  playing) then return a new state with the new key appended to the previous
  state, else return the previous state.
  + `KEY_RELEASED` - return a new state with the `action.key` removed only if
  it's currently playing (i.e. in the state), else return the previous state.

*NB*: State is never mutated in Redux. Thus, we must return a new array when
our state changes. Make sure your `notes` reducer creates and returns a new
array when adding or removing a note. Here's a good [reference][array-mutation]
on how to avoid array mutation.

[default-args]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/default_parameters
[array-mutation]: https://egghead.io/lessons/javascript-redux-avoiding-array-mutations-with-concat-slice-and-spread

We're almost there. You might have noticed that `action.key` evaluates to the
keyboard key pressed or released while our state's `notes` store an array of
note names. So we must map our `key`s to a note names using our constant `NOTES`
and an array of valid keyboard keys.

+ Define an array called `validKeys` which stores the strings of all of your
synthesizer's keyboard keys (e.g. `a`, `s`). The number of valid keys must equal
the number of notes you plan on having.
+ Define an object called `keyMap` which stores as keys, valid keys and as
values, corresponding note names (e.g. `keyMap['a'] = 'C5'`).
+ Modify your `KEY_PRESSED` and `KEY_RELEASED` cases so that they also check to
see if a `action.key` is also a valid key. If not in both cases, return the
previous state.

#### Root Reducer

The `notes` reducer updates and returns to the store only a single slice of
the state: the `notes` in play.

*NB*: When we have state fields that are independent of each other, we split
the reducer into multiple reducers that each handle its own slice of the state.
This is called **reducer composition**, and it’s the fundamental pattern of
building Redux apps.

We only have one reducer right now, but later as our app grows we'll be adding
more. For now, let's define a root reducer that calls all of the reducers
managing parts of the state, and combines them into a single function.

* Create a new file called `reducers/index.js` file.
* Import
[`combineReducers`][combine-reducers] from `redux` and your `notes` reducer.
* Using them, define and `export default` a root `reducer` function.

[combine-reducers]: http://redux.js.org/docs/api/combineReducers.html

### Store
In Redux, the store calls the reducer function you give it whenever
`dispatch(action)` is called within your app. The store saves the complete state
tree that is returned by the root reducer, and every listener registered will be
called in response to the new state!

+ Create a `store/store.js` file and import [`createStore`][create-store] from
`redux` and your root `reducer`.
+ Define and `export default` a function called `configureStore` that returns a
new store with the root reducer.
+ In your entry file, import `configureStore` and create your app's `store`.

[create-store]: http://redux.js.org/docs/api/createStore.html

## Phase 4: Synth Components

### `App` Component
The `App` component will hold all of the top-level components of your app.

+ Create a file `components/app.jsx` and `React` from `react`.
+ Define and `export default` a functional `App` component.

### `Root` Component

The `Root` component serves to wrap your `App` component with a
[`Provider`][provider] component. The Provider is a special React Redux
component that gives all of your container components access to your app's store
without passing it explicitly to each container, allowing all of them to read
your app's state and dispatch actions.

+ Create a file `components/root.jsx`.
+ Import `Provider` from `react-redux`, `React` and your `App` component.
+ Define and export a `Root` component which takes as an argument `store` and
wraps your `App` with a `Provider`. Like so:

  ```js
  const Root = ({ store }) => (
    <Provider store={store}>
      <App/>
    </Provider>
  );

  export default Root;
  ```

+ Update your entry file to render your `Root` component, passing it the store
returned by `configureStore`.

[provider]: https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store

### `SynthContainer` Component

The goal of a container component is to allow the presentational component to be
as simple and lightweight as possible. To create a container, we need map the
application state and the Store's dispatch to a set of props that get passed to
the presentational component. Fortunately, `react-redux` provides a function
that does this for us: [`connect`][connect].

* Create a new directory `components/synth`.
* Create a file `components/synth/synth.jsx`. Define and export `Synth`, a functional component to start.
* Create a file `components/synth/synth_container.jsx`, and import [`connect`] from `react-redux` and your `Synth` component.
* Define a `mapStateToProps(state)` function. Return an object mapping `state.notes` to a `notes` key.
* Import your `keyPressed` and `keyReleased` action creators.
* Define a `mapDispatchToProps(dispatch)` function. Return an object containing callback props for your action creators. For example,

  ```js
  const mapDispatchToProps = dispatch => ({
    keyDown: key => dispatch(keyPressed(key)),
    ...
  });
  ```

* `mapStateToProps` reads the state held by the store and `mapDispatchToProps` dispatches actions to the store. Call `connect(mapStateToProps,
mapDispatchToProps)` on your `Synth` component to connect it to your Redux
store.
* Export the result of this call.
* In your `App` component, import your `SynthContainer` and render it. Make sure your app `webpack`s and that there are no errors in the console before moving
on.

[connect]: https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options

### `Synth` Component

`Synth` is an example of a presentational component. Presentational components
are typically written as functional components unless they require internal
state, lifecycle hooks, etc. Your `Synth` component will instantiate an array of
`Note`s, calling `start` and `stop` depending on the notes in the store and
define key listeners on the window.

* Redefine your `Synth` component so that it extends the `React.Component`.
* Import your `NOTES` and `TONES` constants, and `Note` class.
* In the `constructor`, instantiate an array of `Note` instances and setting it to `this.notes.` Flashback, your `Note` constructor takes a frequency as a
parameter, not a string. Hint: Use `NOTES` and `TONES` to return an array
mapping note names to the right frequency.
* In the `render` function, render a list of `this.notes` to test.

#### Key Listeners
Now let's create a jQuery listener for `keyup` and `keydown` events.

* In your `Synth` class, import `$` from `jquery`.
* Define a `onKeyDown(e)` function which takes as an argument a [KeyboardEvent][keyboard-event]. Grab the key from the event and call
`this.props.keyUp`. Recap, `keyUp` is the function you defined in
`mapDispatchToProps` in your `SynthContainer`.
* Define another function called `onKeyDown(e)`. Call `this.props.keyDown` passing it the key from the KeyboardEvent.
* In `componentDidMount`, install the two listeners by calling the `on` methods on `$(document)`. For example,

  ```js
  $(document).on('keydown', e => this.onKeyDown(e));
  ```

When a user presses a key, the key listener calls your `onKeyDown(e)` function,
which dispatches a `keyPressed(key)` action to the store. Likewise, when a user
releases a key, the listener calls your `onKeyUp(e)`, which dispatches a
`keyReleased(key)` action to the store. Make sure your follow this before moving
on.

*NB*: A jQuery `'keydown'` listener fires repeatedly when the user holds down a
key, which will repeatedly trigger our `keyPressed` function. Does this explain
some of the overhead in our `notes` reducer?

#### Playing `Note`s

Ok let's actually start jamming.

* Define a `playNotes` function.
* Iterate through `this.notes`, calling `start` and `stop` on all of the notes present in the store and `stop` on all the other notes.
* Call `playNotes` in `render`.
* Test your app! Make sure that your have your key actions, reducer and listeners working before continuing.

[keyboard-event]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
### `NoteKey` Component

Let's write a pure presentational component, `NoteKey`. This component will be
the visual representation of a single note in your piano.

* Create a new file, `components/synth/note_key.jsx`.
* Define and export a new functional component called `NoteKey`.
* Import `NoteKey` in `Synth`.
* Render a list of `NoteKey`s instead of list `this.notes`, passing as a prop the note name.
* Change your `NoteKey` component to display the name of the note.

Cool, you now have the core of your Redux Synthesizer done! Let's start adding additional features.

# Recording Tracks
## Phase 5: Recorder Redux Structure

Let's give our synthesizer the ability to record tracks.

### Re-Designing the State Shape
This means in addition to storing `notes`, our state needs to store:
+ `recording` - a boolean to indicate if your app is recording or not;
+ `tracks` - an object of tracks objects.

Here's a sample of our new state shape:
```
{
  notes: ['C5', 'D6'],
  recording: false,
  tracks: {
    "1": {
      id: 1,
      name: 'Track 1',
      roll:
      [
        { notes: [ 'A5' ], timeSlice: 1250191 },
        { notes: [], timeSlice: 1255000 },
        { notes: [ 'C5', 'D5' ], timeSlice: 1265180 }
        { notes: [], timeSlice: 1279511 }
      ],
      timeStart: 1470164117527
    },
    "2": {
      id: 2,
      name: 'Track 2',
      roll:
      [
        { notes: [ 'B5', 'C6', 'C6' ], timeSlice: 253386 },
        { notes: [], timeSlice: 265216 }
      ],
      timeStart: 1470173676236
    }
  }
}
```

Take a good look at what your app's state could look like, but let's save discussing the details of our track
objects for a little later.

### Action Creators

+ Create an `action/tracks_actions.js` file which will house our action creators for `tracks` and `recording`.

#### `TracksConstants`

+ Export `TrackConstants`, an object containing keys for `START_RECORDING`, `STOP_RECORDING`, and `ADD_NOTES`. Remember, values are the string literals of the keys.

#### `startRecording`

+ Export a `startRecording` function which takes 0 arguments and returns an action of `type` `START_RECORDING`.
+ Add `timeNow` as a property to the action and assign `Date.now()` as its value.

#### `stopRecording`

+ Export a `stopRecording` function which takes 0 arguments and returns an action of the appropriate type.
+ Add `timeNow` as a property to the action and assign `Date.now()` as its value.

#### `addNotes`

+ Export a `addNotes` function which takes an array of `notes` as an argument and returns an action of the appropriate type.
+ Add `timeNow` as a property to the action and assign `Date.now()` as its value.
+ Add `notes` as a property to let the store know which `notes` to add to the track's roll.

### Reducers

#### `recording` Reducer
+ Create a `reducers/recording_reducer.js` file that exports a `recording(state, action)` reducer.
+ Import your `TrackConstants`.
+ Use the ES6 default arguments syntax to return `false` as the initial state.
+ Add a `switch` statement evaluating `action.type` and return `state` as the `default` case.
+ The recording is only concerned with two types of actions: `START_RECORDING` and `STOP_RECORDING`. Return the appropriate next state for each case.

#### `tracks` Reducer

`tracks` in the state is an object storing as keys, track ids. As values, it stores track objects.

Let's take a closer look at a track object.
```
{
  id: 1,
  name: 'Track 1'
  roll:
  [
    { notes: [ 'A5' ], timeSlice: 1250191 },
    { notes: [], timeSlice: 1255000 },
    { notes: [ 'C5', 'D5' ], timeSlice: 1265180 }
    { notes: [], timeSlice: 1279511 }
  ],
  timeStart: 1470164117527
},
```

`roll` starts as an empty array. We need to know the current time a note is
played to calculate when to play a note relative to the `timeStart` of the
recording.

While the user records a track, we'll need to update `roll` as the user presses new notes. We append into the `roll` an object with the following values:
+ `timeSlice` - the time elapsed since the track started recording;
+ `notes` - an array of note names (eg. `['C3', 'E3', 'G3']`) are currently pressed.

+ Create a `reducers/tracks_reducer.js` file and import your `TrackConstants`, and `merge` from `lodash/merge`
+ Instantiate a variable `currTrackId` to `0`. This variable will be used set track ids and add notes to the newest recording.
+ `export default` a `tracks` reducer.
+ Use the ES6 default arguments syntax to return an empty object as the initial state.
+ Add a `switch` statement and return `state` as the `default` case.
+ Add a case for each action type.
  + `START_RECORDING` - Increment `currTrackId`. Create a new track with the appropriate key-value pairs for `id`, `name`, `roll` and `timeStart`. SUse
 [`merge`][merge-lodash] to create a new object with the new track added to the
 state. Return this object.
  + `STOP_RECORDING` - Add a new roll to the current track's `roll` containing an empty array of `notes`, ensuring that the track is silent when it ends.
  Calculate `timeSlice` from `action.timeNow - state[currTrackId].timeStart`. Return the new state.
  + `ADD_NOTES` - Add a new roll to the current track's `roll`. Grab the `notes` played from the `action` and calculate the `timeSlice` as you did above. Return the new state.

*NB*: State must never be mutated in the redux, so make sure you are creating
and returning new objects and arrays. `Object.assign` returns a shallow copy of
an object which is why for nest objects, we must rely on `merge` from `lodash`.

[merge-lodash]:https://lodash.com/docs#merge

#### Root Reducer

+ Import your `tracks` and `recording` reducer.
+ Update your root reducer so it combines your `notes`, `tracks` and `recording` reducers.
+ Test that this works by looking at your initial application state.

## Phase 6: Recording Track Components

+ Create a new directory `components/recorder`.

### `RecorderContainer` Component

* Create a file `components/recorder/recorder.jsx`.
* Define and export `Recorder`, a functional component to start.
* Create a file `components/recorder/recorder_container.jsx`.
* Import [`connect`][connect] from `react-redux` and your `Recorder`.
* Define a `mapStateToProps(state)` function returning an object mapping the state's `tracks` and `recording`
* Import your `startRecording` and `stopRecording` action creators.
* Define a `mapDispatchToProps(dispatch)` function returning an object containing callback props for each of your action creators.
* Call `connect(mapStateToProps,
mapDispatchToProps)` on your `Recorder` component to connect it to your Redux
store.
* `export default` the result of this call.
* In your `App` component, import your `RecorderContainer` and render it.

### `Recorder` Component

* Return a `div` containing two buttons: a "Start" and a "Stop".
* [De-structure][destructure] its `props` argument.
* Disable the "Start" button if `recording`, and `onClick` `startRecording`.
* Disable the "Stop" button if not `recording`, and `onClick` `stopRecording`.

[destructure]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Pulling_fields_from_objects_passed_as_function_parameter

### `SynthContainer`

* Rewrite `mapStateToProps` to return an object mapping both the state's `notes` and `recording`.
* Import your `addNotes` action creator.
* Rewrite `mapDispatchToProps` to return an object containing a callback prop for `keyPressed(key)`, `keyReleased(key)`, and `addNotes(notes)`.

### `Synth` Component

* Rewrite `onKeyUp` and `onKeyDown` so that if `recording`, call `addNotes` passing it the store's `notes`.
* Don't remove the calls to `keyUp` and `keyDown` though! Two things are now happening:
  + Whenever the user presses/releases a key, the corresponding actions are dispatched to the store;
  + If you're recording, the notes currently in the store are saved to the end of the roll of the newest track in the state.

Now your Synthesizer plays musical notes and records tracks! Nice!

# Playing Tracks

## Phase 7: Jukebox

Let's create a `Jukebox` to display and play our recorded tracks.

### Action Creators
* Create a `actions/playing_actions.js` file.
* Export `PlayingConstants` with `START_PLAYING` and `STOP_PLAYING` key-value pairs.


### Reducers

### Components

We need a "Play" button for our `JukeBox` tracks and a `playTrack` action for our tracks.

Remember the `roll` array stores track data in the form:

```js
{
  timeSlice: (timeElapsed),
  notes: (notesArray)
}
```

`timeSlice` ensures that the `roll`'s objects are in ascending order (since `timeElapsed` increases between calls to `addNotes`). But we can't simply iterate over these objects because iteration happens (essentially) instantaneously. We instead want to *throttle* our iteration, such that we continue the next note once `Date.now() - playBackStartTime` exceeds the current note's `timeSlice`. `setInterval` allows us to invoke a callback over (relatively) large spans of time.

We want the interval to run until the end of the `track`.

Store a reference to the interval as an instance variable (`this.interval`) of the `track`. At the top of your `play` method, check if `this.interval` already exists. If it does, `return` so that we don't play the `track` over itself. Next grab `Date.now()` and assign it to a local variable `playBackStartTime`. Also initialize the local variable `currentNote` to `0`.

Now for the meat of the method: set an interval and pass in an anonymous callback. The callback should check whether `currentNote` is still in range of the `roll`. **If so**:
- Check whether `Date.now() - playBackStartTime` excessed the current note's `timeSlice`. **If so**:
  - Use one of your `KeyActions` to update the `KeyStore`.
  - Continue to the next note.
  - *Hint:* A new KeyAction such as `groupUpdate(notes)` might simplify your task.

**Else**: we've exceeded the range of the roll. Clear the interval and `delete` it from the properties of `this`.

Remember to cancel your interval when the `track` finishes playing.
```js
const intervalId = setINterval(callback, 10);
clearINterval(intervalId);
```
Don't proceed until you're about to play all of your tracks!


## Phase 8: Style Your App

Now that you have your cool app with recording and playing track features, let's make your app look nice.

+ Create a new file `application.css`.
+ Add a reference to it in `index.html`.
+ Style your app. Refer to our [HTML/CSS Curriculum][html-curriculum].

Hint: I added these css classes to my components.
```
  + app

  + synth
  + note-key-list
  + note-key

  + recorder
  + start-button
  + stop-button

  + juke-box
  + track-list
  + track
  + play-button
  + delete-button
```

[html-curriculum]:https://github.com/appacademy/curriculum/tree/master/html-css

## Bonus Phase
* **Name your Tracks:** Add a feature to rename your tracks.
* **Looping***: Add a setting to allow tracks to play continuously.
* **Playlists**: Queue up tracks to be played sequentially.
