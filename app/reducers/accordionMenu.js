import { TOGGLE_ACCORDION_MENU_EXPANDED } from '../actions';

const initState = { 
  expanded: false
};

export default function toggleAccordionMenuExpanded(state = false, action) {
  switch (action.type) {

  case TOGGLE_ACCORDION_MENU_EXPANDED:
    let expanded = typeof action.value === "undefined" ? !state.expanded : action.value;
    return Object.assign({}, state, { expanded });

  default:
    return state;
  }
};