import React from 'react';
import DomeAzimuthTimeSeries from './DomeAzimuthTimeSeries';
import renderer from 'react-test-renderer';
import shallowRenderer from 'react-test-renderer/shallow';

/*---- Snapshot testing ----*/
describe('DomeAzimuthTimeSeries_Test', function(){

  it('renders correctly', () => {
    const renderer = new shallowRenderer();
    const mockedDate = new Date("2018-01-04T19:44:10.611Z");
    const originalDate = Date;
    global.Date = jest.fn(() => mockedDate);
    global.Date.getTime = originalDate.getTime;

    const tree = renderer.render(
    <DomeAzimuthTimeSeries domeAzimuth={0}
    domeTargetAzimuth={0}
    domeOptimalAzimuth={0}
    timestamp={"2018-01-04T19:44:10.611Z"}
    width={600} height={350} />
    );
    expect(tree).toMatchSnapshot();
  });
})

