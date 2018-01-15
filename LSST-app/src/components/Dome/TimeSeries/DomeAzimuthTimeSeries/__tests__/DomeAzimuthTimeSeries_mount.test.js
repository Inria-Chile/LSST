import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount} from "enzyme"; 
import sinon from 'sinon';
import DomeAzimuthTimeSeries from '../DomeAzimuthTimeSeries';

Enzyme.configure({ adapter: new Adapter() });
describe('DomeAzimuthTimeSeries test with mount',function(){
    /*set up*/
    let mountedDomeAzimuthTimeSeries,random,spy;

    const domeAzimuthTimeSeriesComponent = ()=>{
        if(!mountedDomeAzimuthTimeSeries){
          mountedDomeAzimuthTimeSeries = mount(
            <DomeAzimuthTimeSeries domeAzimuth={50} 
            domeTargetAzimuth={50}
            domeOptimalAzimuth={50}
            timestamp={"2018-02-04T19:44:10.611Z"}
            width={600} height={350} />
          );
        }
        return mountedDomeAzimuthTimeSeries;
      };


    beforeEach(()=>{       
        mountedDomeAzimuthTimeSeries = undefined; 
      
    });


    describe('componentWillRecieveProps should set a new state',function(){
        let data,comp;
        
        it('should change the domeTargetAzimuth prop',()=>{ 
            domeAzimuthTimeSeriesComponent();    
            domeAzimuthTimeSeriesComponent().setProps({domeTargetAzimuth : 60});           
            expect(domeAzimuthTimeSeriesComponent().props().domeTargetAzimuth).toBe(60);
        });

        it('should have new state after calling setProps',()=>{
            domeAzimuthTimeSeriesComponent();
            data = domeAzimuthTimeSeriesComponent().state();      
            domeAzimuthTimeSeriesComponent().setProps({domeTargetAzimuth : 60});   

            let newData = domeAzimuthTimeSeriesComponent().state();
            let notEquals = newData==data;
            expect(notEquals).toEqual(false);
        });

        it('should have the right new data',()=>{
            domeAzimuthTimeSeriesComponent().setProps({domeTargetAzimuth : 70, domeOptimalAzimuth : 50, domeAzimuth : 10.4});   
            let newData = domeAzimuthTimeSeriesComponent().state().data;
            let timestamp = "2018-02-04T19:44:10.611Z"*1000;
            newData[0].values.push({x: new Date(timestamp), y: domeAzimuthTimeSeriesComponent().props().domeTargetAzimuth})
            newData[1].values.push({x: new Date(timestamp), y: domeAzimuthTimeSeriesComponent().props().domeOptimalAzimuth})
            newData[2].values.push({x: new Date(timestamp), y: domeAzimuthTimeSeriesComponent().props().domeAzimuth})
        
            for(let i=0; i<domeAzimuthTimeSeriesComponent().state().data.length; ++i){
                if (newData[i].values.length > 350 || newData[i].values[0].y == null)
                    newData[i].values.shift();
            }
            expect(domeAzimuthTimeSeriesComponent().state().data).toBe(newData);
        });

        it('should call componentWillReceiveProps',()=>{
            const spy = sinon.spy(DomeAzimuthTimeSeries.prototype,'componentWillReceiveProps');
            const wrapper = domeAzimuthTimeSeriesComponent();
            expect(spy.calledOnce).toEqual(false);
            wrapper.setProps({domeTargetAzimuth : 70});
            expect(spy.calledOnce).toEqual(true);
        });
   });
    
});