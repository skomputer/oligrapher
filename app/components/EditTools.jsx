import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';
import UndoButtons from './UndoButtons';
import EditButtons from './EditButtons';
import DeleteSelectedButton from './DeleteSelectedButton';
import UpdateNodeForm from './UpdateNodeForm';
import UpdateEdgeForm from './UpdateEdgeForm';
import UpdateCaptionForm from './UpdateCaptionForm';

export default class EditTools extends BaseComponent {

  constructor(props) {
    super(props);

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
        { currentForm == null &&
          <div>
            <p>
              Select a node, link, or caption to edit it!
            </p>
          </div>
        }     
      </div>
    );
  }

}
