import React from 'react';
import TimeSeriesLegend from './TimeSeriesLegend';
import renderer from 'react-test-renderer';
import shallowRenderer from 'react-test-renderer/shallow';

/*---- Snapshot testing ----*/
describe('TimeSeriesLegend_Test', function(){

  it('renders correctly', () => {
    const renderer = new shallowRenderer();
    let legendData = [
        { label: 'Current value', color: '#ddd', lineDash: 0 }, 
        { label: 'Target', color: '#5e8ba9', lineDash: 0 }, 
        { label: 'Optimal', color: '#3e6b89', lineDash: 7 }, 
    ];
    const tree = renderer.render(    
    <TimeSeriesLegend  legendData = {legendData} />
    );
    expect(tree).toMatchSnapshot();
  });
})


