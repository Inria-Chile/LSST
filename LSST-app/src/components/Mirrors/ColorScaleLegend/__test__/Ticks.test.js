import React from 'react';
import Ticks from '../Ticks';
import renderer from 'react-test-renderer';

describe('Ticks_Test',function(){

    it('renders correctly',()=> {
        const tree = renderer
        .create(<Ticks max={10} min={0} 
            height={250} 
            ticksOffset={0} textOffset={20} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
    })
})