import React from 'react';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import PlatformLift from './PlatformLift';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

it('should render the lift motion status', () => {
    const wrapper = shallow(<PlatformLift />).setState({
        motionIndicator: false,
        status: 'STOPPED',
        height: 0,
    });
    expect(wrapper.find('#motion-indicator').text()).toContain(PlatformLift.status.STOPPED); // 3 
});