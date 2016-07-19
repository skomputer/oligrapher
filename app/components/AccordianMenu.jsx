import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { HotKeys } from 'react-hotkeys';
import AccordianButton from './AccordianButton';
import BaseComponent from './BaseComponent';
import AddElementsForm from './AddElementsForm';

require('../styles/oliFontv1Style.css');




export default class AccordianMenu extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {"open": true};
  }

  render() {

    let _closeAddForm = () => this.props.toggleAddForm(null);

    return (
      <div className={"accordianMenu " + (this.state.open ? null : "closedAccordian")}>
        <div className = "showHideMenuButton"
            onClick={() => this._toggleOpen()}>
            <span className={"glyphicon glyphicon-" + (this.state.open ? "backward" : "forward")}></span>
        </div>
      {/*
        <AccordianButton
            class="accordianButton"
            value={"Select"}
            glyphName={"select"}
            size={"large"}
            hasFoldOut={false}
            onClick={this.props.toggleEditTools} />
        */}
        <AccordianButton
            parentOpen={this.state.open}
            class="accordianButton"
            value={"Add Element"}
            glyphName={"addNode"} 
            size={"small"}
            hasFoldOut={true}
            data={this.props.data}
            addNode={this.props.graphApi.addNode}
            addEdge={this.props.graphApi.addEdge}
            addCaption={this.props.graphApi.addCaption}
            closeAddForm={_closeAddForm} 
            source={this.props.dataSource} 
            nodes={this.props.graph.nodes}
            setNodeResults={this.props.setNodeResults}
            nodeResults={this.props.nodeResults} />
        {/*
        <AccordianButton
            parentOpen={this.state.open}
            class="accordianButton"
            value={"Edit Element"}
            glyphName={"editElement"} 
            size={"small"}
            hasFoldOut={true} />
        */}
        <AccordianButton
            parentOpen={this.state.open}
            class="accordianButton"
            value={"Layout"}
            glyphName={"circleLayout"} 
            size={"small"}
            hasFoldOut={true}
            prune={this.props.graphApi.prune} 
            circleLayout={this.props.graphApi.circleLayout} 
            forceLayout={this.props.graphApi.forceLayout} 
            clearGraph={() => this._clearGraph()} />
        <AccordianButton
            parentOpen={this.state.open}
            class="accordianButton"
            value={"Save"}
            glyphName={"save"} 
            size={"small"}
            hasFoldOut={true}
            save={this.props.save}
            updateSettings={this.props.updateSettings}
            settings={this.props.settings} />
        <AccordianButton
            parentOpen={this.state.open}
            class="accordianButton"
            value={"Undo"}
            glyphName={"undo"} 
            size={"small"}
            hasFoldOut={false}
            onClick={this.props.undo} />
        <AccordianButton
            parentOpen={this.state.open}
            class="accordianButton"
            value={"Redo"}
            glyphName={"redo"} 
            size={"small"}
            hasFoldOut={false}
            onClick={this.props.redo} />
        <AccordianButton
            parentOpen={this.state.open}
            class="accordianButton"
            value={"Help"}
            glyphName={"help"} 
            size={"small"}
            hasFoldOut={false}
            settings={this.props.settings}
            saveSettings={this.props.saveSettings}
            save={this.props.save} />
      </div>
    );
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