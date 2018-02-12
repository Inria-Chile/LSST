import React from 'react';
import renderer from 'react-test-renderer';
import shallowRenderer from 'react-test-renderer/shallow';
import CellHoverInfo from '../CellHoverInfo';



/*---- Snapshot test ----*/
describe('CellHoverInfo_Test',function(){
    it('renders correctly with only filtername setted',()=> {
        const selectedField = {
            airmass: 2.49149,
            count: 1,
            expTime: 34,
            fieldDec: -50.2,
            fieldRA: 196.858,
            filterName: "y",
            lst: 1.24181,
            rotSkyPos: 2.30015,
            seeing: 0.98908,
            skybrightness_modified: 17     
        };
        const renderer = new shallowRenderer();
        const tree = renderer.render(
          <CellHoverInfo selectedField={selectedField}/>);
          expect(tree).toMatchSnapshot();
      });

      it('renders correctly with fieldId and expDate setted',()=>{
        const selectedField = {
            airmass: 2.49149,
            count: 1,
            expDate: 2594813,
            expTime: 34,
            fieldDec: -50.2,
            fieldID: 39,
            fieldRA: 196.858,
            filterName: "y",
            lst: 1.24181,
            rotSkyPos: 2.30015,
            seeing: 0.98908,
            skybrightness_modified: 17,  
        };
        const renderer = new shallowRenderer();
        const tree = renderer.render(
            <CellHoverInfo selectedField={selectedField}/>);
        expect(tree).toMatchSnapshot();

      });    
});

