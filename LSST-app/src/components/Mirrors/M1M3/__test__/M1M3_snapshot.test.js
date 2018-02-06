import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import M1M3 from '../M1M3';
import renderer from 'react-test-renderer';
import * as d3 from 'd3';
import {mount} from "enzyme"; 
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
Enzyme.configure({ adapter: new Adapter() });

global.fetch = require('jest-fetch-mock');

/*---- Snapshot testing ----*/
describe('M1M3_Test',function(){
  let spy;
  /*----set up---- */
  beforeEach(()=>{
    fetch.resetMocks();
    const data = {
      results : []
     }
  
    const primero = {
      position : [3,4]
    }
  
    const segundo = {
      position : [5,6]
    }
  
    data.results.push(primero);
    data.results.push(segundo);
    fetch.mockResponse(JSON.stringify(data));
  
  })


  
  it('renders correctly', () => {
    
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

});
