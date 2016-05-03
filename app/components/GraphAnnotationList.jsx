import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';
import GraphAnnotationListItem from './GraphAnnotationListItem';

export default class GraphAnnotationList extends BaseComponent {
  constructor(props) {
    super(props);
    this.bindAll('_handleDragOver', '_handleDragStart', '_handleDragEnd', '_handleChange');
    this._placeholder = document.createElement("li");
    this._placeholder.className = "placeholder";
  }

  render() {
    return (
      <div id="oligrapherAnnotationList">
        <ul id="oligrapherAnnotationListItems" onDragOver={this._handleDragOver}>
          { this.props.annotations.map(function(annotation, index) {
            return <GraphAnnotationListItem
              onChange={(index) => this._handleChange(index)}
              sendClass={index == this.props.currentIndex ? "active" : null}
              key={annotation.id}
              annotationAttributes={annotation}
              onDrag={this._handleDragStart}
              onDragEnd={this._handleDragEnd}
              doChange={this._handleChange}
              index={index}
              />
          }, this
          ) }
        </ul>
      </div>
    );
  }


  _handleChange(index) {
    this.props.show(parseInt(index));
  }


  _handleDragStart(e) {
    this._startY = e.clientY;
    this._dragged = e.currentTarget;
    this._placeholder.innerHTML = "<span class='glyphicon glyphicon-edit'></span><div>" + (this._dragged.children[1].innerHTML) + "</div>";

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.currentTarget);
  }

  _handleDragEnd(e) {
    this._dragged.style.display = "block";
    this._placeholder.parentNode.removeChild(this._placeholder);
    let from = Number(this._dragged.id.split("annotationIndex")[1]);
    let to = Number(this._over.id.split("annotationIndex")[1]);
    this.props.move(from, to);
    this._startY = undefined;
  }

  _handleDragOver(e) {
    e.preventDefault();

    var theTarg;

    if (e.target.className == "placeholder" || e.target.dataset.reactid == undefined){
      return;
    } 

    //ensure this isn't a child element of the li
    if (e.target.className.split("annotationParent").length > 1){
      theTarg = e.target;
    } else {
      theTarg = e.target.parentNode;
    }

    let thisHeight = this._dragged.offsetHeight;
    this._dragged.style.display = "none";


    this._over = theTarg;

    let relY = e.clientY - this._startY;
    let height = (this._over.offsetHeight || thisHeight) / 2;
    let parent = theTarg.parentNode;

    if (relY > height) {
      parent.insertBefore(this._placeholder, theTarg.nextElementSibling);
    }
    else if (relY < height) {
      parent.insertBefore(this._placeholder, theTarg);
    } 
  }
}