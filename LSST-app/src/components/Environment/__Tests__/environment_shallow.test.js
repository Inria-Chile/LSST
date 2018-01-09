import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount,shallow} from "enzyme"; 
import Environment from '../Environment';


Enzyme.configure({ adapter: new Adapter() });

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
  
  