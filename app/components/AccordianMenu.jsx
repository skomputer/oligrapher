import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { HotKeys } from 'react-hotkeys';
import AccordianButton from './AccordianButton';
import BaseComponent from './BaseComponent';
require('../styles/oliFontv1Style.css');




export default class AccordianMenu extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {

    let _closeAddForm = () => this.props.toggleAddForm(null);

    return (
      <div className="accordianMenu">
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
            class="accordianButton"
            value={"Add Element"}
            glyphName={"addNode"} 
            size={"small"}
            hasFoldOut={true}
            data={this.props.data}
            addNode={this.props.graphApi.addNode}
            addEdge={this.props.graphApi.addEdge}
            closeAddForm={_closeAddForm} 
            source={this.props.dataSource} 
            nodes={this.props.graph.nodes}
            setNodeResults={this.props.setNodeResults}
            nodeResults={this.props.nodeResults} />
        <AccordianButton
            class="accordianButton"
            value={"Edit Element"}
            glyphName={"editElement"} 
            size={"small"}
            hasFoldOut={true} />
        <AccordianButton
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
            class="accordianButton"
            value={"Save"}
            glyphName={"select"} 
            size={"small"}
            hasFoldOut={true}
            save={this.props.save}
            updateSettings={this.props.updateSettings}
            settings={this.props.settings} />
        <AccordianButton
            class="accordianButton"
            value={"Undo"}
            glyphName={"undo"} 
            size={"small"}
            hasFoldOut={false}
            onClick={this.props.undo} />
        <AccordianButton
            class="accordianButton"
            value={"Redo"}
            glyphName={"redo"} 
            size={"small"}
            hasFoldOut={false}
            onClick={this.props.redo} />
        <AccordianButton
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

}