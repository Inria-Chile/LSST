import React from 'react';
import ColorScaleLegend from './ColorScaleLegend';
import renderer from 'react-test-renderer';
//import shallowRenderer from 'react-test-renderer/shallow';
import * as d3 from 'd3';
describe('ColorScaleLegend_Test',function(){

    it('renders correctly',()=> {
        let colormap1 = d3.scaleSequential((t) => d3.hsl(360, 1.0-t*t*0.1, 0.12+t*t*0.58) + "");
        const tree = renderer
        .create(<ColorScaleLegend  max={10} min={0} 
            width={250/3} height={250} 
            colormapID={"colormap1"} colormap={colormap1}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
    })
})