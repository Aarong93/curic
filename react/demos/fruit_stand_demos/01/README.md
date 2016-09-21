# Fruit Stand App
## Phase 1 - Redux Only

This is simple **Redux** app with a `store`, a  `reducer` and actions.

**NB**: There are no React components in this phase.

---

Let's look at the code that you just walked through in our Redux [store reading][store-reading].

[Live Demo][live-demo]

+ Actions are defined in [`frontend/actions.js`][actions-code].
+ The app's `reducer` (i.e. reducing function) is defined in [`frontend/reducer.js`][reducer-code].
+ The app's Redux store is instantiated in [`frontend/store.js`][store-code].
  + The Redux store constructor `createStore` is imported from `redux`.
  + The app's `reducer` is imported from `frontend/reducer.js`.

The app's `store` and actions `addOrange` and `addApple` are defined on the `window`.

+ Open up Dev Tools from the live demo
+ Try dispatching actions to see how they change the app's state.

For example,
```
store.getState();
store.dispatch(addOrange);
store.getState();
store.dispatch(addApple);
store.getState();
```

+ Create new actions on the `window`.
+ Try dispatching them. How do they change the app's state?

For example,
```
const addLychee = { type: 'ADD_FRUIT', fruit: 'lychee' };
store.dispatch(addLychee);
store.getState();
```

In the [next phase][fruit-stand-demo-02], we will add React components to render the fruit stored in the app's state.


If you want to run the code yourself, follow these instructions:
  1. Download [zip][zip].
  2. Unzip and cd to the app's root directory.
  3. Run `npm install` to install the Redux npm packages.
  4. Run `webpack` to compile `bundle.js`.
  4. `open index.html` to see the app in the browser.
  5. Open Dev Tools to see the app's Redux store in action.


[zip]: ./fruit_stand_redux_only.zip
[live-demo]:
[store-reading]:
[store-code]: ./frontend/store.js
[reducer-code]:./frontend/reducer.js
[actions-code]:./frontend/actions.js
[fruit-stand-demo-02]
