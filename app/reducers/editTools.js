import { TOGGLE_EDIT_TOOLS, TOGGLE_ADD_FORM, SET_NODE_RESULTS, 
         CREATE_ANNOTATION, SET_HOVERED_NODE } from '../actions';

const initState = { 
  visible: false,
  addForm: null,
  nodeResults: [],
  hoveredNode: null
};

export default function editTools(state = initState, action) {
  switch (action.type) {

  case TOGGLE_EDIT_TOOLS:
    let visible = typeof action.value === "undefined" ? !state.visible : action.value;
    return Object.assign({}, state, { visible });

  case TOGGLE_ADD_FORM:
    let addForm = action.form == state.addForm ? null : action.form;
    return Object.assign({}, state, { addForm });

  case SET_NODE_RESULTS:
    return Object.assign({}, state, { nodeResults: action.nodes });

  case CREATE_ANNOTATION:
    return Object.assign({}, state, { visible: false });

  case SET_HOVERED_NODE:
    return Object.assign({}, state, { hoveredNode: action.node });

  default:
    return state;
  }
};