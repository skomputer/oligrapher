import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';


export default class GraphNavButtons extends BaseComponent {
  constructor(props) {
    super(props);
    this.bindAll('_handleNewAnnotation');
  }

  render() {
    return (
      <div id="oligrapherNavButtons">
        <button 
          className="btn btn-lg btn-default" 
          onClick={this.props.prevClick} 
          disabled={!this.props.canClickPrev}>Prev</button>
        <button 
          className="clickplz btn btn-lg btn-default" 
          onClick={this.props.nextClick} 
          disabled={!this.props.canClickNext}>Next</button>
        { this.props.isEditor ? 
          <button 
            onClick={this._handleNewAnnotation}
            id="oligrapherCreateGraphAnnotationButton"
            className="btn btn-lg btn-default" >
            <span className="glyphicon glyphicon-plus"></span>
            <span className="newAnnotationText"></span>
          </button> : null }
      </div>

    );
  }

  _handleNewAnnotation() {
    this.props.create();
  }

  
}