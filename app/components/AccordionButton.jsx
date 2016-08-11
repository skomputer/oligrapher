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




export default class AccordionButton extends BaseComponent {
  constructor(props) {
    super(props);
    if (this.props.hasFoldOut){
      this.state = { open: false };
    }
    if (this.props.options){
      this.state = { optionsOpen: false };
    }
    this.bindAll('_toggleOpen', '_toggleOpenOptions', '_selectOption');
  }


  render() { 
    var isOpen = false;
    if (this.props.hasFoldOut){
      if (this.state.open){
        isOpen = true;
      }
    }


    return (
      <div className="accordionSegment">
        <div className={this.props.class + " " + this.props.size}
              onClick={this.props.hasFoldOut ? this._toggleOpen : (!this.props.isDisabled ? this.props.buttonFunc : null)}>
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
            <div className="accordionFoldOutArrow">
              <span className={isOpen ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down"}></span>
            </div>
          }
        </div>
          {
            this.props.class == "accordionButton" &&
            <div className={this.props.isDisabled ? "extendingButton disabledExtendingButton" : "extendingButton"}
                  onClick = {this.props.options ? null : (!this.props.isDisabled ? this.props.buttonFunc : null)}>
              <i className={"icon-" + this.props.glyphName}></i>
              { this.props.options &&
                <svg>
                  <path d="M 0 0 L 0 25 L 8 25 L 25 8 L 25 0 z"
                        fill="grey" stroke="grey" opacity="0"
                        onClick = {() => this.props.optionClick(this.props.glyphName)}/>
                  <path d="M 8 25 L 25 25 L 25 8 z"
                        fill="purple" stroke="grey" opacity="0"
                        onClick = {this._toggleOpenOptions}/>
                </svg>
              }
              { (this.props.options && this.state.optionsOpen) &&
                <div className = "optionButtons"
                    style={{width: this.props.options.length * 35 + "px"}}>
                  {this._renderOptionButtons(this.props.options)}
                </div>
              }
            </div>
          }
          { isOpen &&
            <div className = "accordionFoldOut">
              {this.props.children}
            </div>
          }
      </div>
    );
  }

  _renderOptionButtons(options) {
    let theParent = this.props.value;
    return options.map((i) =>
      <div key = {i.glyphName}
          className = "optionButton"
          onClick={() => this._selectOption(i.glyphName, theParent)}>
        <i className={"icon-" + i.glyphName}></i>
      </div>
    )

  }

  _selectOption(glyph, parent) {
    this.props.optionClick(glyph, parent);
    this._toggleOpenOptions();
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