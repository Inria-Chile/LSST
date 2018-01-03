import React from 'react';
import Dome from './Dome';
import renderer from 'react-test-renderer';
import shallowRenderer from 'react-test-renderer/shallow';



/**
 * Test funciona pero muestra el log en la consola. 
 */


/*---- Snapshot testing ----*/
describe('Dome test', function(){

    it('renders correctly with shallowRender',()=>{
        const renderer = new shallowRenderer();
        const tree = renderer.render(
            <Dome/>);
            expect(tree).toMatchSnapshot(); 
    })
})