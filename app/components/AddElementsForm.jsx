import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { HotKeys } from 'react-hotkeys';
import BaseComponent from './BaseComponent';
import AddNodeForm from './AddNodeForm';
import AddEdgeForm from './AddEdgeForm';
import AddCaptionForm from './AddCaptionForm';
import AccordianButton from './AccordianButton';

const structure = [
        {"value": "Add Node", "glyphName": "addNode", "hasFoldOut": true, "func": null},
        {"value": "Add Edge", "glyphName": "addEdge", "hasFoldOut": true, "func": null},
        {"value": "Add Caption", "glyphName": "addCaption", "hasFoldOut": true, "func": null},
    ]

export default class AddElementsForm extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {


  	return (
  		<div>
        {this._renderButtons()}
      {/*
       <AccordianButton value="Add Node"
         parentOpen={this.props.parentOpen}
         size="small"
         hasFoldOut={true}
         class="addButton"
         addNode={this.props.addNode}
         addEdge={this.props.addEdge}
         closeAddForm={this.props.closeAddForm} 
         source={this.props.source} 
         nodes={this.props.nodes}
         setNodeResults={this.props.setNodeResults}
         nodeResults={this.props.nodeResults}
         glyphName="addNode"/>
       <AccordianButton value="Add Edge"
         parentOpen={this.props.parentOpen}
         size="small"
         hasFoldOut={true}
         class="addButton"
         addEdge={this.props.addEdge}
         closeAddForm={this.props.closeAddForm} 
         nodes={this.props.nodes}
         glyphName="addEdge" />
       <AccordianButton value="Add Caption"
         parentOpen={this.props.parentOpen}
         size="small"
         hasFoldOut={true}
         class="addButton"
         addCaption={this.props.addCaption}
         closeAddForm={this.props.closeAddForm}
         glyphName="addCaption" />
       */}
     </div>
     );
  }

  _renderChildren(whichFunc){
    if (whichFunc == "Add Node"){
        return ( <AddElementsForm
                    parentOpen={this.props.parentOpen}
                    addNode={this.props.addNode}
                    addEdge={this.props.addEdge}
                    addCaption={this.props.addCaption}
                    closeAddForm={this.props.closeAddForm} 
                    source={this.props.source} 
                    nodes={this.props.nodes}
                    setNodeResults={this.props.setNodeResults}
                    nodeResults={this.props.nodeResults} />);
    } else if (whichFunc == "Add Edge"){
        return ( <LayoutButtons
                  parentOpen={this.props.graphApi.parentOpen} 
                  prune={this.props.graphApi.prune} 
                  forceLayout={this.props.graphApi.forceLayout} 
                  circleLayout={this.props.graphApi.circleLayout} 
                  clearGraph={this._clearGraph} />);

    } else if (whichFunc == "Add Caption"){
        return ( <div>
                    <GraphSettingsForm
                    parentOpen={this.props.parentOpen}
                    settings={this.props.settings}
                    updateSettings={this.props.updateSettings}
                    save={() => this.handleSave()} />
                </div> );
    } 
  }

  _renderButtons(){
    return structure.map((i) =>  
      <AccordianButton 
        key={i.value} 
        parentOpen={false}
        class="addButton"
        value={i.value}
        glyphName={i.glyphName} 
        size={"small"}
        hasFoldOut={i.hasFoldOut}
        buttonFunc={this.props[i.func]}>
    </AccordianButton>);

  }


}