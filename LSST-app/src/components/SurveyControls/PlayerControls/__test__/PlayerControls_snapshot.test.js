import React from 'react';
import PlayerControls from '../PlayerControls';
import renderer from 'react-test-renderer';
import shallowRenderer from 'react-test-renderer/shallow';
import moment from 'moment';


/*---- Snapshot testing ----*/
describe('PlayerControls_Test',function(){
    
  
  it('renders correctly with shallowRender',()=> {
    let setDisplayedDateLimits = jest.fn();
    const renderer = new shallowRenderer();
    const tree = renderer.render(
        <PlayerControls startDate={moment(moment("1994-01-01"))} 
        endDate={moment("1994-01-01")} 
        setDisplayedDateLimits={setDisplayedDateLimits}/>);
      expect(tree).toMatchSnapshot();
  });


})
