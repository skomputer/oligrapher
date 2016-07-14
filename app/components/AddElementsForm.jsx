import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { HotKeys } from 'react-hotkeys';
import BaseComponent from './BaseComponent';
import AddNodeForm from './AddNodeForm';
import AddEdgeForm from './AddEdgeForm';
import AddCaptionForm from './AddCaptionForm';
import AccordianButton from './AccordianButton';

export default class AddElementsForm extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {


  	return (
  		<div>
       <AccordianButton value="Add Node"
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
         size="small"
         hasFoldOut={true}
         class="addButton"
         addEdge={this.props.addEdge}
         closeAddForm={this.props.closeAddForm} 
         nodes={this.props.nodes}
         glyphName="addEdge" />
       <AccordianButton value="Add Caption"
         size="small"
         hasFoldOut={true}
         class="addButton"
         addCaption={this.props.addCaption}
         closeAddForm={this.props.closeAddForm}
         glyphName="addCaption" />
     </div>
     );
  }

}