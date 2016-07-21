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
    if (this.props.options){
      this.state = { optionsOpen: false };
    }
    this.bindAll('_toggleOpen', '_toggleOpenOptions');
  }


  render() { 
    var isOpen = false;
    if (this.props.hasFoldOut){
      if (this.state.open){
        isOpen = true;
      }
    }


    return (
      <div className="accordianSegment">
        <div className={this.props.class + " " + this.props.size}
              onClick={this.props.hasFoldOut ? this._toggleOpen : this.props.buttonFunc}>
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
            <div className="extendingButton"
                  onClick = {this.props.options ? this._toggleOpenOptions : null}>
              <i className={"icon-" + this.props.glyphName}></i>
              { (this.props.options && this.state.optionsOpen) &&
                <div className = "optionButtons"
                    style={{width: this.props.options.length * 35 + "px"}}>
                  {this._renderOptionButtons(this.props.options)}
                </div>
              }
            </div>
          }
        </div>
          { isOpen &&
            <div className = "accordianFoldOut">
              {this.props.children}
            </div>
          }
      </div>
    );
  }

  _renderOptionButtons(options) {
    return options.map((i) =>
      <div key = {i.glyphName}
          className = "optionButton"
          onClick={() => this.props.optionClick("hey")}>
        <i className={"icon-" + i.glyphName}></i>
      </div>
    )

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

  _toggleOpenOptions() {
    if (this.props.options){
      this.setState({optionsOpen: !this.state.optionsOpen});
    }
  }

}