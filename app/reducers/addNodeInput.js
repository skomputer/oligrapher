import { HAS_ADD_NODE_SUBMITTED, SET_ADD_NODE_PENDING_EDGES,
		 SET_PENDING_NODE, SET_NEW_NODE_COLOR } from '../actions';
import ds from '../NodeDisplaySettings';


const initState = { 
  hasSubmitted: false,
  pendingEdges: null,
  pendingNode: null,
  nodeColor: ds.circleColor["faded"]
};

export default function addNodeInput(state = false, action) {
  switch (action.type) {

  case HAS_ADD_NODE_SUBMITTED:
    let hasSubmitted = typeof action.value === "undefined" ? !state.hasSubmitted : action.value;
    return Object.assign({}, state, { hasSubmitted });

  case SET_ADD_NODE_PENDING_EDGES:
    let pendingEdges = typeof action.value === "undefined" ? !state.pendingEdges : action.value;
    return Object.assign({}, state, { pendingEdges });

  case SET_PENDING_NODE:
    let pendingNode = typeof action.value === "undefined" ? !state.pendingNode : action.value;
    return Object.assign({}, state, { pendingNode });

  case SET_NEW_NODE_COLOR:
    let nodeColor = typeof action.value === "undefined" ? !state.nodeColor : action.value;
    return Object.assign({}, state, { nodeColor });
    

  default:
    return state;
  }
};