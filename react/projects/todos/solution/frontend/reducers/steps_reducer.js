import { RECEIVE_STEPS,
         RECEIVE_STEP,
         REMOVE_STEP } from '../actions/step_actions';
import merge from 'lodash/merge';

const StepsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {};
  switch(action.type) {
    case RECEIVE_STEPS:
      action.steps.forEach((step) => {
        newState[step.todo_id] = newState[step.todo_id] || {};
        newState[step.todo_id][step.id] = step;
      });
      newState = merge({}, state, newState);
      return newState;
    case RECEIVE_STEP:
      newState = merge({}, state);
      newState[action.step.todo_id] = newState[action.step.todo_id] || {};
      newState[action.step.todo_id][action.step.id] = action.step;
      return newState;
    case REMOVE_STEP:
      newState = merge({}, state);
      newState[action.step.todo_id] = newState[action.step.todo_id] || {};
      delete newState[action.step.todo_id][action.step.id];
      return newState;
    default:
      return state;
  }
};

export default StepsReducer;

// Sample State Shape
// {
//   "1": {
//     1: {
//       title: "walk to store",
//       done: false
//     },
//     2: {
//       title: "buy soap",
//       done: false
//     }
//   },
//   "2": {
//     3: {
//       title: "walk to park",
//       done: false
//     },
//     4: {
//       title: "play with dog",
//       done: false
//     }
//   }
// };
