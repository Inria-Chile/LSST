import React from 'react';
import DateSelection from './DateSelection';
import renderer from 'react-test-renderer';
import Survey from '../../Survey/Survey';



/*---- Snapshot testing ----*/
describe('DateSelection_Test',function(){
    it('renders correctly without shallowRender', () => {
        const tree = renderer
          .create(<DateSelection setDataByDate={Survey.setDataByDate} /> )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
})


/*---- Other tests ----*/