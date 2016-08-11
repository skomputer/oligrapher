jest.unmock('../BaseComponent');
jest.unmock('../AccordionMenu');
jest.unmock('../AccordionButton');


import React from 'react'; 
import { shallow } from "enzyme";
import AccordionMenu from '../AccordionMenu';
import AccordionButton from '../AccordionButton';


describe("Node Component", () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <AccordionMenu />
    )
  });

  it("should do something", () => {
    console.log(wrapper);
  })

});