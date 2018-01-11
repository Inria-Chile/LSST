import React from 'react';
import DomePosition from '../DomePosition';
import renderer from 'react-test-renderer';


/*---- Snapshot testing ----*/
describe('DomePosition test', function(){
    const shuttersAperture = 10 ;
    const domeAzimuth = 10;
    const telescopeElevation = 10;
    const mountAzimuth = 10;
    const updateDomePos = 10;
    it('renders correctly',()=>{
        const tree = renderer
            .create(<DomePosition width={330} height={300} id="dome-top" scale={1.4} xOffset={-0.05} yOffset={0.15}
            shuttersAperture={shuttersAperture} domeAzimuth={domeAzimuth}
            telescopeElevation={telescopeElevation} mountAzimuth={mountAzimuth} updateDomePos={updateDomePos}/>) 
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
})

