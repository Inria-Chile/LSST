import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount,shallow} from "enzyme"; 
import Dome from '../Dome';


Enzyme.configure({ adapter: new Adapter() });

describe("Renders all the nested components",function(){
    let dome,props,openSocket,on;
  
      /*set up*/
    beforeEach(()=>{
        openSocket = jest.fn();
        let msg = {
            domeAzimuth: 0,
            telescopeElevation: 0,
            domeTargetAzimuth: 0,
            telescopeTargetElevation:0,
            mountAzimuth: 0,
            timestamp: "2018-01-04T19:44:10.611Z",
        }
     
        dome = shallow(<Dome />)
        on = jest.fn();
        on.mockImplementation(dome.setState(     
            {domeAzimuth: msg.DomeAzPos,
            telescopeElevation: msg.DomeElPos,
            domeTargetAzimuth: msg.DomeAzCMD,
            telescopeTargetElevation: msg.DomeElCMD,
            mountAzimuth: msg.DomeAzPos,
            timestamp: msg.timestamp,
        }))
    })
  
    /*tests*/
    it('renders DomePosition component',()=>{
        expect(dome.find('DomePosition').length).toEqual(1);
    })

    it('renders DomePerspectives component',()=>{
        expect(dome.find('DomePerspectives').length).toEqual(1);
    })

    it('renders DomeAzimuthTimeSeries component',()=>{
        expect(dome.find('DomeAzimuthTimeSeries').length).toEqual(1);
    })

    it('renders DomeElevationTimeSeries component',()=>{
        expect(dome.find('DomeElevationTimeSeries').length).toEqual(1);
    })

    it('renders TimeSeriesLegend component',()=>{
        expect(dome.find('TimeSeriesLegend').length).toEqual(1);
    }) 

    

      
})