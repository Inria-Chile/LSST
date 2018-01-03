import React from 'react';
import CableWraps from './CableWraps';
import renderer from 'react-test-renderer';
import shallowRenderer from 'react-test-renderer/shallow';


/*---- Snapshot testing ----*/
describe('CableWraps_Test',function(){

    it('renders correctly with shallow',()=>{
        const renderer = new shallowRenderer();
        const tree = renderer.render(<CableWraps/>);
        expect(tree).toMatchSnapshot();
    })


    /*it('renders correctly without shallow', ()=>{
        const tree = renderer
            .create(<CableWraps/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })*/
})



/*---- Other test ----*/
