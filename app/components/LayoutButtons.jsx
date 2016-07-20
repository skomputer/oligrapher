import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';
import AccordianButton from './AccordianButton';

const structure = [
        {"value": "Circle Layout", "glyphName": "circleLayout", "hasFoldOut": false, "func": "circleLayout"},
        {"value": "Force Layout", "glyphName": "forceLayout", "hasFoldOut": false, "func": "forceLayout"},
        {"value": "Remove Unattached", "glyphName": "prune", "hasFoldOut": false, "func": "prune"},
        {"value": "Clear", "glyphName": "clear", "hasFoldOut": false, "func": "clearGraph"}
    ]


export default class LayoutButtonsexport extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="layoutButtons" className="buttonGroup">
        {this._renderButtons()}
      </div>
    );
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
        buttonFunc={this.props[i.func]} />);

  }
}