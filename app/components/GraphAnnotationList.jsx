import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';

export default class GraphAnnotationList extends BaseComponent {
  constructor(props) {
    super(props);
    this.bindAll('_handleClick', '_handleDragOver', '_handleDragStart', '_handleDragEnd', '_handleChange');
    this._placeholder = document.createElement("li");
    this._placeholder.className = "placeholder";
  }

  render() {
    return (
      <div id="oligrapherAnnotationList">
        <ul id="oligrapherAnnotationListItems" onDragOver={this._handleDragOver}>
          { this.props.annotations.map((annotation, index) =>
          <li key={annotation.id}
              onDragStart={this._handleDragStart}
              onDragEnd={this._handleDragEnd}
              draggable={true} 
              className={index == this.props.currentIndex ? "active" : null}
              data-id={index} >
            <span className="glyphicon glyphicon-edit"></span>
            <input
              draggable={false}
              onClick={this._handleClick}
              onChange={this._handleChange}
              value={annotation.header.trim().length > 0 ? annotation.header : "Untitled Annotation"}
              readOnly={true} />
          </li>
          ) }
        </ul>
      </div>
    );
  }

  _handleChange(e) {
    // console.log(annotation.header);
  }

  _handleClick(e) {
    this.props.show(parseInt(e.target.dataset.id));

    if (this.props.isEditor) { 
      this.props.hideEditTools();
    };
  }

  _handleDragStart(e) {
    if (!e.currentTarget.draggable){
      e.currentTarget = e.target.parentNode;
    }
    this._startY = e.clientY;
    this._dragged = e.currentTarget;
    this._placeholder.innerHTML = '<span className="glyphicon glyphicon-edit"></span>';

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.currentTarget);
  }

  _handleDragEnd(e) {
    this._dragged.style.display = "block";
    this._placeholder.parentNode.removeChild(this._placeholder);

    // update store
    let from = Number(this._dragged.dataset.id);
    let to = Number(this._over.dataset.id);

    this.props.move(from, to);

    this._startY = undefined;
  }

  _handleDragOver(e) {
    e.preventDefault();
    if (!e.target.draggable){
      e.target = e.target.parentNode;
    }

    let thisHeight = this._dragged.offsetHeight;
    this._dragged.style.display = "none";

    if (e.target.className == "placeholder") return;
    this._over = e.target;

    let relY = e.clientY - this._startY;
    let height = (this._over.offsetHeight || thisHeight) / 2;

    let parent = e.target.parentNode;

    if (relY > height) {
      parent.insertBefore(this._placeholder, e.target.nextElementSibling);
    }
    else if (relY < height) {
      parent.insertBefore(this._placeholder, e.target);
    } 
  }
}