import React from 'react';
import DomeAzimuthTimeSeries from './DomeAzimuthTimeSeries';
import renderer from 'react-test-renderer';
import shallowRenderer from 'react-test-renderer/shallow';

/*---- Snapshot testing ----*/
describe('DomeAzimuthTimeSeries_Test', function(){

  it('renders correctly', () => {
    const renderer = new shallowRenderer();
    const tree = renderer.render(

    //ASK: Revisar si los numeros son realistas. 
    <DomeAzimuthTimeSeries domeAzimuth={30}
    domeTargetAzimuth={10}
    domeOptimalAzimuth={40}
    timestamp={"2018-01-04T19:44:10.611Z"}
    width={600} height={350} />
    );
    expect(tree).toMatchSnapshot();
  });
})

