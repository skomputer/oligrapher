import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { HotKeys } from 'react-hotkeys';
import BaseComponent from './BaseComponent';
import AddElementsForm from './AddElementsForm';
import AddNodeInput from './AddNodeInput';
import AddEdgeForm from './AddEdgeForm';
import AddCaptionForm from './AddCaptionForm';
import GraphSettingsForm from './GraphSettingsForm';
import LayoutButtons from './LayoutButtons';
import SaveButton from './SaveButton';




export default class AccordianButton extends BaseComponent {
  constructor(props) {
    super(props);
    if (this.props.hasFoldOut){
      this.state = { open: false };
    }
    this.bindAll('_toggleOpen');
  }

  render() { 

    return (
      <div className="accordianSegment">
        <div className={this.props.class + " " + this.props.size}
              onClick={this.props.hasFoldOut ? this._toggleOpen : this.props.onClick}>
          {
            this.props.class == "addButton" &&
            <div className="addButtonGlyph">
              <span className={"glyphicon glyphicon-" + this.props.glyph}></span>
            </div>
          }
          <p>
            {this.props.value}
          </p>
          {
            this.props.hasFoldOut && this.props.class == "accordianButton" &&
            <div className="accordianFoldOutArrow">
              <span className={this.state.open ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down"}></span>
            </div>
          }
          {
            this.props.class == "accordianButton" &&
            <div className="extendingButton">
              <span className={"glyphicon glyphicon-" + this.props.glyph}></span>
            </div>
          }
        </div>
        {
            (this.props.hasFoldOut && this.state.open) &&
            <div className = "accordianFoldOut">
              {(this.props.value == "Add Element") ? 
                <AddElementsForm
                addNode={this.props.addNode}
                addEdge={this.props.addEdge}
                closeAddForm={this.props.closeAddForm} 
                source={this.props.source} 
                nodes={this.props.nodes}
                setNodeResults={this.props.setNodeResults}
                nodeResults={this.props.nodeResults} /> : null}
              {(this.props.value == "Edit Element") ? "hiiiii" : null}
              {(this.props.value == "Layout") ?           
                <LayoutButtons 
                  prune={this.props.prune} 
                  forceLayout={this.props.forceLayout} 
                  circleLayout={this.props.circleLayout} 
                  clearGraph={this.props.clearGraph} /> : null}
              {(this.props.value == "Save") ? 
                <div>
                <GraphSettingsForm
                    settings={this.props.settings}
                    updateSettings={this.props.updateSettings} />
                    <SaveButton save={() => this.handleSave()} />
                </div> : null}
              {(this.props.value == "Help") ? "hiiiii" : null}
              {(this.props.value == "Add Node") ?
               <AddNodeInput
                ref="addNodeInput"
                addNode={this.props.addNode}
                addEdge={this.props.addEdge}
                closeAddForm={this.props.closeAddForm} 
                source={this.props.source} 
                nodes={this.props.nodes}
                results={this.props.nodeResults}
                setNodeResults={this.props.setNodeResults} /> : null}
              {(this.props.value == "Add Edge") ?
               <AddEdgeForm 
                addEdge={this.props.addEdge} 
                nodes={this.props.nodes}
                closeAddForm={this.props.closeAddForm} 
                data={this.props.data} /> : null}
              {(this.props.value == "Add Caption") ?
                <AddCaptionForm 
                addCaption={this.props.addCaption} 
                closeAddForm={this.props.closeAddForm} /> : null }
            </div>
          }
      </div>
    );
  }

  _toggleOpen() {
    this.setState({open: !this.state.open});
  }

}