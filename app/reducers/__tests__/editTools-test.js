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

  /*
  
  it('stores the annotations in state.list when LOAD_ANNOTATIONS is triggered', () =>{
    let annotations = [{
      id: '123',
      header: "header",
      text: "some text here",
      nodeIds: ["x1","33180","15957"],
      edgeIds: [],
      captionIds: []
    }];
    
    
    expect(reducer(undefined, loadAnnotations(annotations))).toEqual({
      list: [{
        id: '123',
        header: "header",
        text: "some text here",
        nodeIds: ["x1","33180","15957"],
        edgeIds: [],
        captionIds: []
      }],
      visible: true,
      currentIndex: 0
    });

  });
  */
  

});
