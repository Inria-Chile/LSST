import React from 'react';
import DateSelection from '../DateSelection';
import renderer from 'react-test-renderer';

/*---- Snapshot testing ----*/
describe('DateSelection_Test',function(){
    it('renders correctly without shallowRender', () => {
        const setDataByDate = jest.fn();
        const tree = renderer
          .create(<DateSelection setDataByDate={setDataByDate} /> )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
})

