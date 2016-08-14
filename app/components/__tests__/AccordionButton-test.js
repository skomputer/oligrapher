jest.unmock('../BaseComponent');
jest.unmock('../AccordionButton');


import React from 'react'; 
import { mount } from "enzyme";
import AccordionButton from '../AccordionButton';


describe("Accordion Button", () => {

  var buttonWithChildren = {"value": "ButtonA", "glyphName": "selectsampleA1", "hasFoldOut": false, "func": null, "options": [{"glyphName": "sampleA1"}, {"glyphName": "sampleA2"}]};
  var buttonWithFoldout = {"value": "ButtonB", "glyphName": "sampleB", "hasFoldOut": true, "func": null};
  var buttonWithFunc = {"value": "ButtonC", "glyphName": "sampleC", "hasFoldOut": false, "func": "someFunc"};


  it("renders a null-state component when props hasFoldOut==false, and it has no options", () => {
    let wrapper = mount(
      <div>
        <AccordionButton
          hasFoldOut={false} />
      </div>
    )

    wrapper.update();

    var noFoldOut = wrapper.find(AccordionButton).get(0);
    expect(noFoldOut.state).toBe(null);

  })

  it("renders a button that toggles state between open/close when passed hasFoldOut and parentOpen == true", () => {
    //remember: class is a prop passed to AccordionButton to determine className
    let wrapper = mount(
      <div>
        <AccordionButton
          parentOpen={true}
          hasFoldOut={true}
          class="toggleClicker" />
      </div>
    )

    var hasFoldOut = wrapper.find(AccordionButton).get(0);
    expect(hasFoldOut.state.open).toBe(false);

    var toggleClicker = wrapper.find(AccordionButton).find(".toggleClicker");
    toggleClicker.simulate("click");

    wrapper.update();

    expect(hasFoldOut.state.open).toBe(true);
  })

  //note: issues related to unit testing svgs referenced in nodetest relevant here
    it("renders an svg when passed an options prop", () => {
    //remember: class is a prop passed to AccordionButton to determine className
    let wrapper = mount(
      <div>
        <AccordionButton
          parentOpen={true}
          options={[{"glyphName": "optA"}, {"glyphName": "optB"}]}
          glyphName="selectoptA"
          class="accordionButton" />
      </div>
    )

    var hasOptions = wrapper.find(AccordionButton).get(0);
    expect(hasOptions.state.optionsOpen).toBe(false);

    var toggleOptionOpen = wrapper.find("svg");
  })
  



});