import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import BaseComponent from './BaseComponent';
import ZoomButtons from './ZoomButtons';
import EditTools from './EditTools';
import { DraggableCore } from 'react-draggable';
import merge from 'lodash/object/merge';
import values from 'lodash/object/values';
import cloneDeep from 'lodash/lang/cloneDeep';
import pick from 'lodash/object/pick';
require('../styles/bootstrap-3.3.6.css');
require('../styles/oligrapher.editor.css');

export default class Editor extends BaseComponent {
  constructor(props) {
    super(props);

  }

  render() {
    let zoomIn, zoomOut, resetZoom;

    if (this.props.graphApi) {
      zoomIn = () => this.props.graphApi.zoomIn();
      zoomOut = () => this.props.graphApi.zoomOut();
      resetZoom = () => this.props.graphApi.resetZoom();    
    }

    let _closeAddForm = () => this.props.toggleAddForm(null);

    let { currentForm, formData, addForm } = this._computeEditForms(this.props.selection);

    let fetchInterlocks = () => {};
    let showInterlocksButton = (
      this.props.isEditor && this.props.dataSource && this.props.dataSource.getInterlocks && formData && formData.length == 2
    );

    if (showInterlocksButton) {
      let node1Id = formData[0].id;
      let node2Id = formData[1].id;
      let nodeIds = Object.keys(this.props.graph.nodes);
      fetchInterlocks = () => { 
        this.props.fetchInterlocks(node1Id, node2Id, nodeIds, this.props.dataSource.getInterlocks);
      }
    }

    return (
        <div id="oligrapherEditorWrapper"
              className={this.props.isEditMenuExpanded ? null : "closedMenu"}>
          <div className = "dragMenuButton"
                onClick={this.props.toggleExpanded}>
            <span className={"glyphicon glyphicon-" + (this.props.isEditMenuExpanded ? "forward" : "backward")}></span>
          </div>
          {this.props.isEditMenuExpanded &&
            <div id="oligrapherEditorContainer">
                { this.props.showEditButton && this.props.isEditor && 
                  <button 
                    id="toggleEditTools" 
                    className="btn btn-sm btn-default" 
                    onClick={() => this.props.toggleEditTools()}>
                    <span className="glyphicon glyphicon-pencil"></span>
                  </button>
                }
                { this.props.showEditTools && 
                  <EditTools
                    ref="editTools"
                    {...this.props}
                    closeAddForm={_closeAddForm} 
                    source={this.props.dataSource} 
                    toggleAddEdgeForm={() => this._toggleAddEdgeForm()}
                    toggleHelpScreen={() => this._toggleHelpScreen()}
                    clearGraph={() => this._clearGraph()}
                    data={formData}
                    addForm={addForm}
                    currentForm={currentForm}
                    showInterlocksButton={showInterlocksButton}
                    fetchInterlocks={fetchInterlocks}
                    delete={this.props.delete} />
                }       
            </div>
          }
          {!this.props.isEditMenuExpanded &&
            <div className ="largeEditButton"
                  onClick={this.props.toggleExpanded}>
              <i className="icon-edit"/>
              <p>Edit</p>
            </div>
          }
      </div>
    );
  }

  _computeEditForms() {
    let currentForm = null;
    let formData = null;
    let addForm = this.props.addForm;

    if (this.props.showSettings) {
      return { currentForm, formData, addForm: null };
    }

    let { nodeIds, edgeIds, captionIds } = this.props.selection;
    let graph = this.props.graph;
    let nodes = pick(graph.nodes, nodeIds);
    let edges = pick(graph.edges, edgeIds);
    let captions = pick(graph.captions, captionIds);
    let nodeCount = Object.keys(nodes).length;
    let edgeCount = Object.keys(edges).length;
    let captionCount = Object.keys(captions).length;

    if (nodeCount == 1 && edgeCount == 0 && captionCount == 0) {
      currentForm = 'UpdateNodeForm';
      formData = values(nodes)[0];
    } else if (nodeCount == 0 && edgeCount == 1 && captionCount == 0) {
      currentForm = 'UpdateEdgeForm';
      addForm = null;
      formData = values(edges)[0];
    } else if (nodeCount == 0 && edgeCount == 0 && captionCount == 1) {
      currentForm = 'UpdateCaptionForm';
      addForm = null;
      formData = values(captions)[0];
    } else if (nodeCount == 2 && edgeCount == 0 && captionCount == 0) {
      currentForm = 'AddInterlocksForm';
      addForm = null;
      formData = values(nodes);
    } else {
      currentForm = null;
      formData = null;
    }

    return { currentForm, formData, addForm };
  }

  _toggleAddEdgeForm() {
    this.props.toggleAddForm('AddEdgeForm');
  }

  _toggleAddCaptionForm() {
    this.props.toggleAddForm('AddCaptionForm');
  }

  _toggleAddConnectedNodesForm() {
    this.props.toggleAddForm('AddConnectedNodesForm');
  }

  _clearGraph() {
    if (confirm("Are you sure you want to clear the graph? This can't be undone!")) {
      this.props.graphApi.deleteAll();
      this.props.toggleAddForm(null);
    }
  }

  _clearForms() {
    this.props.toggleAddForm(null);
    this.props.graphApi.deselectAll();
    this.refs.editTools.refs.editButtons.refs.addNodeInput.clear();
  }

  _focusAddNodeInput() {
    this.refs.editTools.refs.editButtons.refs.addNodeInput.refs.name.focus();
  }

  // _toggleExpandedEditor() {
  //   this.setState({"expandedEditor": !this.state.expandedEditor});
  // }


}
