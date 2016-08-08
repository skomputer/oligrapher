import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { HotKeys } from 'react-hotkeys';
import BaseComponent from './BaseComponent';
import AccordionButton from './AccordionButton';


const structure = [
        {"value": "Add Node", "glyphName": "addNode", "hasFoldOut": false},
        {"value": "Add Edge", "glyphName": "addEdge", "hasFoldOut": false},
        {"value": "Add Caption", "glyphName": "addCaption", "hasFoldOut": false},
    ]
/*CONTINUE TO EDIT!*/
export default class AddElementsForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.bindAll('_doToggle');

  }

  render() {

  	return (
  		<div>
        {this._renderButtons()}
     </div>
     );
  }

  _doToggle(theVal){
    this.props.toggleAddForm(theVal);
  }


  _renderButtons(){
    return structure.map((i) =>  
      <AccordionButton 
        key={i.value} 
        parentOpen={this.props.parentOpen}
        class="addButton"
        value={i.value}
        glyphName={i.glyphName} 
        size={"small"}
        hasFoldOut={i.hasFoldOut}
        buttonFunc={() => this._doToggle(i.value)}>
    </AccordionButton>);

  }


}