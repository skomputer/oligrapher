jest.unmock("../editTools");
jest.unmock('../../actions');
jest.unmock("lodash");

import reducer from "../editTools";
import {setHoveredNode} from '../../actions';


describe("editTools reducer", ()=>{
  
  	it("should return initial state", () => {
    	expect(reducer(undefined, {})).toEqual({visible: false, addForm: null,
												nodeResults: [], hoveredNode: null });
	});

  	describe('SET_HOVERED_NODE', ()=>{

	    it('sets hoveredNode to the nodeId passed in', ()=>{
	    	expect(reducer({hoveredNode: null}, { 
		        type: 'SET_HOVERED_NODE',
		        node: "nodeA"
	      	})).toEqual({"hoveredNode": "nodeA"})
	    });

	    it('sets hoveredNode to null when null is passed in', ()=>{
	    	expect(reducer({hoveredNode: "nodeB"}, { 
		        type: 'SET_HOVERED_NODE',
		        node: null
	      	})).toEqual({"hoveredNode": null})
	    });

  	});


  

});
