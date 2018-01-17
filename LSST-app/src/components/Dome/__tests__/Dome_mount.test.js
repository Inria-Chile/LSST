import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount,shallow,render} from "enzyme"; 
import Dome from '../Dome';
import SocketMock from 'socket.io-mock'

Enzyme.configure({ adapter: new Adapter() });


/*----Mount test ----*/
describe('Nested component props are good',function(){
    let props,mountedDome,on,log,socket,DomeState;
    let message;
    //function that mount an Environment component or returns the one that has already been mounted.
    const DomeComponent = ()=>{
      if(!mountedDome){
        mountedDome = mount(
          <Dome />
        );
      }
      return mountedDome;
    }
  
    beforeEach(() => {       
        mountedDome = undefined;
        //set the mocked socket.
        socket = new SocketMock();
        socket.on('DomePosition',msg=>{
            DomeComponent().setState({
                domeAzimuth: msg.DomeAzPos,
                telescopeElevation: msg.DomeElPos,
                domeTargetAzimuth: msg.DomeAzCMD,
                telescopeTargetElevation: msg.DomeElCMD,
                mountAzimuth: msg.DomeAzPos,
                timestamp: msg.timestamp,
            })
        });
        message={
            DomeAzPos : 0,
            DomeElPos : 0,
            DomeAzCMD : 0,
            DomeElCMD : 0,
            DomeAzPos : 0,
            timestamp : "2018-01-04T19:44:10.611Z",
        }
        socket.socketClient.emit('DomePosition',message);
        DomeState = DomeComponent().state();  
    });
  

    it('Give right props to DomePosition',()=>{
        let DomePosition = DomeComponent().find('DomePosition').first();
        const prop = {
            width : 330,
            height : 300,
            id : 'dome-top',
            scale : 1.4,
            xOffset : -0.05,
            yOffset : 0.15,
            shuttersAperture : null,
            domeAzimuth : DomeState.domeAzimuth,
            telescopeElevation: DomeState.telescopeElevation,
            mountAzimuth: DomeState.mountAzimuth,
            updateDomePos : DomeComponent().instance().updateDomePos,
            }   
        
        expect(DomePosition.props()).toEqual(prop);
        
    });

    it('Give right props to DomePerspectives',()=>{
        let domePerspetives = DomeComponent().find('DomePerspectives').first();
      
        const prop = {
            shuttersAperture : null,
            updateShuttersAperture : DomeComponent().instance().updateShuttersAperture,
        }
        expect(domePerspetives.props()).toEqual(prop);
    })

    it('Give right props to DomeAzimuthTimeSeries',()=>{
        let domeAzimuthTimeSeries = DomeComponent().find('DomeAzimuthTimeSeries').first();
        const prop = {
            domeAzimuth : message.DomeAzPos,
            domeTargetAzimuth : DomeState.domeTargetAzimuth,
            domeOptimalAzimuth : DomeState.domeOptimalAzimuth,
            timestamp : DomeState.timestamp,
            width : 600,
            height : 350,
        }
        expect(domeAzimuthTimeSeries.props()).toEqual(prop);

    })

    it('Give right props to DomeElevationTimeSeries',()=>{
        let DomeAzimuthTimeSeries = DomeComponent().find('DomeElevationTimeSeries').first();

        const prop = {
            telescopeElevation : DomeState.telescopeElevation,
            telescopeTargetElevation : DomeState.telescopeTargetElevation,
            telescopeOptimalElevation : DomeState.telescopeOptimalElevation,
            timestamp : DomeState.timestamp,
            width : 600,
            height : 350,
        }

        expect(DomeAzimuthTimeSeries.props()).toEqual(prop);
    })
    
    it('Give right props to TimeSeriesLegend',()=>{
        let timeSeriesLegend = DomeComponent().find('TimeSeriesLegend').first();

        const prop = {
            legendData : [
                { label: 'Current value', color: '#ddd', lineDash: 0 }, 
                { label: 'Target', color: '#5e8ba9', lineDash: 0 }, 
                { label: 'Optimal', color: '#3e6b89', lineDash: 7 }, 
            ]
        }

        expect(timeSeriesLegend.props()).toEqual(prop);
    });


});