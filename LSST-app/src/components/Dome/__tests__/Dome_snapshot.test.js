import React from 'react';
import Dome from '../Dome';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from "enzyme"; 
import toJson from 'enzyme-to-json';
import SocketMock from 'socket.io-mock'
Enzyme.configure({ adapter: new Adapter() });


/*---- Snapshot testing ----*/
describe('Dome test', function(){
    let socket,message,dome;
    beforeEach(()=>{
        dome = shallow(
            <Dome/>);
        let msg = {
            domeAzimuth: 0,
            telescopeElevation: 0,
            domeTargetAzimuth: 0,
            telescopeTargetElevation:0,
            mountAzimuth: 0,
            timestamp: "2018-01-04T19:44:10.611Z",
        }
        socket = new SocketMock();
        socket.on('DomePosition',msg=>{
            dome.setState({
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
    });
    it('renders correctly with shallowRender',()=>{

        expect(toJson(dome)).toMatchSnapshot(); 
    })
})