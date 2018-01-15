//TODO: crear componentes anidadas y hacer que al montar todo se actualize bien. 
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount} from "enzyme"; 
import DomePerspectives from '../DomePerspectives';
import Dome from '../../Dome';
import { DEMO_MODE } from '../../../Utils/Utils';

Enzyme.configure({ adapter: new Adapter() });
var sinon = require('sinon');


describe('DomePerspectives mount test',function(){
    /*set up*/
    let mountedDomePerspectives,random;
    const updateShuttersAperture = jest.fn();

    //mock function for random()
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.5;
    global.Math = mockMath; 


    const domePerspectivesComponent = ()=>{
        if(!mountedDomePerspectives){
          mountedDomePerspectives = mount(
            <DomePerspectives shuttersAperture={0}
            updateShuttersAperture={updateShuttersAperture} />
          );
        }
        return mountedDomePerspectives;
      };


    beforeEach(()=>{
        this.clock = sinon.useFakeTimers();
        mountedDomePerspectives = undefined;
        
    });

    afterEach(()=>{
        this.clock.restore();
    });

    it('should have the right initial state',()=>{
        let perspectivesState = domePerspectivesComponent().state();
        const state = {
            data : [],
            topWindScreenPos : 3.5,
            bottomWindScreenPos : 20,
        };
        expect(perspectivesState).toEqual(state);
    });

    if(DEMO_MODE){
        it('should set the state after mount',()=>{        
            let component = domePerspectivesComponent();
            this.clock.tick(5000);
            const state = {
                data : [],
                topWindScreenPos : 28,
                bottomWindScreenPos : 37,
            };
            expect(component.state()).toEqual(state);
        });
    };



});