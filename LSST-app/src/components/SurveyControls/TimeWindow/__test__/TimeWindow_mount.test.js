import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount} from "enzyme"; 
import TimeWindow  from "../TimeWindow";
import sinon from 'sinon';
Enzyme.configure({ adapter: new Adapter() });

describe('Time window test with mount',function(){
    //montar la cosa y probar handle change, llamarlo con un change event inventado. 
    let mountedTimeWindow;
    let setTimeWindow = sinon.spy();
    const TimeWindowComponent = ()=>{
        if(!mountedTimeWindow){
          mountedTimeWindow = mount(
            <TimeWindow setTimeWindow = {setTimeWindow} />
          );
        }
        return mountedTimeWindow;
      };
    
      
    describe('should call handleChange right',function(){
        let changeEvent;
        beforeEach(()=>{
            mountedTimeWindow = undefined;
            TimeWindowComponent();
            changeEvent = {
                target : {value : 5},
            }
       

        });
        it('should call setTimeWindow',()=>{
            expect(setTimeWindow.calledOnce).toEqual(false);
            TimeWindowComponent().instance().handleChange(changeEvent); 
            expect(setTimeWindow.calledOnce).toEqual(true);
        });

        it('should set the new state',()=>{
            let tw = parseInt(5,10);
            TimeWindowComponent().instance().handleChange(changeEvent);
            expect(TimeWindowComponent().state().timeWindow).toBe(tw);
        });
    });

});