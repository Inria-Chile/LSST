import React from 'react';
import DomeAzimuthTimeSeries from './DomeAzimuthTimeSeries';
import renderer from 'react-test-renderer';
import shallowRenderer from 'react-test-renderer/shallow';

/*---- Snapshot testing ----*/
describe('DomeAzimuthTimeSeries_Test', function(){

  it('renders correctly', () => {
    const renderer = new shallowRenderer();
    const tree = renderer.render(

    <DomeAzimuthTimeSeries domeAzimuth={30}
    domeTargetAzimuth={75}
    domeOptimalAzimuth={40}
    timestamp={new Date()}
    width={600} height={350} />
    );
    expect(tree).toMatchSnapshot();
  });
})

