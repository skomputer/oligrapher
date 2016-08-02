import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import BaseComponent from './BaseComponent';
import AddNodeResult from './AddNodeResult';
import { HotKeys } from 'react-hotkeys';

export default class AddNodeInput extends BaseComponent {
  constructor(props) {
    super(props);
    this.bindAll('_handleSubmit', '_handleSearch', '_updateForm');

  }

  render() {
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
      <div id="addNodeInput" className="accordianMenuForm">
        <HotKeys keyMap={keyMap} handlers={keyHandlers}>
          <form onSubmit={this._handleSubmit}>
            <label>Node:</label>
            <input type="text" className="form-control input-sm" placeholder="search for node" ref="name" onChange={this._handleSearch} />
            { this.props.source ? 
              <ul className="addNodeResults dropdown-menu" style={{ display: results.length > 0 ? "block" : "none" }} ref="results">
                { results.map((node, i) =>
                  <AddNodeResult 
                    scale={parseFloat(this.refs.scale.value)}
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
              type="text" 
              title="input image URL"
              className="form-control input-sm"
              placeholder="image URL" 
              ref="image" />
              <label>Link:</label>
              <input
              id="nodeUrlInput"
              type="text"
              title="edit node link"
              className="form-control input-sm"
              placeholder="link URL"
              ref="url"/>
              <label>Scale:</label>
              <select
              title="change node size"
              className="form-control input-sm nodeSize" 
              ref="scale">
              { scales.map((scale, i) =>
                <option key={scale[1]} value={scale[0]}>{scale[1]}</option>
              ) }
            </select>
          </form>
        </HotKeys>
      </div>
    );
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

  _handleSubmit(e) {
    let name = this.refs.name.value.trim();
    let image = this.refs.image.value.trim();
    let scale = parseFloat(this.refs.scale.value);
    let url = this.refs.url.value.trim();
    this.props.addNode({ display: { name, image, scale, url } });
    this.clear();
    this.props.closeAddForm();
    if (e != undefined){
      e.preventDefault();
    }
  }

  _updateForm(vals) {
    this.refs.name.value = vals.node.display.name;
    this.refs.url.value = vals.node.display.url;
    this.refs.image.value = vals.node.display.image;
    this.props.setNodeResults([]);
  }

  _handleSearch() {
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