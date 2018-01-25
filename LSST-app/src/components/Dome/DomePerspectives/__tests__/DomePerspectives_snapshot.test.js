import React from 'react';
import DomePerspectives from '../DomePerspectives';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from "enzyme"; 
import toJson from 'enzyme-to-json';
import SocketMock from 'socket.io-mock'
Enzyme.configure({ adapter: new Adapter() });


/*---- Snapshot testing ----*/
describe('DomePerspectives test', function(){
    const shuttersAperture = 10 ;
    const updateShuttersAperture = 10; 

    it('renders with shallow',()=>{
        let tree = shallow(<DomePerspectives shuttersAperture={shuttersAperture}
            updateShuttersAperture={updateShuttersAperture} />);
        expect(toJson(tree)).toMatchSnapshot();
    });
});

