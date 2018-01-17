import React from 'react';
import renderer from 'react-test-renderer';
import shallowRenderer from 'react-test-renderer/shallow';
import CellHoverInfo from '../CellHoverInfo';



/*---- Snapshot test ----*/
describe('CellHoverInfo_Test',function(){
    it('renders correctly with filtername setted',()=> {
        const selectedField = {filterName : 'x'};
        const renderer = new shallowRenderer();
        const tree = renderer.render(
          <CellHoverInfo selectedField={selectedField}/>);
          expect(tree).toMatchSnapshot();
      });

      it('renders correctly with fieldId and expDate setted',()=>{
        const selectedField = {
            filterName : 'x',
            fieldID : 10,
            expDate : "2018-01-04T19:44:10.611Z",
        };
        const renderer = new shallowRenderer();
        const tree = renderer.render(
            <CellHoverInfo selectedField={selectedField}/>);
        expect(tree).toMatchSnapshot();

      });    
});

