import AddNodeInput from './AddNodeInput';
import AddEdgeForm from './AddEdgeForm';
import AddCaptionForm from './AddCaptionForm';
import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';


export default class AddTools extends BaseComponent {

	constructor(props) {
    	super(props);
    	this.bindAll('_closeAddForm', '_submitForm');
  	}

  	_closeAddForm(){
  		this.props.toggleAddForm(null);
  	}

  	_submitForm(whichFunc){
  		if (whichFunc == "Add Node"){
  			this.refs.addNodeInput._handleSubmit();
  		} else if (whichFunc == "Add Edge"){
  			this.refs.addEdgeInput._handleSubmit();
  		} else if (whichFunc == "Add Caption"){
  			this.refs.addCaptionInput._handleSubmit();
  		}
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
	                setNodeResults={this.props.setNodeResults}
	                setHasNodeSubmitted={this.props.setHasNodeSubmitted}
	                hasNodeSubmitted={this.props.hasNodeSubmitted}
	                pendingEdges = {this.props.pendingEdges}
	                setPendingEdges = {this.props.setPendingEdges}
	                pendingNode = {this.props.pendingNode}
	                setPendingNode = {this.props.setPendingNode}
	                pendingNodeColor = {this.props.pendingNodeColor}
	                setPendingNodeColor = {this.props.setPendingNodeColor} />);
	    } else if (whichFunc == "Add Edge"){
	        return ( <AddEdgeForm
	        		ref="addEdgeInput"
	                addEdge={this.props.graphApi.addEdge} 
	                nodes={this.props.graph.nodes}
	                closeAddForm={this._closeAddForm} 
	                data={this.props.data} />);

	    } else if (whichFunc == "Add Caption"){
	        return ( <AddCaptionForm
	        		ref="addCaptionInput"
	                addCaption={this.props.graphApi.addCaption}
	                closeAddForm={this._closeAddForm} /> );
	    } 
	  }



  	render() {


    	return (
		    <div id = "addTools"
		    	className = {this.props.showEditTools ? "editMode" : null}>
		    	<div className = "addToolsHeader">
		    		<h1>{this.props.addForm}</h1>
		    	</div>
		    	<div className = "addToolsCloser"
		    		onClick={() => this._closeAddForm()}>
		    		<span className="glyphicon glyphicon-remove"></span>
		    	</div>
		    	<div className = "addContainer">
			   		{
			   			this._renderForm(this.props.addForm)
			   		}
			   	</div>
			   	<button className="btn btn-sm btn-default"
			   		onClick={() => this._submitForm(this.props.addForm)}>Submit</button>
		    </div>
	    );
	}
}