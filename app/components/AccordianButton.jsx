import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { HotKeys } from 'react-hotkeys';
import BaseComponent from './BaseComponent';
import AddElementsForm from './AddElementsForm';
import AddNodeInput from './AddNodeInput';
import AddEdgeForm from './AddEdgeForm';
import AddCaptionForm from './AddCaptionForm';
import GraphSettingsForm from './GraphSettingsForm';
import LayoutButtons from './LayoutButtons';
import SaveButton from './SaveButton';
require('../styles/oliFontv1Style.css');




export default class AccordianButton extends BaseComponent {
  constructor(props) {
    super(props);
    if (this.props.hasFoldOut){
      this.state = { open: false };
    }
    this.bindAll('_toggleOpen');
  }

  render() { 
    var isOpen = false;
    if (this.props.hasFoldOut){
      if (this.state.open){
        isOpen = true;
      }
    }
    console.log(this.props.children);


    return (
      <div className="accordianSegment">
        <div className={this.props.class + " " + this.props.size}
              onClick={this.props.hasFoldOut ? this._toggleOpen : this.props.onClick}>
          {
            this.props.class == "addButton" &&
            <div className="addButtonGlyph">
              <i className={"icon-" + this.props.glyphName}></i>
            </div>
          }
          <p>
            {this.props.value}
          </p>
          {
            this.props.hasFoldOut &&
            <div className="accordianFoldOutArrow">
              <span className={isOpen ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down"}></span>
            </div>
          }
          {
            this.props.class == "accordianButton" &&
            <div className="extendingButton">
              <i className={"icon-" + this.props.glyphName}></i>
            </div>
          }
        </div>
        { isOpen && this.props.children }
      </div>
    );
  }


  componentDidUpdate() {
    if (this.props.hasFoldOut){
      if (this.state.open && !this.props.parentOpen){
        this.setState({open: false});
      }
    }
  }



  _toggleOpen() {
    if (this.props.hasFoldOut){
      this.setState({open: !this.state.open});
    }
  }

}