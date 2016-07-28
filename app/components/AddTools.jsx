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
  		console.log(this.props);
	    if (whichFunc == "Add Node"){
	        return ( <AddNodeInput
	                ref="addNodeInput"
	                addNode={this.props.graphApi.addNode}
	                addEdge={this.props.graphApi.addEdge}
	                closeAddForm={this._closeAddForm} 
	                source={this.props.source} 
	                nodes={this.props.nodes}
	                results={this.props.nodeResults}
	                setNodeResults={this.props.setNodeResults} />);
	    } else if (whichFunc == "Add Edge"){
	        return ( <AddEdgeForm
	                addEdge={this.props.addEdge} 
	                nodes={this.props.nodes}
	                closeAddForm={this.closeAddForm} 
	                data={this.props.data} />);

	    } else if (whichFunc == "Add Caption"){
	        return ( <AddCaptionForm
	                addCaption={this.props.addCaption}
	                closeAddForm={this.closeAddForm} /> );
	    } 
	  }

  	render() {
    	return (
	    	<div id = "addTools">
	    		<div>
	    			<h1>Yoyo</h1>
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