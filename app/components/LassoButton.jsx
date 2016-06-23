import React, { Component, PropTypes } from 'react';

export default class LassoButton extends Component {

  render() {
    return (
      <button 
        id="oligrapherLassoButton" 
        className={"btn btn-sm btn-default " + (this.props.lassoActive ? "lassoActiveMode" : null)}
        title={this.props.showEditTools ? "disable lasso tool" : "enable lasso tool"}
        onClick={this.props.toggle}>
        <span>
          <svg  xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" >
            <rect x="0"
                  y="0"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="#333"
                  strokeWidth="3"
                  strokeDasharray="4,3"  />
          </svg>
        </span>
      </button>
    );
  }
}
