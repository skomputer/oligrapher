import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { HotKeys } from 'react-hotkeys';
import AccordianButton from './AccordianButton';
import BaseComponent from './BaseComponent';



export default class AccordianMenu extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {

    let _closeAddForm = () => this.props.toggleAddForm(null);

    return (
      <div className="accordianMenu">
        <AccordianButton
            class="accordianButton"
            value={"Select"}
            size={"large"}
            hasFoldOut={false}
            onClick={this.props.toggleEditTools}
            glyph={"plus"} />
        <AccordianButton
            class="accordianButton"
            value={"Add Element"} 
            size={"small"}
            hasFoldOut={true}
            data={this.props.data}
            addNode={this.props.graphApi.addNode}
            addEdge={this.props.graphApi.addEdge}
            closeAddForm={_closeAddForm} 
            source={this.props.dataSource} 
            nodes={this.props.graph.nodes}
            setNodeResults={this.props.setNodeResults}
            nodeResults={this.props.nodeResults}
            glyph={"plus"} />
        <AccordianButton
            class="accordianButton"
            value={"Edit Element"} 
            size={"small"}
            hasFoldOut={true}
            glyph={"plus"} />
        <AccordianButton
            class="accordianButton"
            value={"Layout"} 
            size={"small"}
            hasFoldOut={true}
            prune={this.props.graphApi.prune} 
            circleLayout={this.props.graphApi.circleLayout} 
            forceLayout={this.props.graphApi.forceLayout} 
            clearGraph={() => this._clearGraph()}
            glyph={"plus"} />
        <AccordianButton
            class="accordianButton"
            value={"Save"} 
            size={"small"}
            hasFoldOut={true}
            save={this.props.save}
            updateSettings={this.props.updateSettings}
            settings={this.props.settings}
            glyph={"plus"} />
        <AccordianButton
            class="accordianButton"
            value={"Undo"} 
            size={"small"}
            hasFoldOut={false}
            glyph={"plus"}
            onClick={this.props.undo} />
        <AccordianButton
            class="accordianButton"
            value={"Redo"} 
            size={"small"}
            hasFoldOut={false}
            glyph={"plus"}
            onClick={this.props.redo} />
        <AccordianButton
            class="accordianButton"
            value={"Help"} 
            size={"small"}
            hasFoldOut={false}
            settings={this.props.settings}
            saveSettings={this.props.saveSettings}
            save={this.props.save}
            glyph={"plus"} />
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