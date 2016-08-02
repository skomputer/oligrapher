import AddNodeInput from './AddNodeInput';
import AddEdgeForm from './AddEdgeForm';
import AddCaptionForm from './AddCaptionForm';
import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';

export default class AddTools extends BaseComponent {

	constructor(props) {
    	super(props);
    	this.bindAll('_closeAddForm');
  	}

  	_closeAddForm(){
  		this.props.toggleAddForm(null);
  	}

  	_renderForm(whichFunc){
	    if (whichFunc == "Add Node"){
	        return ( <AddNodeInput
	                ref="addNodeInput"
	                addNode={this.props.graphApi.addNode}
	                addEdge={this.props.graphApi.addEdge}
	                closeAddForm={this._closeAddForm} 
	                source={this.props.dataSource} 
	                nodes={this.props.graph.nodes}
	                results={this.props.nodeResults}
	                setNodeResults={this.props.setNodeResults} />);
	    } else if (whichFunc == "Add Edge"){
	        return ( <AddEdgeForm
	                addEdge={this.props.graphApi.addEdge} 
	                nodes={this.props.graph.nodes}
	                closeAddForm={this._closeAddForm} 
	                data={this.props.data} />);

	    } else if (whichFunc == "Add Caption"){
	        return ( <AddCaptionForm
	                addCaption={this.props.graphApi.addCaption}
	                closeAddForm={this._closeAddForm} /> );
	    } 
	  }

  	render() {
  		console.log(this.props);
    	return (
	    	<div id = "addTools"
	    		className = {this.props.showEditTools ? "editMode" : null}>
	    		<div>
	    			<h1>{this.props.addForm}</h1>
	    		</div>
	    		<div className = "addContainer">
		    		{
		    			this._renderForm(this.props.addForm)
		    		}
		    	</div>
	    	</div>
	    );
	}
}