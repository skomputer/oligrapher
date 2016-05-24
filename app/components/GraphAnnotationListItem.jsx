import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';
import Editor from 'react-medium-editor';


export default class GraphAnnotationListItem extends BaseComponent {
  constructor(props) {
    super(props);
    this.bindAll('componentDidMount', 'componentWillReceiveProps', 'componentDidUpdate', '_handleShowClick', '_handleEditClick', '_handleRemove', '_handleHeaderChange', '_handleTextChange' );
    if (this.props.annotationAttributes.header == "Untitled Annotation"){
      this.state = {
        isNew: true,
        editable: true,
        header: this.props.annotationAttributes.header,
        text: this.props.annotationAttributes.text
      };
    } else {
      this.state = {
        isNew: false,
        editable: false,
        header: this.props.annotationAttributes.header,
        text: this.props.annotationAttributes.text
      };
    }
  }

  componentDidUpdate(){
    if (this.state.editable){
      if (this.props.getEditIndex != this.props.index){
        this.setState({editable: false});
      }
      if (this.props.isEditTools){
        this.setState({editable: false});
        this.props.setEditIndex(null);
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
    if (this.state.editable){
      this.refs.editorHeader.medium.subscribe("blur", () => {
        this.saveText();
      });

      this.refs.editorBody.medium.subscribe("blur", () => {
        this.saveText();
      });
    } 
  }

  componentWillReceiveProps(){
    if (this.state.editable && this.props.getEditIndex == null){
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
    if (this.props.isEditTools){
      this.props.turnOffEditTools();
    }
    this.props.doChange(this.props.index);
    this.setState({ editable: !this.state.editable });
    if (this.state.editable){
      this.props.setEditIndex(null);
      this.props.turnOffEditable();
    } else {
      this.props.setEditIndex(this.props.index);
      this.props.turnOnEditable();
    }

  }

  _handleHeaderChange(value, medium) {
    this.setState({ header: value });
  }

  _handleTextChange(value, medium) {
    this.setState({ text: value });
  }

  _handleRemove() {
    if (confirm("Are you sure you want to delete this annotation?")) {
      this.props.doRemove(this.props.index);
    }
  }

  saveText() {
    this.props.update(this.props.currentIndex, this.state);
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

    let editorHeaderOptions = { 
      toolbar: { buttons: [
        'bold', 'italic', 'underline'
      ] },
      targetBlank: true, 
      placeholder: { text: "Annotation title" }
    }

    let editorBodyOptions = { 
      toolbar: { buttons: [
        'bold', 'italic', 'underline', 'h3', 'h4', 'quote', 'unorderedlist', 'orderedlist'
      ] },
      targetBlank: true, 
      placeholder: { text: "Type your annotation here..." }
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
        { this.props.isEditor == true ? 
          <div 
            className="glyphicon glyphicon-edit"
            onClick={() => this._handleEditClick(event)} >
          </div> : null
        }
        { this.props.isEditor == true ? 
          <div 
            className="glyphicon glyphicon-remove-sign"
            onClick={() => this._handleRemove(event)} >
          </div> : null
        }
        { this.state.editable == true ? 
            <Editor
              ref="editorHeader" 
              onClick={() => this._handleShowClick(event)}
              className="annotationHeaderWrapper"
              text={this.state.header}
              options={editorHeaderOptions}
              onChange={this._handleHeaderChange} >
            </Editor> : 
            <div
              onClick={() => this._handleShowClick(event)}
              className = {"annotationHeaderWrapper"}
              dangerouslySetInnerHTML={{ __html: this.state.header }}>
          </div> }
          { this.state.editable == true ? 
            <Editor
              ref="editorBody" 
              onClick={() => this._handleShowClick(event)}
              className="annotationBodyWrapper"
              text={this.state.text}
              options={editorBodyOptions}
              onChange={this._handleTextChange} >
            </Editor> : 
            <div
              onClick={() => this._handleShowClick(event)}
              className = {"annotationBodyWrapper"}
              dangerouslySetInnerHTML={{ __html: this.state.text }}>
          </div> }
      </li>
    );
  }


}