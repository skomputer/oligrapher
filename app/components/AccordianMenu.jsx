import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { HotKeys } from 'react-hotkeys';
import AccordianButton from './AccordianButton';
import BaseComponent from './BaseComponent';
import AddElementsForm from './AddElementsForm';
import AddNodeInput from './AddNodeInput';
import AddEdgeForm from './AddEdgeForm';
import AddCaptionForm from './AddCaptionForm';
import GraphSettingsForm from './GraphSettingsForm';
import LayoutButtons from './LayoutButtons';
import SaveButton from './SaveButton';
import findIndex from 'lodash/array/findIndex';


import MenuStructure from '../MenuStructure';

require('../styles/oliFontv1Style.css');

const structure = [
        {"value": "Mode", "glyphName": "selectannotations", "hasFoldOut": false, "func": null, "options": [{"glyphName": "annotations"}, {"glyphName": "edit"}]},
        {"value": "Add Element", "glyphName": "selectaddNode", "hasFoldOut": true, "func": null, "options": [{"glyphName": "addNode"}, {"glyphName": "addEdge"}, {"glyphName": "addCaption"}]},
        {"value": "Layout", "glyphName": "selectcircleLayout", "hasFoldOut": true, "func": null, "options": [{"glyphName": "circleLayout"}, {"glyphName": "forceLayout"}, {"glyphName": "prune"}, {"glyphName": "clear"}]},
        {"value": "Delete Selection", "glyphName": "delete", "hasFoldOut": false, "func": "delete"},
        {"value": "Save", "glyphName": "save", "hasFoldOut": true, "func": "save"},
        {"value": "Undo", "glyphName": "undo", "hasFoldOut": false, "func": "undo"},
        {"value": "Redo", "glyphName": "redo", "hasFoldOut": false, "func": "redo"},
        {"value": "Help", "glyphName": "help", "hasFoldOut": false, "func": "toggleHelpScreen"}
    ]


export default class AccordianMenu extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {"open": false};
  }

  render() {

    let _closeAddForm = () => this.props.toggleAddForm(null);


    return (
      <div className={"accordianMenu " + (this.props.showEditTools ? "editMenu" : "selectMenu") + " " + (this.state.open ? null : "closedAccordian")}>
        <div className = "showHideMenuButton"
            onClick={() => this._toggleOpen()}>
            <span className={"glyphicon glyphicon-" + (this.state.open ? "backward" : "forward")}></span>
        </div>
        {this._renderButtons()}
      </div>
    );
  }

  _enactOptionFunction(val, parent){
    if (parent != undefined){
      this._updateIcon(val, parent);
    } else {
      val = val.split("select")[1];
    }

    if (val == "addNode"){
      this.props.toggleAddForm("Add Node");
    } else if (val == "addEdge"){
      this.props.toggleAddForm("Add Edge");
    } else if (val == "addCaption"){
      this.props.toggleAddForm("Add Caption");
    } else if (val == "addEdge") {
      this.props.graphApi.addEdge();
    } else if (val == "forceLayout") {
      this.props.graphApi.forceLayout();
    } else if (val == "circleLayout"){
      this.props.graphApi.circleLayout();
    } else if (val == "prune"){
      this.props.graphApi.prune();
    } else if (val == "clear"){
      this._clearGraph();
    } else if (val == "annotations"){
      this.props.turnOffEditTools();
    } else if (val == "edit"){
      this.props.turnOnEditTools();
    }
    
  }

  _updateIcon(val, parent){
    let theIndex = _.findIndex(structure, function(d){ return d["value"] == parent});
    structure[theIndex]["glyphName"] = "select" + val;
  }

  _renderButtons(){
    return structure.map((i) =>  
      <AccordianButton 
        key={i.value} 
        parentOpen={this.state.open}
        class="accordianButton"
        value={i.value}
        glyphName={i.glyphName} 
        size={"small"}
        hasFoldOut={i.hasFoldOut}
        buttonFunc={this.props[i.func]}
        options={i.options}
        optionClick={(val, par) => this._enactOptionFunction(val, par)}>
        {this._renderChildren(i.value)}
    </AccordianButton>);

  }

  _renderChildren(whichFunc){
    if (whichFunc == "Add Element"){
        return ( <AddElementsForm
                    parentOpen={this.state.open}
                    addNode={this.props.graphApi.addNode}
                    addEdge={this.props.graphApi.addEdge}
                    addCaption={this.props.graphApi.addCaption}
                    closeAddForm={this.props.toggleAddForm} 
                    toggleAddForm={(which) => this.props.toggleAddForm(which)} 
                    source={this.props.dataSource} 
                    nodes={this.props.graph.nodes}
                    setNodeResults={this.props.setNodeResults}
                    nodeResults={this.props.nodeResults} />);
    } else if (whichFunc == "Layout"){
        return ( <LayoutButtons
                  parentOpen={this.state.open} 
                  prune={this.props.graphApi.prune} 
                  forceLayout={this.props.graphApi.forceLayout} 
                  circleLayout={this.props.graphApi.circleLayout} 
                  clearGraph={this._clearGraph} />);

    } else if (whichFunc == "Save"){
        return ( <div>
                    <GraphSettingsForm
                    parentOpen={this.state.open}
                    settings={this.props.settings}
                    updateSettings={this.props.updateSettings}
                    save={() => this.handleSave()} />
                </div> );
    } 
  }

  _clearGraph() {
    if (confirm("Are you sure you want to clear the graph? This can't be undone!")) {
      this.props.graphApi.deleteAll();
      this.props.toggleAddForm(null);
    }
  }

  _toggleOpen() {
    this.setState({"open": !this.state.open});
  }

}