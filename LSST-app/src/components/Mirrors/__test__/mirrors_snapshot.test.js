import React from 'react';
import Mirrors from '../Mirrors';
import renderer from 'react-test-renderer';
import shallowRenderer from 'react-test-renderer/shallow';
import * as d3 from 'd3';


global.fetch = require('jest-fetch-mock');

/*---- Snapshot testing ----*/
describe('Mirrors test', function(){
  /*----set up---- */
  const data = {
    results : []
   }

  const primero = {
    position : [3,4]
  }

  const segundo = {
    position : [5,6]
  }

  data.results.concat(primero);
  data.results.concat(segundo);
  fetch.mockResponse(JSON.stringify(data));
  
  
  it('renders correctly with shallowRender',()=> {
    
    const renderer = new shallowRenderer();
    const tree = renderer.render(
      <Mirrors/>);
      expect(tree).toMatchSnapshot();
  });

  it('renders correctly without shallowRender', () => {
    const tree = renderer
      .create(<Mirrors/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})
