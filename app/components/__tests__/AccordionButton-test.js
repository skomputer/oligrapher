jest.unmock('../BaseComponent');
jest.unmock('../AccordionButton');


import React from 'react'; 
import { shallow } from "enzyme";
import AccordionButton from '../AccordionButton';


describe("Accordion Button", () => {

  var buttonWithChildren = {"value": "ButtonA", "glyphName": "selectsampleA1", "hasFoldOut": false, "func": null, "options": [{"glyphName": "sampleA1"}, {"glyphName": "sampleA2"}]};
  var buttonWithFoldout = {"value": "ButtonB", "glyphName": "sampleB", "hasFoldOut": true, "func": null};
  var buttonWithFunc = {"value": "ButtonC", "glyphName": "sampleC", "hasFoldOut": false, "func": "someFunc"};


  it("renders an AccordionButton element for each variable in the structure array", () => {
    let wrapper = shallow(
      <div>
        <AccordionButton 
          hasFoldOut={false} />
        <AccordionButton 
          hasFoldOut={true} />
      </div>
    )
  })
  



});