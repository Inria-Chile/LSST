import React from 'react';
import Ticks from './Ticks';
import renderer from 'react-test-renderer';

import * as d3 from 'd3';
describe('ColorScaleLegend_Test',function(){

    it('renders correctly',()=> {
        let colormap1 = d3.scaleSequential((t) => d3.hsl(360, 1.0-t*t*0.1, 0.12+t*t*0.58) + "");
        const tree = renderer
        .create(<Ticks max={10} min={0} 
            height={250} 
            ticksOffset={0} textOffset={20} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
    })
})