jest.unmock('../BaseComponent');
jest.unmock('../AccordionMenu');
jest.unmock('../AccordionButton');


import React from 'react'; 
import { shallow } from "enzyme";
import AccordionMenu from '../AccordionMenu';
import AccordionButton from '../AccordionButton';


describe("Node Component", () => {

  let wrapper;

  const structure = [
        {"value": "Mode", "glyphName": "selectannotations", "hasFoldOut": false, "func": null, "options": [{"glyphName": "annotations"}, {"glyphName": "edit"}]},
        {"value": "Add Element", "glyphName": "selectaddNode", "hasFoldOut": true, "func": null, "options": [{"glyphName": "addNode"}, {"glyphName": "addEdge"}, {"glyphName": "addCaption"}]},
        {"value": "Layout", "glyphName": "selectcircleLayout", "hasFoldOut": true, "func": null, "options": [{"glyphName": "circleLayout"}, {"glyphName": "forceLayout"}, {"glyphName": "prune"}, {"glyphName": "clear"}]},
        {"value": "Delete Selection", "glyphName": "delete", "hasFoldOut": false, "func": "delete", "mustBeTrue": "showEditTools"},
        {"value": "Save", "glyphName": "save", "hasFoldOut": true, "func": "save"},
        {"value": "Undo", "glyphName": "undo", "hasFoldOut": false, "func": "undo", "mustBeTrue": "canUndo"},
        {"value": "Redo", "glyphName": "redo", "hasFoldOut": false, "func": "redo", "mustBeTrue": "canRedo"},
        {"value": "Help", "glyphName": "help", "hasFoldOut": false, "func": "toggleHelpScreen"}
    ]

  // beforeEach(() => {
  //   wrapper = shallow(
  //     <AccordionMenu />
  //   )
  // });

  // it("should do something", () => {
  //   console.log(wrapper);
  // })

});