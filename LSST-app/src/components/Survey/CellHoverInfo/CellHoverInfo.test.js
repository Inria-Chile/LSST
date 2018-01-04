import React from 'react';
import renderer from 'react-test-renderer';
import shallowRenderer from 'react-test-renderer/shallow';
import CellHoverInfo from './CellHoverInfo';



/*---- Snapshot test ----*/
describe('CellHoverInfo_Test',function(){
    it('renders correctly with shallowRender',()=> {
        const selectedField = {filtername : 'x'};
        const renderer = new shallowRenderer();
        const tree = renderer.render(
          <CellHoverInfo selectedField={selectedField}/>);
          expect(tree).toMatchSnapshot();
      });
    
      /*
      it('renders correctly without shallowRender', () => {
        const tree = renderer
          .create(<CellHoverInfo/>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });*/
})


/*---- other test ----*/