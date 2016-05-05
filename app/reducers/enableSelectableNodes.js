import { TOGGLE_NODE_SELECTABLE } from '../actions';

export default function enableSelectableNodes(state = false, action) {
  switch (action.type) {

  case TOGGLE_NODE_SELECTABLE:
    return typeof action.value == "undefined" ? !state : action.value;

  default:
    return state;
  }
};