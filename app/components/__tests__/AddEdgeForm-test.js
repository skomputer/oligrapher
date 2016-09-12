jest.unmock('../BaseComponent');
jest.unmock('../AddEdgeForm');
jest.unmock('react-select');

import React from 'react'; 
import { mount } from "enzyme";

import AddEdgeForm from "../AddEdgeForm";

describe("AddEdgeForm", () => {
	
	let nodes = { 1: { id: 1, display: { name: "Node 1" } }, 2: { id: 2, display: { name: "Node 2"} }, 3: { id: 3, display: { name: "Node 3" } } };

	describe("rendering", () => {

	    it("renders two react-select elements", () => {
	    	let wrapper = mount(
		      <AddEdgeForm 
		        data={null} 
		        nodes={nodes} />
		    );
	    	expect(wrapper.find("Select").length).toBe(2);

	      	let firstReactSelect = wrapper.ref("node1Id");
	      	expect(firstReactSelect.is("Select")).toBe(true);

	      	let secondReactSelect = wrapper.ref("node2Id");
	      	expect(secondReactSelect.is("Select")).toBe(true);
	    });

	    it("renders one an additional input element (not part of React-Selects)", () => {
	    	let wrapper = mount(
		      <AddEdgeForm 
		        data={null} 
		        nodes={nodes} />
		    );
	    	expect(wrapper.find(".form-control.input-sm").length).toBe(1);
	    });

	    it("returns empty string values for the two Select elements if data is null", () => {
	    	let wrapper = mount(
		      <AddEdgeForm 
		        data={null} 
		        nodes={nodes} />
		    );
	    	let firstReactSelect = wrapper.ref("node1Id");
	      	expect(firstReactSelect.get(0).state.value).toBe('');

	      	let secondReactSelect = wrapper.ref("node2Id");
	      	expect(secondReactSelect.get(0).state.value).toBe('');
	    });

	    it("returns the first two node values from the data array for the two Select elements if data array > 1", () => {
	    	let wrapper = mount(
		      <AddEdgeForm 
		        data={[{ id: 1, display: { name: "Node 1" } }, { id: 2, display: { name: "Node 2"} }]} 
		        nodes={nodes} />
		    );
	    	let firstReactSelect = wrapper.ref("node1Id");
	    	expect(firstReactSelect.get(0).state.value).toBe(1);

	      	let secondReactSelect = wrapper.ref("node2Id");
	      	expect(secondReactSelect.get(0).state.value).toBe(2);
	    });

	    it("sets the state of only the first Select component to equal the id of a single passed in node data", () => {
	    	let wrapper = mount(
		      <AddEdgeForm 
		        data={{ id: 1, display: { name: "Node 1" } }} 
		        nodes={nodes} />
		    );
	    	let firstReactSelect = wrapper.ref("node1Id");
	    	expect(firstReactSelect.get(0).state.value).toBe(1);

	      	let secondReactSelect = wrapper.ref("node2Id");
	      	expect(secondReactSelect.get(0).state.value).toBe('');
	    });

	    it("sets the Select components options to correspond to the nodes prop", () => {
	    	let wrapper = mount(
		      <AddEdgeForm 
		        nodes={nodes} />
		    );
	    	let firstReactSelect = wrapper.ref("node1Id");
	    	expect(firstReactSelect.get(0).props.options.length).toBe(Object.keys(nodes).length);

	    	let secondReactSelect = wrapper.ref("node2Id");
	    	expect(secondReactSelect.get(0).props.options.length).toBe(Object.keys(nodes).length);

	    });
	})

	describe("behaviour", () => {
		let addEdgeFunction = jest.genMockFunction();
		let closeAddFormFunction = jest.genMockFunction();;

		 it("calls to both addEdge and to closeAddForm when enter is pressed on a non-empty label input field", () => {
		 	let wrapper = mount(
		      <AddEdgeForm 
		        addEdge= {addEdgeFunction}
		        closeAddForm= {closeAddFormFunction}
		        data={[{ id: 1, display: { name: "Node 1" } }, { id: 2, display: { name: "Node 2"} }]} 
		        nodes={nodes} />
		    );

		 	let selectForm = wrapper.find(".form-control.input-sm");
		 	selectForm.get(0).value = 'label';
		 	selectForm.simulate('keyPress', { key: "Enter" });
		 	expect(addEdgeFunction.mock.calls.length).toBe(1);
		 	expect(closeAddFormFunction.mock.calls.length).toBe(1);

	    });


	})



})