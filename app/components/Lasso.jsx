import React, { Component, PropTypes } from 'react';
import each from 'lodash/collection/each';
import { DraggableCore } from 'react-draggable';
import BaseComponent from './BaseComponent';
import Graph from '../models/Graph';
import nds from '../NodeDisplaySettings';
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
            opacity = {0.2}/>
        </DraggableCore>
        <rect
            x={this.state.x}
            y={this.state.y}
            width={this.state.width} 
            height={this.state.height} 
            fill={"orange"} 
            opacity={0.5}/>
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
      var shape = svgIntersections.shape;
      var bezierIntersections = bezier;
      // console.log(bezierIntersections);
      // console.log(svgIntersections);
                              // var inp = SvgDom.intersectShapes(shape1.node, shape2.node)

      // var shape = svgIntersections.shape;
   
      console.log(bezierIntersections);


      // console.log(shape);
    //   var intersections = svgIntersections.intersect(  
    //     shape("bezier", { x1: -27, y1: 359, x2: -181, y2: 200, cx: -37, cy: 27 }),
    //     shape("rect", { x: 0, y: 0, width: 60, height: 30 })  
    // );
    //   console.log(intersections)


      each(this.props.graph.props.graph.nodes, function(n){
        if (n.display.status != "highlighted"){
           var thisRadius  = nds.circleRadius * n.display.scale;
          if ((n.display.x + thisRadius) > graphThis.state.x && (n.display.x - thisRadius) < (graphThis.state.x + graphThis.state.width)
          && (n.display.y + thisRadius) > graphThis.state.y && (n.display.y - thisRadius) < (graphThis.state.y + graphThis.state.height)){
            graphThis.props.selectNode(n.id);
          }
        }
      })

      each(this.props.graph.props.graph.edges, function(e){
        if (e.display.status != "highlighted"){
            if (e.display.cx != null){
              var intersectionTop = bezierIntersections.intersectBezier2Line(
                new Point2D(e.display.x1, e.display.y1),
                new Point2D(e.display.cx, e.display.cy),
                new Point2D(e.display.x2, e.display.y2),
                new Point2D(graphThis.state.x, graphThis.state.y),
                new Point2D((graphThis.state.x + graphThis.state.width), graphThis.state.y));

              var intersectionRight = bezierIntersections.intersectBezier2Line(
                new Point2D(e.display.x1, e.display.y1),
                new Point2D(e.display.cx, e.display.cy),
                new Point2D(e.display.x2, e.display.y2),
                new Point2D((graphThis.state.x + graphThis.state.width), graphThis.state.y),
                new Point2D((graphThis.state.x + graphThis.state.width), (graphThis.state.y + graphThis.state.height)));

              var intersectionBottom = bezierIntersections.intersectBezier2Line(
                new Point2D(e.display.x1, e.display.y1),
                new Point2D(e.display.cx, e.display.cy),
                new Point2D(e.display.x2, e.display.y2),
                new Point2D(graphThis.state.x, (graphThis.state.y + graphThis.state.height)),
                new Point2D((graphThis.state.x + graphThis.state.width), (graphThis.state.y + graphThis.state.height)));

              var intersectionLeft = bezierIntersections.intersectBezier2Line(
                new Point2D(e.display.x1, e.display.y1),
                new Point2D(e.display.cx, e.display.cy),
                new Point2D(e.display.x2, e.display.y2),
                new Point2D(graphThis.state.x, (graphThis.state.y + graphThis.state.height)),
                new Point2D(graphThis.state.x, graphThis.state.y));
              
              if (intersectionTop.points.length > 0 || intersectionBottom.points.length > 0 || intersectionLeft.points.length > 0 || intersectionRight.points.length > 0){
                graphThis.props.selectEdge(e.id);
              }
            } 
        }
      })

      this.setState({ x : -500 });
      this.setState({ y : -500 });
      this.setState({ width : 0 });
      this.setState({ height : 0 });      
    }


    // console.log(this.props.graph.nodes, this.props.graph.edges, this.props.graph.captions);

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
