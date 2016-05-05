import { TOGGLE_SETTINGS } from '../actions';

export default function showSettings(state = false, action) {
  switch (action.type) {

  case TOGGLE_SETTINGS:
  	console.log(action, state);
    return typeof action.value == "undefined" ? !state : action.value;

  default:
    return state;
  }
};