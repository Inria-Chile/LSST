import React from 'react';
import TimeWindow from './TimeWindow';
import renderer from 'react-test-renderer';
import Survey from '../../Survey/Survey';



/*---- Snapshot testing ----*/
describe('TimeWindow_Test',function(){


//ASK: Se importo el suvey, esta bien asi? o habria que hacer algun mockup?.

    it('renders correctly without shallowRender', () => {
        const tree = renderer
          .create(<TimeWindow setTimeWindow={Survey.setTimeWindow} />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });


})
/*---- Other tests ----*/