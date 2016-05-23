import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';

export default class GraphAnnotationListItem extends BaseComponent {
  constructor(props) {
    super(props);
    this.bindAll('_handleShowClick', '_handleEditClick', 'componentDidMount', 'componentWillReceiveProps', '_handleRemove', 'componentDidUpdate' );
    
    if (this.props.annotationAttributes.header == "Untitled Annotation"){
      this.state = {
        isNew: true,
        editable: true
      };
    } else {
      this.state = {
        isNew: false,
        editable: false
      };
    }
  }

  componentDidUpdate(){
    if (this.state.editable){
      if (this.props.getEditIndex != this.props.index){
        this.setState({editable: false});
      }
    }
  }

  componentDidMount(){
    this.setState({ isNew: false });
    if (this.props.getEditIndex == null && this.state.editable && this.state.isNew == false){
      this.props.setEditIndex(null);
      this.props.turnOffEditable();
      this.setState({ editable: false });
    } 
  }


  componentWillReceiveProps(){
    if (this.state.editable && this.props.getEditIndex == null){
      this.setState({ editable: false });
    }
    if (this.props.isEditTools){
      this.setState({ editable: false });
    }
  }


  _handleShowClick(e){
    this.props.doChange(this.props.index);
    if (!this.state.editable){
      this.props.turnOffEditable();
      this.props.setEditIndex(null);
    } 
  }

  _handleEditClick(e){
    this.props.doChange(this.props.index);
    if (!this.props.isEditTools){
      this.setState({ editable: !this.state.editable });
      if (this.state.editable){
        this.props.setEditIndex(null);
        this.props.turnOffEditable();
      } else {
        this.props.setEditIndex(this.props.index);
        this.props.turnOnEditable();
      }
    }
  }

  _handleRemove() {
    if (confirm("Are you sure you want to delete this annotation?")) {
      this.props.doRemove(this.props.index);
    }
  }

  _handleChange() {
  }

  render() {

      var theClass;
      if (this.props.sendClass){
        theClass = "annotationParent " + this.props.sendClass;
        if (this.state.editable && !this.props.isEditTools){
          theClass = theClass + " editableAnnotation"
        }
      } else {
        theClass = "annotationParent";
      }
    return (
      <li
        className={theClass}
        onDragStart={this.props.onDrag}
        onDragEnd={this.props.onDragEnd}
        onClick={this.props.doClick}
        draggable={true}
        id={"annotationIndex" + this.props.index}
        >
        <div 
          className="glyphicon glyphicon-edit"
          onClick={() => this._handleEditClick(event)} >
        </div>
        <div 
          className="glyphicon glyphicon-remove-sign"
          onClick={() => this._handleRemove(event)} >
        </div>
        <div
          onClick={() => this._handleShowClick(event)}
          className = {"annotationHeaderWrapper"}
          dangerouslySetInnerHTML={{ __html: this.props.annotationAttributes.header }}
          contentEditable={this.state.editable}>
        </div>
        <div
          onClick={() => this._handleShowClick(event)}
          className={"annotationBodyWrapper"}
          dangerouslySetInnerHTML={{ __html: this.props.annotationAttributes.text }}
          contentEditable={this.state.editable}>
        </div>
      </li>
    );
  }


}