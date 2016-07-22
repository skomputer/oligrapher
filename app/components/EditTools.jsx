import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';
import UndoButtons from './UndoButtons';
import LayoutButtons from './LayoutButtons';
import EditButtons from './EditButtons';
import AddEdgeForm from './AddEdgeForm';
import AddCaptionForm from './AddCaptionForm';
import AddConnectedNodesForm from './AddConnectedNodesForm';
import DeleteSelectedButton from './DeleteSelectedButton';
import UpdateNodeForm from './UpdateNodeForm';
import UpdateEdgeForm from './UpdateEdgeForm';
import UpdateCaptionForm from './UpdateCaptionForm';
import HelpScreen from './HelpScreen';

export default class EditTools extends BaseComponent {

  constructor(props) {
    super(props);
    this.bindAll('_handleDelete');

  }

  render() {
    let { graphApi, source, data, graph, addForm, currentForm, helpScreen,
          clearGraph, closeAddForm, toggleHelpScreen, toggleAddEdgeForm } = this.props;

    let { zoomIn, zoomOut, resetZoom, prune, circleLayout, 
        addNode, addEdge, addCaption, addSurroundingNodes,
        updateNode, updateEdge, updateCaption, deselectAll,
        deleteAll, getGraph } = graphApi;

    return (
      <div id="editTools">
        <div id="buttons">
          { currentForm == 'UpdateCaptionForm' && 
          <UpdateCaptionForm 
            updateCaption={updateCaption} 
            data={data}
            deselect={deselectAll} /> }
         
          { this.props.hideHelp ? null : <button id="helpButton" className="btn btn-sm btn-default buttonGroup" onClick={toggleHelpScreen}>help</button> }

        </div>

        { currentForm == 'UpdateNodeForm' && 
            <UpdateNodeForm 
              updateNode={updateNode} 
              data={data} 
              deselect={deselectAll} /> }
        { currentForm == 'UpdateEdgeForm' && 
          <UpdateEdgeForm 
            updateEdge={updateEdge} 
            getGraph={getGraph} 
            data={data}
            deselect={deselectAll} /> }       
        { helpScreen && !this.props.hideHelp ? <HelpScreen source={source} /> : null }
      </div>
    );
  }

  _handleDelete() {
    this.props.delete();
  }
}
