import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount,shallow} from "enzyme"; 
import Environment from '../Environment';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });


/*----Snapshot testing----*/
describe('environment_Test',function(){
  it('renders correctly', () => {
    const tree = renderer
      .create(<Environment temperature = {32}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  
})


/*----Mount test ----*/
//TODO: Hacer bien los test de mount cuando los del shallow esten bien. 
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



describe("Environment shallow testing",function(){
  describe("When a temperature is passed",function(){
    let environment,props;

    /*set up*/
    beforeEach(()=>{
      props = {
        temperature : 50,
      }
      environment = shallow(<Environment {...props}/>)
    })

    /*tests*/
    it('renders 1 table',()=>{
      expect(environment.find('table').length).toEqual(1);
    })

    it('should contain 6 table columns',()=>{
      expect(environment.find("td").length).toBe(6);
    })

    it('should have the right message',()=>{

      let temperature = props.temperature;
      let message = (temperature*9/5+32).toFixed(1);
      message=message.concat('ºF / ');
      message=message.concat(temperature.toFixed(1));
      message=message.concat('ºC');

      const tdWrapper = environment.find('td').at(1);
      expect(tdWrapper.text()).toEqual(message);
    })


  })

  describe("When a temperature is not passed",function(){
    let environment,props;

    /*set up*/
    beforeEach(()=>{
      environment = shallow(<Environment {...props}/>)
    })

    /*tests*/
    it('renders 1 table',()=>{
      expect(environment.find('table').length).toEqual(1);
    })

    it('should contain 6 table columns',()=>{
      expect(environment.find("td").length).toBe(6);
    })



    it('should have the right message',()=>{

      const message = "Unavailable"
      const tdWrapper = environment.find('td').at(1);
      expect(tdWrapper.text()).toEqual(message);
    })
  });


  
});

  //TODO: if a humidity is passed, its value should appear in the table.
  //TODO: if its not passed it shold say Unavailable. 



  //TODO: if a pressure is passed, its value should appear in the table.
  //TODO: if its not passed it shold say Unavailable. 

