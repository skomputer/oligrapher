import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import BaseComponent from './BaseComponent';
import AddNodeResult from './AddNodeResult';
import ChangeColorInput from './ChangeColorInput';
import { HotKeys } from 'react-hotkeys';
import ds from '../NodeDisplaySettings';


export default class AddNodeInput extends BaseComponent {
  constructor(props) {
    super(props);
    this.bindAll('_handleSubmit', '_handleSearch', '_updateForm', '_closeSearch');

  }

  render() {
    // console.log(this.props);
    // filter existing nodes out of results
    const results = this.props.results.filter(node => !this.props.nodes[node.id]);

    const keyMap = { 
      'esc': 'esc'
    };

    const scales = [
      [1, "1x"],
      [1.5, "1.5x"],
      [2, "2x"],
      [3, "3x"]
    ];

    const keyHandlers = {
      'esc': () => this.clear()
    };


    return (
      <div id="addNodeInput" className="accordionMenuForm">
        <HotKeys keyMap={keyMap} handlers={keyHandlers}>
          <form onSubmit={this._handleSubmit}>
            <label>Node:</label>
            <input type="text" className="form-control input-sm"
                   id = "nodeNameInput" 
                   placeholder="search for node" ref="name" 
                   onChange={this._handleSearch} />
            { this.props.source ? 
              <ul className="addNodeResults dropdown-menu" style={{ display: (results.length > 0) ? "block" : "none" }} ref="results">
                { results.map((node, i) =>
                  <AddNodeResult 
                    key={node.id}
                    node={node} 
                    source={this.props.source} 
                    nodes={this.props.nodes} 
                    addNode={this.props.addNode}
                    addEdge={this.props.addEdge}
                    clearResults={() => this.clear()}
                    updateForm = {(vals) => this._updateForm(vals)}/>
                  ) }
              </ul> : null }
              <label>Image:</label>
              <input
              onFocus={this._closeSearch} 
              type="text" 
              title="input image URL"
              className="form-control input-sm"
              placeholder="image URL" 
              ref="image" />
            <span>
              <label
               style ={{"marginRight": "5px"}}>Color:</label>
              <ChangeColorInput
                ref="color"
                value={this.props.pendingNodeColor}
                status={"faded"}
                onChange={(color) => this._updateColor(color)} />
              <label
                style ={{"width": "22%"}}>Scale:</label>
              <select
              title="change node size"
              className="form-control input-sm nodeSize" 
              ref="scale">
              { scales.map((scale, i) =>
                <option key={scale[1]} value={scale[0]}>{scale[1]}</option>
              ) }
            </select>
            </span>
              <label>Link:</label>
              <input
              onFocus={this._closeSearch}
              id="nodeUrlInput"
              type="text"
              title="edit node link"
              className="form-control input-sm"
              placeholder="link URL"
              ref="url"/>
          </form>
        </HotKeys>
      </div>
    );
  }

  componentDidMount(){
    this.props.setPendingNodeColor(ds.circleColor["faded"]);
  }

  componentDidUpdate(){
    if (this.props.hasNodeSubmitted){
      if (this.props.pendingEdges != null && this.props.pendingEdges != undefined){
        if (this.props.pendingEdges.length > 0){
          this.props.pendingEdges.forEach(edge => this.props.addEdge(edge));
        }
      }
      this.props.setHasNodeSubmitted(false);
      //***
      this.props.setPendingEdges(null);
      this.clear();
      this.props.closeAddForm();
      this.props.setNodeResults([]);
    }

  }

  componentWillUnmount() {
    window.clearTimeout(this.timeout);
  }

  clear() {
    this.refs.name.value = '';
    this.refs.name.blur();
    this.props.setNodeResults([]);
    this.props.closeAddForm();
  }

  _updateColor(color){
    this.props.setPendingNodeColor(color);
  }

  _closeSearch(){
    this.props.setNodeResults([]);
  }

  _handleSubmit(e) {
    let name = this.refs.name.value.trim();
    let image = this.refs.image.value.trim();
    let scale = parseFloat(this.refs.scale.value);
    let url = this.refs.url.value.trim();
    let color = this.props.pendingNodeColor;
    if (name.trim().length > 0){
      if (this.props.pendingNode != null && this.props.pendingNode != undefined){
        //update the pending node with values based on the forms
        //in case the user has changed a value from the default
        let updated_node = this.props.pendingNode;
        updated_node.display = { name, image, scale, url, color };
        this.props.addNode(updated_node);
      } else {
        this.props.addNode({ display: { name, image, scale, url, color } });
      }
    }
    this.props.setHasNodeSubmitted(true);
    this.props.setPendingNode(null);
    this.props.setPendingNodeColor(ds.circleColor["faded"]);
    if (e != undefined){
      e.preventDefault();
    }
  }

  _updateForm(vals) {
    this.refs.name.value = vals.node.display.name;
    this.refs.url.value = vals.node.display.url;
    this.refs.image.value = vals.node.display.image;
    this.props.setPendingEdges(vals.edges);
    this.props.setPendingNode(vals.node);
    this.props.setNodeResults([]);
  }

  _handleSearch() {
    if (this.props.pendingNode != null && this.props.pendingNode != undefined){
      this.props.setPendingEdges(null);
      this.props.setPendingNode(null);
    }
    // text and source required for search
    if (this.props.source) {
      let that = this;

      // cancel previously queued search
      window.clearTimeout(this.timeout);

      // queue new search
      this.timeout = setTimeout(() => {
        let query = that.refs.name.value.trim();

        if (query) {
          that.props.source.findNodes(query, nodes => that._addResults(nodes));          
        } else {
          this.setState({ results: [] })
        }
      }, 200);
    }
  }

  _addResults(nodes) {
    this.props.setNodeResults(nodes);
  }
}