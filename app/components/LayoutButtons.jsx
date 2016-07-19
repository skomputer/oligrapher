import React, { Component, PropTypes } from 'react';
import AccordianButton from './AccordianButton';


export default class LayoutButtons extends Component {

  render() {
    return (
      <div id="layoutButtons" className="buttonGroup">
        <AccordianButton
          class="addButton"
          value={"Circle Layout"} 
          size={"small"}
          hasFoldOut={false}
          onClick={this.props.circleLayout} />
        <AccordianButton
          class="addButton"
          value={"Force Layout"} 
          size={"small"}
          hasFoldOut={false}
          onClick={this.props.forceLayout} />
        <AccordianButton
          class="addButton"
          value={"Remove Unattached"} 
          size={"small"}
          hasFoldOut={false}
          onClick={this.props.prune} />
        <AccordianButton
          class="addButton"
          value={"Clear Graph"} 
          size={"small"}
          hasFoldOut={false}
          onClick={this.props.clearGraph} />
      </div>
    );
  }
}