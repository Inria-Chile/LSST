import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount,shallow} from "enzyme"; 
import Environment from '../Environment';


Enzyme.configure({ adapter: new Adapter() });


/*----Mount test ----*/
 
describe('when temperature is set',function(){
    let props;
    let mountedEnvironment;
    //function that mount an Environment component or returns the one that has already been mounted.
    const environmentComponent = ()=>{
      if(!mountedEnvironment){
        mountedEnvironment = mount(
          <Environment {...props} />
        );
      }
      return mountedEnvironment;
    }
  
    beforeEach(() => {
      props = {
        temperature: undefined,
  
      };
      mountedEnvironment = undefined;
    });
  
    it("always renders a div", () => {
      const divs = environmentComponent().find("div");
      expect(divs.length).toBeGreaterThan(0);
  
    });
  });
  