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
    this.props.onChange(this.props.index);
  }

  _handleEditClick(e){

  }

  _handleChange() {

  }

  render() {
    return (
      <li
        className={this.props.sendClass}
        onDragStart={this.props.onDrag}
        onDragEnd={this.props.onDragEnd}
        onClick={() => this._handleShowClick(event)}
        draggable={true}
        id={"annotationIndex" + this.props.index}
        >
        <span 
          className="glyphicon glyphicon-edit"
          onClick={() => this._handleEditClick(event)}
        ></span>
        <input
          value={this.props.annotationAttributes.header}
          readOnly={true} />
      </li>
    );
  }



}