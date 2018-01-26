import React from 'react';
import Environment from '../Environment';
import renderer from 'react-test-renderer';
import SocketMock from 'socket.io-mock'


/*----Snapshot testing----*/
describe('environment_Test',function(){
      let message,socket,tree;
      /*set up*/
      beforeEach(()=>{    

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

    })

    it('renders correctly', () => {      
      const tree = renderer
        .create(<Environment temperature = {32}/>)
        .toJSON();
      socket.socketClient.emit('Weather',message);
      expect(tree).toMatchSnapshot();
    });

    it('renders correctly when temperature is not passed', () => {
      const tree = renderer
        .create(<Environment/>)
        .toJSON();
      socket.socketClient.emit('Weather',message);
      expect(tree).toMatchSnapshot();
    });
    
  })