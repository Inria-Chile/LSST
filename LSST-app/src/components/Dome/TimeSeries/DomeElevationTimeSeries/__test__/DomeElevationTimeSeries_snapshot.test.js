import React from 'react';
import DomeElevationTimeSeries from '../DomeElevationTimeSeries';
import renderer from 'react-test-renderer';
import shallowRenderer from 'react-test-renderer/shallow';

/*---- Snapshot testing ----*/
describe('DomeElevationTimeSeries_Test', function(){
    
    /*mocked date */  
    const mockedDate = new Date("2018-01-04T19:44:10.611Z")
    const originalDate = Date

    global.Date = jest.fn(() => mockedDate)
    global.Date.getTime = originalDate.getTime;

  it('renders correctly', () => {
    const renderer = new shallowRenderer();    
    const tree = renderer.render(    
    <DomeElevationTimeSeries telescopeElevation={0}
    telescopeTargetElevation={0}
    telescopeOptimalElevation={0}
    timestamp={"2018-01-04T19:44:10.611Z"}
    width={600} height={350} />
    );
    expect(tree).toMatchSnapshot();
  });
})


