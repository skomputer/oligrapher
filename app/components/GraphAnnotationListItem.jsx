import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';

export default class GraphAnnotationListItem extends BaseComponent {
  constructor(props) {
    super(props);
    this.bindAll('_handleShowClick', '_handleEditClick');
    this.state = {
      editable: false
    };
  }

  _handleShowClick(e){
    //check if was previously editable and turn off if returning
    if (this.state.editable) {
      this.setState({ editable: false });
    }
    this.props.doChange(this.props.index);
    this.props.turnOffEditable();
  }

  _handleEditClick(e){
    if (!this.props.isEditMode){
      this.setState({ editable: !this.state.editable });
      if (this.state.editable) {
        this.props.turnOnEditable();
      } else { 
        this.props.turnOffEditable();
      }
    }
  }

  _handleChange() {

  }

  render() {
    var theClass;
    if (!this.props.isEditMode){
      if (this.props.sendClass){
        theClass = "annotationParent " + this.props.sendClass;
        if (this.state.editable){
          theClass = theClass + " editableAnnotation";
        }
      } else {
        theClass = "annotationParent";
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
        onClick={() => this._handleShowClick(event)}
        draggable={true}
        id={"annotationIndex" + this.props.index}
        >
        <div 
          className="glyphicon glyphicon-edit"
          onClick={() => this._handleEditClick(event)} >
        </div>
        <div
          className = {"annotationHeaderWrapper"}
          dangerouslySetInnerHTML={{ __html: this.props.annotationAttributes.header }}
          contentEditable={this.state.editable}>
        </div>
        <div
          className={"annotationBodyWrapper"}
          dangerouslySetInnerHTML={{ __html: this.props.annotationAttributes.text }}
          contentEditable={this.state.editable}>
        </div>
      </li>
    );
  }


}