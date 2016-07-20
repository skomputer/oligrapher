import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { HotKeys } from 'react-hotkeys';
import BaseComponent from './BaseComponent';
import AddNodeInput from './AddNodeInput';
import AddEdgeForm from './AddEdgeForm';
import AddCaptionForm from './AddCaptionForm';
import AccordianButton from './AccordianButton';


const structure = [
        {"value": "Add Node", "glyphName": "addNode", "hasFoldOut": true, "func": null},
        {"value": "Add Edge", "glyphName": "addEdge", "hasFoldOut": true, "func": null},
        {"value": "Add Caption", "glyphName": "addCaption", "hasFoldOut": true, "func": null},
    ]
/*CONTINUE TO EDIT!*/
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
    console.log(this.props);
    if (whichFunc == "Add Node"){
        return ( <AddNodeInput
                parentOpen={false}
                ref="addNodeInput"
                addNode={this.props.addNode}
                addEdge={this.props.addEdge}
                closeAddForm={this.props.closeAddForm} 
                source={this.props.source} 
                nodes={this.props.nodes}
                results={this.props.nodeResults}
                setNodeResults={this.props.setNodeResults} />);
    } else if (whichFunc == "Add Edge"){
        return ( <AddEdgeForm
                parentOpen={false} 
                addEdge={this.props.addEdge} 
                nodes={this.props.nodes}
                closeAddForm={this.props.closeAddForm} 
                data={this.props.data} />);

    } else if (whichFunc == "Add Caption"){
        return ( <AddCaptionForm
                parentOpen={false} 
                addCaption={this.props.addCaption}
                closeAddForm={this.props.closeAddForm} /> );
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
          {this._renderChildren(i.value)}
    </AccordianButton>);

  }


}