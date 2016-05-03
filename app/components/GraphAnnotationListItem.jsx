import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';

export default class GraphAnnotationListItem extends BaseComponent {
  constructor(props) {
    super(props);
    this.bindAll('_handleShowClick', '_handleEditClick');
    this.state = {
      active: false
    };
  }



  _handleShowClick(e){
    this.setState({ active: !this.state.active });
    this.props.doChange(this.props.index);

  }

  _handleEditClick(e){

  }

  _handleChange() {

  }

  render() {
    var theClass = this.props.sendClass ? ("annotationParent " + this.props.sendClass) : "annotationParent";
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
        <span 
          className="glyphicon glyphicon-edit"
        ></span>
        <div
          className = {"annotationHeaderWrapper"}
          dangerouslySetInnerHTML={{ __html: this.props.annotationAttributes.header }}
          onClick={() => this._handleEditClick(event)}>
        </div>
        <div
          className={"annotationBodyWrapper"}
          dangerouslySetInnerHTML={{ __html: this.props.annotationAttributes.text }}>
        </div>
      </li>
    );
  }


}