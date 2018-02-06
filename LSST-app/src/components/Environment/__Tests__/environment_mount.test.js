import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount,shallow} from "enzyme"; 
import Environment from '../Environment';
import SocketMock from 'socket.io-mock'
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });


/*----Mount test ----*/
 
describe('when temperature is set',function(){
    let props,socket,message;
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

      socket = new SocketMock();
      socket.on('Weather',msg=>{
          console.log('recieveEnvironmentData',msg);
      });
      message={
          DomeAzPos : 0,
          DomeElPos : 0,
          DomeAzCMD : 0,
          DomeElCMD : 0,
          DomeAzPos : 0,
          timestamp : "2018-01-04T19:44:10.611Z",
      }

      
      props = {
        temperature: undefined,
  
      };
      mountedEnvironment = undefined;
    });

    it('calls componentDidMount',()=>{
      let spy = sinon.spy(Environment.prototype,'componentDidMount');
      expect(spy.calledOnce).toEqual(false);
      environmentComponent();
      expect(spy.calledOnce);
      spy.restore();
    });

    //maybe this will change when the real conection is done. 
    it('sets the right initial state',()=>{ 
      let state = {
        temperature: 32,
        humidity: 57,
        pressure: 770,
        dewPoint: 1,
        precipitation: 1,
        temperatureArray: [],
        humidityArray: [],
        pressureArray: [],
        dewPointArray: [],
        precipitationArray: [],
      };
      expect(environmentComponent().state()).toEqual(state);
    });

    describe('receive new props and set the state right',function(){

      it('set the component state with the new props',()=>{
        environmentComponent().setState({
          temperature : 40,
          humidity : 60,
          pressure : 800,
          precipitation: 1,
          dewPoint: 1,
          temperatureArray : [40],
          humidityArray : [60],
          pressureArray : [800], 
          precipitationArray: [],
          dewPointArray: [],
        });

        let state = {
          temperature : 40,
          humidity : 60,
          pressure : 800,
          precipitation: 1,
          dewPoint: 1,
          temperatureArray : [40],
          humidityArray : [60],
          pressureArray : [800],
          precipitationArray: [],
          dewPointArray: [],
        }
        expect(environmentComponent().state()).toEqual(state);
      });
    });
  });
  