import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import each from 'lodash/collection/each';
import { DraggableCore } from 'react-draggable';
import BaseComponent from './BaseComponent';
import Graph from '../models/Graph';
import nds from '../NodeDisplaySettings';
import ds from '../CaptionDisplaySettings';
import svgIntersections from 'svg-intersections';
import Point2D from 'kld-affine/lib/Point2D'
import bezier from 'svg-intersections/lib/functions/bezier';





export default class Lasso extends BaseComponent {
  constructor(props) {
    super(props);
    this.bindAll('_handleDragStart', '_handleDrag', '_handleDragStop');
    this.state = {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      viewBoxWidth: +this.props.graph.state.viewBox.split(" ")[2],
      viewBoxHeight: +this.props.graph.state.viewBox.split(" ")[3],
      thisOffsetLeft: null,
      thisOffsetRight: null,
      thisOffsetTop: null,
      thisOffsetBottom: null,

    }
  }

  componentWillUpdate(props){

    this.setState({thisOffsetLeft: this.refs.lassoBg.getBoundingClientRect()["left"]});
    this.setState({thisOffsetRight: this.refs.lassoBg.getBoundingClientRect()["right"]});
    this.setState({thisOffsetTop: this.refs.lassoBg.getBoundingClientRect()["top"]});
    this.setState({thisOffsetBottom: this.refs.lassoBg.getBoundingClientRect()["bottom"]});
  }



  shouldComponentUpdate(nextProps, nextState){
    return  (this.refs.lassoBg.getBoundingClientRect()["left"] != this.state.thisOffsetLeft) ||
            (this.refs.lassoBg.getBoundingClientRect()["right"] != this.state.thisOffsetRight) ||
            (this.refs.lassoBg.getBoundingClientRect()["top"] != this.state.thisOffsetTop) ||
            (this.refs.lassoBg.getBoundingClientRect()["bottom"] != this.state.thisOffsetBottom) ||
            (this.state.thisOffsetLeft == null) || 
            (this.state.height != nextState.height) || (this.state.height != nextState.height) ||
            (this.state.x != nextState.x) || (this.state.y != nextState.y);
  }

  render() {

    return (
      <g>
        <DraggableCore
            onStart={this._handleDragStart}
            onDrag={this._handleDrag}
            onStop={this._handleDragStop}>
          <rect
            ref="lassoBg"
            x={-this.state.viewBoxWidth/2}
            y={-this.state.viewBoxHeight/2}
            width={this.state.viewBoxWidth}
            height={this.state.viewBoxHeight}
            opacity = "0"/>
        </DraggableCore>
        <rect
            x={this.state.x}
            y={this.state.y}
            width={this.state.width} 
            height={this.state.height} 
            fill="none"
            stroke="#aaa"
            strokeWidth="2px"
            strokeDasharray="7,7"
            />
      </g>
    )
  }

  componentDidMount(e, ui){
    /*will need to update offsets potentially at other points*/
    this.setState({thisOffsetLeft: this.refs.lassoBg.getBoundingClientRect()["left"]});
    this.setState({thisOffsetRight: this.refs.lassoBg.getBoundingClientRect()["right"]});
    this.setState({thisOffsetTop: this.refs.lassoBg.getBoundingClientRect()["top"]});
    this.setState({thisOffsetBottom: this.refs.lassoBg.getBoundingClientRect()["bottom"]});

  }

  _handleDragStart(e, ui) {
    this.props.simulateShiftKeyDown();

    var newX = (ui.position.clientX - e.target.getBoundingClientRect()["left"])/
               (e.target.getBoundingClientRect()["right"] - e.target.getBoundingClientRect()["left"]) *
               (this.state.viewBoxWidth) - this.state.viewBoxWidth/2;

    var newY = (ui.position.clientY - e.target.getBoundingClientRect()["top"])/
               (e.target.getBoundingClientRect()["bottom"] - e.target.getBoundingClientRect()["top"]) *
               (this.state.viewBoxHeight) - this.state.viewBoxHeight/2;
    
    this.setState({x: newX});
    this.setState({y: newY});
    this._startDrag = ui.position;
    this._startPosition = {
      x: this.state.x,
      y: this.state.y
    };

  }

  _handleDragStop(e, ui) {
     if (this._dragging) {
      var graphThis = this;
      var bezierIntersections = bezier;

      each(this.props.graph.props.graph.nodes, function(n){
           var thisRadius  = nds.circleRadius * n.display.scale;
          if ((n.display.x + thisRadius) > graphThis.state.x && (n.display.x - thisRadius) < (graphThis.state.x + graphThis.state.width)
          && (n.display.y + thisRadius) > graphThis.state.y && (n.display.y - thisRadius) < (graphThis.state.y + graphThis.state.height)){
            graphThis.props.selectNode(n.id);
          }
      })


      each(this.props.graph.props.graph.captions, function(c){
          //at this point, let's approximate the width/height of text rather than getting DOM element's size
          if ((c.display.x + c.display.text.length * c.display.scale * 15 * 0.6) > graphThis.state.x && c.display.x < (graphThis.state.x + graphThis.state.width)
          && (c.display.y + ds.lineHeight * c.display.scale/2) > graphThis.state.y && (c.display.y - ds.lineHeight * c.display.scale/1.5) < (graphThis.state.y + graphThis.state.height)){
            graphThis.props.selectCaption(c.id);
          }
      })

      each(this.props.graph.props.graph.edges, function(e){

          if (e.display.x1 >= graphThis.state.x && 
              e.display.x1 <= (graphThis.state.x + graphThis.state.width) &&
              e.display.cx >= graphThis.state.x &&
              e.display.cx <= (graphThis.state.x + graphThis.state.width) &&
              e.display.x2 >= graphThis.state.x && 
              e.display.x2 <= (graphThis.state.x + graphThis.state.width) &&
              e.display.y1 >= graphThis.state.y && 
              e.display.y1 <= (graphThis.state.y + graphThis.state.height) &&
              e.display.cy >= graphThis.state.y &&
              e.display.cy <= (graphThis.state.y + graphThis.state.height) &&
              e.display.y2 >= graphThis.state.y && 
              e.display.y2 <= (graphThis.state.y + graphThis.state.height)){
            graphThis.props.selectEdge(e.id);
        } else {
            if (e.display.cx != null){

              var intersectionTop = bezierIntersections.intersectBezier2Line(
                new Point2D(e.display.xa, e.display.ya),
                new Point2D(((e.display.x1 + e.display.x2)/2 + e.display.cx), ((e.display.y1 + e.display.y2)/2 + e.display.cy)),
                new Point2D(e.display.xb, e.display.yb),
                new Point2D(graphThis.state.x, graphThis.state.y),
                new Point2D((graphThis.state.x + graphThis.state.width), graphThis.state.y));

              var intersectionRight = bezierIntersections.intersectBezier2Line(
                new Point2D(e.display.xa, e.display.ya),
                new Point2D(((e.display.x1 + e.display.x2)/2 + e.display.cx), ((e.display.y1 + e.display.y2)/2 + e.display.cy)),
                new Point2D(e.display.xb, e.display.yb),
                new Point2D((graphThis.state.x + graphThis.state.width), graphThis.state.y),
                new Point2D((graphThis.state.x + graphThis.state.width), (graphThis.state.y + graphThis.state.height)));

              var intersectionBottom = bezierIntersections.intersectBezier2Line(
                new Point2D(e.display.xa, e.display.ya),
                new Point2D(((e.display.x1 + e.display.x2)/2 + e.display.cx), ((e.display.y1 + e.display.y2)/2 + e.display.cy)),
                new Point2D(e.display.xb, e.display.yb),
                new Point2D(graphThis.state.x, (graphThis.state.y + graphThis.state.height)),
                new Point2D((graphThis.state.x + graphThis.state.width), (graphThis.state.y + graphThis.state.height)));

              var intersectionLeft = bezierIntersections.intersectBezier2Line(
                new Point2D(e.display.xa, e.display.ya),
                new Point2D(((e.display.x1 + e.display.x2)/2 + e.display.cx), ((e.display.y1 + e.display.y2)/2 + e.display.cy)),
                new Point2D(e.display.xb, e.display.yb),
                new Point2D(graphThis.state.x, (graphThis.state.y + graphThis.state.height)),
                new Point2D(graphThis.state.x, graphThis.state.y));

              if (intersectionTop.points.length > 0 || intersectionBottom.points.length > 0 || intersectionLeft.points.length > 0 || intersectionRight.points.length > 0){
                graphThis.props.selectEdge(e.id);
              }
            } 
          }
      });
        

      this.setState({ x : -500 });
      this.setState({ y : -500 });
      this.setState({ width : 0 });
      this.setState({ height : 0 });  
      }  

      this.props.simulateShiftKeyUp();  

  }

  _handleDrag(e, ui) {
    if (this.props.isLocked) return;
    

    this._dragging = true; // so that _handleClick knows it's not just a click

    let deltaX = (ui.position.clientX - this._startDrag.clientX) / this.props.graph.state.actualZoom;
    let deltaY = (ui.position.clientY - this._startDrag.clientY) / this.props.graph.state.actualZoom;
    
    let width = Math.abs(deltaX);
    let height = Math.abs(deltaY);
    this.setState({ width, height });
    if (deltaX < 0){
       var x = (ui.position.clientX - this.state.thisOffsetLeft)/
               (this.state.thisOffsetRight - this.state.thisOffsetLeft) *
               (this.state.viewBoxWidth) - this.state.viewBoxWidth/2;
      this.setState({ x });
    } 
    if (deltaY < 0){
      var y = (ui.position.clientY - this.state.thisOffsetTop)/
               (this.state.thisOffsetBottom - this.state.thisOffsetTop) *
               (this.state.viewBoxHeight) - this.state.viewBoxHeight/2;
      this.setState({ y });
    } 
  }

}
