import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';
import Select from 'react-select';
import values from 'lodash/object/values';
import sortBy from 'lodash/collection/sortBy';
import { HotKeys } from 'react-hotkeys';

export default class AddEdgeForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.bindAll('_handleSubmit');
  }

  render() {
    let node1Id, node2Id;

    if (Array.isArray(this.props.data) && this.props.data.length == 2) {
      node1Id = this.props.data[0].id;
      node2Id = this.props.data[1].id;
    } else {
      node1Id = this.props.data ? this.props.data.id : null;
      node2Id = null;
    }

    const keyMap = { 
      'altN': ['alt+n', 'ctrl+n'],
      'esc': 'esc'
    };

    const keyHandlers = {
      'altN': () => this.props.closeAddForm(),
      'esc': () => this._clear()
    };

    let nodes = sortBy(values(this.props.nodes), (node) => node.display.name);

    let nodesMapped = nodes.map(function(node, i) {
            return (
              { key: node.id, value: node.id, label: node.display.name }
            );
          });

    //note the keypress listener on input so it submits the form on enter
    //due to Select library elements containing input forms
    return (
      <div id="addEdgeForm" className="editForm">
        <HotKeys keyMap={keyMap} handlers={keyHandlers}>
          <form onSubmit={this._handleSubmit}>
            <Select
                ref="node1Id"
                value={node1Id}
                name="node 1"
                options={nodesMapped}
                placeholder="First node"
            />
            <Select
                ref="node2Id"
                value={node2Id}
                name="node 2"
                options={nodesMapped}
                placeholder="Second node"
            />
            <input type="text" placeholder="label" className="form-control input-sm" ref="label"
                    onKeyPress={(e) => e.key == "Enter" ? this._handleSubmit(e) : null } />
          </form>
        </HotKeys>
      </div>
    );
  }

  _handleSubmit(e) {
    let node1Id = this.refs.node1Id.state.value;
    let node2Id = this.refs.node2Id.state.value;
    let label = this.refs.label.value.trim();

    if (node1Id && node2Id && label) {
      this.props.addEdge({ node1_id: node1Id, node2_id: node2Id, display: { label } });
      this._clear();
      this.props.closeAddForm();      
    }

    e.preventDefault();
  }

  _clear() {
    this.refs.node1Id.value = '';
    this.refs.node2Id.value = '';
    this.refs.label.value = '';
  }
}