jest.unmock("../editTools");
jest.unmock('../../actions');
jest.unmock("lodash");

import reducer from "../editTools";
import {toggleEditTools, toggleAddForm, setNodeResults, 
		createAnnotation, toggleEditMenuExpanded} from '../../actions';

describe("editTools reducer", ()=>{
  
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({  	visible: false, addForm: null,
  												nodeResults: [], expanded: true});
  });

    describe('TOGGLE_EDIT_TOOLS', ()=>{

	    it('flips the visible state from false to true', ()=>{
	    	expect(reducer({visible: false}, {
	        	type: "TOGGLE_EDIT_TOOLS", value: true
	      	})).toEqual({visible: true});
	    });

	    it('flips the visible state from true to false', ()=>{
	    	expect(reducer({visible: true}, {
	        	type: "TOGGLE_EDIT_TOOLS", value: false
	      	})).toEqual({visible: false});
	    });

	    it('it outputs the same results when value is undefined as when passed a bool', ()=>{
	    	expect(reducer({visible: false}, {
	        	type: "TOGGLE_EDIT_TOOLS", value: undefined
	      	})).toEqual({visible: true});

	      	expect(reducer({visible: true}, {
	        	type: "TOGGLE_EDIT_TOOLS", value: undefined
	      	})).toEqual({visible: false});
	    });
   

  	});

    describe('TOGGLE_ADD_FORM', ()=>{

	    it('sets the form attribute to the string sent', ()=>{
	    	expect(reducer({addForm: null}, {
	        	type: "TOGGLE_ADD_FORM", form: "Add Node"
	      	})).toEqual({addForm: "Add Node"})
	    });

	    it('sets addForm to null when sent a string identical to the current form', ()=>{
	    	expect(reducer({addForm: "Add Node"}, {
	        	type: "TOGGLE_ADD_FORM", form: "Add Node"
	      	})).toEqual({addForm: null})
	    });

	    it('sets addForm to a new value when sent a string other than the current form', ()=>{
	    	expect(reducer({addForm: "Add Node"}, {
	        	type: "TOGGLE_ADD_FORM", form: "Add Edge"
	      	})).toEqual({addForm: "Add Edge"})
	    });

	    it('sets addForm to null when sent a null value for form', ()=>{
	    	expect(reducer({addForm: "Add Node"}, {
	        	type: "TOGGLE_ADD_FORM", form: null
	      	})).toEqual({addForm: null})
	    });


  	});

  	describe('SET_NODE_RESULTS', ()=>{

	    it('sets the nodeResults array to the array passed in', ()=>{
	    	let sampleNodeArray =  [{ id: "nodeA", display: { name: "Node A" } },
	        						{ id: "nodeB", display: { name: "Node B" } }];

	    	expect(reducer({nodeResults: []}, { 
		        type: 'SET_NODE_RESULTS',
		        nodes: sampleNodeArray
	      	})).toEqual({nodeResults: sampleNodeArray})
	    });

  	});

  	describe('CREATE_ANNOTATION', ()=>{

	    it('sets visible to false regardless of what is passed in', ()=>{

	    	expect(reducer({visible: true}, { 
		        type: 'CREATE_ANNOTATION',
		        newIndex: 6
	      	})).toEqual({visible: false});

	      	expect(reducer({visible: true}, { 
		        type: 'CREATE_ANNOTATION',
		        newIndex: "pancakes"
	      	})).toEqual({visible: false});
	    });

  	});

    describe('TOGGLE_EDIT_MENU_EXPANDED', ()=>{

	    it('flips the expanded state from false to true', ()=>{
	    	expect(reducer({expanded: false}, {
	        	type: "TOGGLE_EDIT_MENU_EXPANDED", value: true
	      	})).toEqual({expanded: true});
	    });

	    it('flips the expanded state from true to false', ()=>{
	    	expect(reducer({expanded: true}, {
	        	type: "TOGGLE_EDIT_MENU_EXPANDED", value: false
	      	})).toEqual({expanded: false});
	    });

	    it('it outputs the same results when value is undefined as when passed a bool', ()=>{
	    	expect(reducer({expanded: false}, {
	        	type: "TOGGLE_EDIT_MENU_EXPANDED", value: undefined
	      	})).toEqual({expanded: true});

	      	expect(reducer({expanded: true}, {
	        	type: "TOGGLE_EDIT_MENU_EXPANDED", value: undefined
	      	})).toEqual({expanded: false});
	    });
   

  });

  

});
