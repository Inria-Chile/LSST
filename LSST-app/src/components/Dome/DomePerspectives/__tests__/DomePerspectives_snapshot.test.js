import React from 'react';
import DomePerspectives from '../DomePerspectives';
import renderer from 'react-test-renderer';
import shallowRenderer from 'react-test-renderer/shallow';


/*---- Snapshot testing ----*/
describe('DomePerspectives test', function(){
    const shuttersAperture = 10 ;
    const updateShuttersAperture = 10; 

    it('renders correctly  without shallow',()=>{
        const tree = renderer
            .create(<DomePerspectives shuttersAperture={shuttersAperture} 
                updateShuttersAperture={updateShuttersAperture} />) 
            .toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('renders correctly with shallow', ()=>{
        const renderer = new shallowRenderer();
        const tree = renderer.render(<DomePerspectives shuttersAperture={shuttersAperture}
             updateShuttersAperture={updateShuttersAperture} />);
        expect(tree).toMatchSnapshot();

    })
})

