import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';

export default class GraphAnnotationListItem extends BaseComponent {
  constructor(props) {
    super(props);
    // this.bindAll('_handleDragStart', '_handleDragEnd', '_handleChange');
  }

  render() {
    return (
      <li
        className={this.props.childClass}
        onDragStart={this.props.onDrag}
        onDragEnd={this.props.onDragEnd}
        onClick={this.props.onClick}
        draggable={true}
        id={"annotationIndex" + this.props.index}
        >
        <span className="glyphicon glyphicon-edit"></span>
        <input
          onChange={this._handleChange}
          value={this.props.annotationAttributes.header}
          readOnly={true} />
      </li>
    );
  }

  

  _handleChange() {

  }


}