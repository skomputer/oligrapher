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
    this.props.doChange(this.props.index);
  }

  _handleEditClick(e){
    this.setState({ editable: !this.state.editable });
    this.props.turnOnEditable();
  }

  _handleChange() {

  }

  render() {
    var theClass = this.props.sendClass ? ("annotationParent " + this.props.sendClass) : "annotationParent";
    if (this.state.editable){
      theClass = theClass + " editableAnnotation";
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