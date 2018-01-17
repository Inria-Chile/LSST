import React from 'react';
import renderer from 'react-test-renderer';
import shallowRenderer from 'react-test-renderer/shallow';
import ObservationsTable from '../ObservationsTable';



/*---- Snapshot test ----*/
describe('ObservationsTable_Test',function(){
    it('renders correctly with shallowRender',()=> {
        const clickedField = ['x','y','z'];
        const renderer = new shallowRenderer();
        const tree = renderer.render(
          <ObservationsTable clickedField = {clickedField} />);
          expect(tree).toMatchSnapshot();
      });
    
      it('renders correctly without clickedField setted',()=> {
        const clickedField = ['x','y','z'];
        const renderer = new shallowRenderer();
        const tree = renderer.render(
          <ObservationsTable clickedField = {null} />);
          expect(tree).toMatchSnapshot();
      });
});