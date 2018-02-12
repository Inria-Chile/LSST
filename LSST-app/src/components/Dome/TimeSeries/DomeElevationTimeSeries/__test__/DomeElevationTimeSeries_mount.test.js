import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount} from "enzyme"; 
import sinon from 'sinon';
import DomeElevationTimeSeries from '../DomeElevationTimeSeries';

Enzyme.configure({ adapter: new Adapter() });

describe('DomeElevationTimeSeries test with mount',function(){
    let mountedDomeElevationTimeSeries;
    const domeElevationTimeSeriesComponent = ()=>{
        if(!mountedDomeElevationTimeSeries){
          mountedDomeElevationTimeSeries = mount(
            <DomeElevationTimeSeries telescopeElevation={0}
            telescopeTargetElevation={0}
            telescopeOptimalElevation={0}
            timestamp={"2018-01-04T19:44:10.611Z"}
            width={600} height={350} />
          );
        }
        return mountedDomeElevationTimeSeries;
      };

      beforeEach(()=>{
        mountedDomeElevationTimeSeries = undefined;
      });

      describe('componentWillRecieveProps should be called after setProps',function(){
          let oldState,newState;
        it('should change the domeTargetElevation prop',()=>{
            domeElevationTimeSeriesComponent();
            domeElevationTimeSeriesComponent().setProps({domeTargetElevation : 60});
            expect(domeElevationTimeSeriesComponent().props().domeTargetElevation).toBe(60);
        });

        it('should have new state after calling setProps',()=>{
            domeElevationTimeSeriesComponent();
            oldState = domeElevationTimeSeriesComponent().state();
            domeElevationTimeSeriesComponent().setProps({domeTargetElevation:70});
            newState = domeElevationTimeSeriesComponent().state();
            let notEquals = newState==oldState;
            expect(notEquals).toEqual(false); //new data should be setted
        });

        it('should have the right new data',()=>{
            domeElevationTimeSeriesComponent().setProps({domeTargetElevation : 30});
            let newData = domeElevationTimeSeriesComponent().state().data;
            let timestamp = "2018-02-04T19:44:10.611Z"*1000;
        
            newData[0].values.push({x: new Date(timestamp), y: 0})
            newData[1].values.push({x: new Date(timestamp), y: 0})
            newData[2].values.push({x: new Date(timestamp), y: 0})
        
            for(let i=0; i<newData.length; ++i){
                if (newData[i].values.length > 350 || newData[i].values[0].y == null)
                    newData[i].values.shift();
            }
            expect(domeElevationTimeSeriesComponent().state().data).toBe(newData);
        });

        it('should call componentWillRecieveProps when setProps is called',()=>{
            const spy = sinon.spy(DomeElevationTimeSeries.prototype,'componentWillReceiveProps');
            const wrapper = domeElevationTimeSeriesComponent();
            expect(spy.calledOnce).toEqual(false);
            wrapper.setProps({domeTargetElevation : 70});
            expect(spy.calledOnce).toEqual(true);
        });
    });

});