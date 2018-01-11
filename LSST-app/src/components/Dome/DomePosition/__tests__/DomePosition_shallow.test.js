import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount,shallow} from "enzyme"; 
import DomePosition from '../DomePosition';
import Dome from '../../Dome';


Enzyme.configure({ adapter: new Adapter() });

describe("Renders all nested components",function(){
    let domePosition;

    /*set up*/
    beforeEach(()=>{

        domePosition = shallow(<DomePosition width={330}
            height={300}
            id="dome-top" 
            scale={1.4} xOffset={-0.05} yOffset={0.15}
            shuttersAperture={0}
            domeAzimuth={0}
            telescopeElevation={0} 
            mountAzimuth={0} 
            updateDomePos={Dome.updateDomePos}/>);
    });
    /* tests */
    describe("Renders cardinal points picture",function(){
        
        it('renders cardinal points div ',()=>{
            let picDiv = domePosition.find('.cardinal-points').first();
            expect(picDiv.exists()).toBe(true);
        });

        it('renders the right picture',()=>{
            let pic = domePosition.find('img').first();
            expect(pic.props().src).toBe("/img/Cardinal_directions.png");
        });
    });
    
    //TODO: test <g/> props. 
    describe("Renders svg-container",function(){
        it('renders svg-container',()=>{
            let svgCont = domePosition.find('.svg-container').first();
            expect(svgCont.length).toBe(1);
        });

        describe('Renders dome-angle inside svg-container',function(){
            let domeAngle;
            beforeEach(()=>{
                let svgCont = domePosition.find('.svg-container').first();
                domeAngle = svgCont.find('g').first();
            });
            it('Renders dome-angle inside svg-container',()=>{
                expect(domeAngle.length).toBe(1);
            });

            describe('should have right props in <g/> component',function(){
            //this is like the snapshot testing. 
                it('should have props.transform set',()=>{
                    expect(domeAngle.props().transform).toBe("translate("+330/2+","+300/2+")");
                });

                it('should have props.height set',()=>{
                    expect(domeAngle.props().height).toBe(300);
                });

                it('should have props.width set',()=>{
                    expect(domeAngle.props().width).toBe(330);
                });

                it('should have 1 nested image component',()=>{
                    expect(domeAngle.find('image').length).toBe(1);
                });

                it('should have 2 nested line component',()=>{
                    expect(domeAngle.find('line').length).toBe(2);
                });    
                
                it('should have 1 nested circle component',()=>{
                    expect(domeAngle.find('circle').length).toBe(1);
                });                
            });
        });

        describe('Renders mount-angle inside svg-container',()=>{
            it('Renders mount-angle inside svg-container',()=>{
                let svgCont = domePosition.find('.svg-container').first();
                let mountAngle = svgCont.find('.dome-angle').first();
                expect(mountAngle.length).toBe(1);
            });
        });
    });

    describe("Renders dome-position-info div",function(){
        let infoDiv;
        beforeEach(()=>{
            infoDiv = domePosition.find('.dome-position-info').first();
        })
        it('renders dome-position-info',()=>{
           
            expect(infoDiv.length).toBe(1);
        });

        it("renders 3 div's in dome-position-info",()=>{
            let divs = infoDiv.find('div');
            expect(divs.length).toBe(4); 
        });

        it('should have the right message in the first span',()=>{
            let firstSpan = infoDiv.find('span').first();
            expect(firstSpan.text()).toBe("Dome azimuth: ");    
        });

        it('should have the right message in the second span',()=>{
            let firstSpan = infoDiv.find('span').at(2);
            expect(firstSpan.text()).toBe("Mount azimuth: ");    
        });

        it('should have the right message in the third span',()=>{
            let firstSpan = infoDiv.find('span').at(4);
            expect(firstSpan.text()).toBe("Camera FOV: ");    
        })
    });
});