import React from 'react';
import M1M3 from './M1M3';
import renderer from 'react-test-renderer';
import shallowRenderer from 'react-test-renderer/shallow';
import * as d3 from 'd3';

global.fetch = require('jest-fetch-mock');
//var shallowRenderer = require('react-test-renderer/shallow');

describe('M1M3_Test',function(){

 /** it('should expose global fetch object', function(){
    expect(fetch).toBeDefined();
  })*/

  /*it('shallows correctly',()=>{
    const renderer = new shallowRenderer();
    let mirrorSize = 250;
    let mirrorMargin = 30;
    let colormap1 = d3.scaleSequential((t) => d3.hsl(360, 1.0-t*t*0.1, 0.12+t*t*0.58) + "");
    let colormap2 = d3.scaleSequential((t) => d3.hsl(270, 0.9+t*t*0.1, 0.7-t*t*0.58) + "");
    let colormap3 = d3.scaleSequential((t) => d3.hsl(140, 0.9+t*t*0.1, 0.7-t*t*0.58) + "");
    
    const tree =renderer.render(
      <M1M3 width={mirrorSize} height={mirrorSize} id="m3" margin={mirrorMargin} colormap={colormap1}/>
    );
    expect(tree).toMatchSnapshot();
  });*/

  it('renders correctly', () => {
    let data = {
      results: [[1,2],[3,4]]
     }

    fetch.mockResponse(data);
    let mirrorSize = 250;
    let mirrorMargin = 30;
    let colormap1 = d3.scaleSequential((t) => d3.hsl(360, 1.0-t*t*0.1, 0.12+t*t*0.58) + "");
    let colormap2 = d3.scaleSequential((t) => d3.hsl(270, 0.9+t*t*0.1, 0.7-t*t*0.58) + "");
    let colormap3 = d3.scaleSequential((t) => d3.hsl(140, 0.9+t*t*0.1, 0.7-t*t*0.58) + "");
    const tree = renderer
      .create(<M1M3 width={mirrorSize} height={mirrorSize} id="m3" margin={mirrorMargin} colormap={colormap1}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})
