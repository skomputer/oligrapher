import { TOGGLE_ACCORDION_MENU_EXPANDED } from '../actions';

const initState = { 
  expanded: true
};

export default function toggleAccordionMenuExpanded(state = false, action) {
  switch (action.type) {

  case TOGGLE_ACCORDION_MENU_EXPANDED:
    return typeof action.value == "undefined" ? !state : action.value;

  default:
    return state;
  }
};