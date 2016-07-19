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
require('../styles/oliFontv1Style.css');




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
              <i className={"icon-" + this.props.glyphName}></i>
            </div>
          }
          <p>
            {this.props.value}
          </p>
          {
            this.props.hasFoldOut &&
            <div className="accordianFoldOutArrow">
              <span className={this.state.open ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down"}></span>
            </div>
          }
          {
            this.props.class == "accordianButton" &&
            <div className="extendingButton">
              <i className={"icon-" + this.props.glyphName}></i>
            </div>
          }
        </div>
        {
            (this.props.hasFoldOut && this.state.open) &&
            <div className = "accordianFoldOut">
              {(this.props.value == "Add Element") ? 
                <AddElementsForm
                parentOpen={this.props.parentOpen}
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
                  parentOpen={this.props.parentOpen} 
                  prune={this.props.prune} 
                  forceLayout={this.props.forceLayout} 
                  circleLayout={this.props.circleLayout} 
                  clearGraph={this.props.clearGraph} /> : null}
              {(this.props.value == "Save") ? 
                <div>
                <GraphSettingsForm
                  parentOpen={this.props.parentOpen}
                    settings={this.props.settings}
                    updateSettings={this.props.updateSettings}
                    save={() => this.handleSave()} />
                </div> : null}
              {(this.props.value == "Help") ? "hiiiii" : null}
              {(this.props.value == "Add Node") ?
               <AddNodeInput
                parentOpen={this.props.parentOpen}
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
                parentOpen={this.props.parentOpen} 
                addEdge={this.props.addEdge} 
                nodes={this.props.nodes}
                closeAddForm={this.props.closeAddForm} 
                data={this.props.data} /> : null}
              {(this.props.value == "Add Caption") ?
                <AddCaptionForm
                  parentOpen={this.props.parentOpen} 
                addCaption={this.props.addCaption} 
                closeAddForm={this.props.closeAddForm} /> : null }
            </div>
          }
      </div>
    );
  }


  componentDidUpdate() {
    if (this.state.open && !this.props.parentOpen){
      this.setState({open: false});
    }
  }



  _toggleOpen() {
    this.setState({open: !this.state.open});
  }

}