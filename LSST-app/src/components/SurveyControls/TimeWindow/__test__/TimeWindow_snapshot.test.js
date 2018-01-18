import React from 'react';
import TimeWindow from '../TimeWindow';
import renderer from 'react-test-renderer';

/*---- Snapshot testing ----*/
describe('TimeWindow_Test',function(){

    it('renders correctly without shallowRender', () => {
      let setTimeWindow = jest.fn();
      const tree = renderer
          .create(<TimeWindow setTimeWindow={setTimeWindow} />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
});
