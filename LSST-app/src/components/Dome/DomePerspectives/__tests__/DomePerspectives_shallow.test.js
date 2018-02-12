import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from "enzyme"; 
import DomePerspectives from '../DomePerspectives';
import Dome from '../../Dome';


Enzyme.configure({ adapter: new Adapter() });

describe('DomePerspectives renders all nested components',function(){
    let domePerspectives;

  

    /* tests */
    describe('Renders Front',function(){
          /*set up*/
        beforeEach(()=>{
            domePerspectives = shallow( <DomePerspectives shuttersAperture={0}
                                                     updateShuttersAperture={Dome.updateShuttersAperture} />);
        });

        it('should show right text',()=>{
            expect(domePerspectives.find('h5').first().text()).toBe('Front');
        });

        it('should have a nested FrontView component',()=>{
            expect(domePerspectives.find('FrontView').length).toBe(1);
        });

        it('should pass the right props',()=>{
            let prop = {
                width : 500, 
                height : 300, 
                id : "shutters", 
                shuttersAperture : 0, 
                updateShuttersAperture : domePerspectives.instance().updateShuttersAperture, 
                topWindScreenPos : 3.5,
                bottomWindScreenPos : 20, 
                scale : 1.4, 
                xOffset : 0 ,
                yOffset : -0.0,
            };
            expect(domePerspectives.find('FrontView').props()).toEqual(prop);
        });
    });

    describe('Renders Side',function(){
          /*set up*/
        beforeEach(()=>{
            domePerspectives = shallow( <DomePerspectives shuttersAperture={0}
                                                     updateShuttersAperture={Dome.updateShuttersAperture} />);
        });

        it('should show right text',()=>{
            expect(domePerspectives.find('h5').at(1).text()).toBe('Side');
        });

        it('should have a nested SideView component',()=>{
            expect(domePerspectives.find('SideView').length).toBe(1);
        });

        it('should give the right props to the nested component',()=>{
            let prop = {
                width : 500,
                height : 300,
                id : "shutters", 
                shuttersAperture : 0, 
                updateShuttersAperture : domePerspectives.instance().updateShuttersAperture, 
                topWindScreenPos : 3.5, 
                bottomWindScreenPos : 20,
                scale : 1.4,
                xOffset : 0,
                yOffset : -0.0,                   
            }
            expect(domePerspectives.find('SideView').props()).toEqual(prop);
        });
    });
    
    describe('Renders Top',function(){
          /*set up*/
        beforeEach(()=>{
            domePerspectives = shallow( <DomePerspectives shuttersAperture={0}
                                                     updateShuttersAperture={Dome.updateShuttersAperture} />);
        });
        it('should show the right text',()=>{
            expect(domePerspectives.find('h5').at(2).text()).toBe('Top');
        });

        it('should have a nested Louvers component',()=>{
            expect(domePerspectives.find('Louvers').length).toBe(1);
        });

        it('should give the right props',()=>{
            let prop = {
                width : 500,
                height : 500,
                id : "louvers",
                scale : 1.4,
                xOffset : -0.05,
                yOffset : 0.15,
            }
            expect(domePerspectives.find('Louvers').props()).toEqual(prop);
        });
    });

    describe('Should show the right dome perspectives information',()=>{
        it('Shows shutters status',()=>{
            domePerspectives = shallow( <DomePerspectives shuttersAperture={0}
                updateShuttersAperture={Dome.updateShuttersAperture} />);
            let infoDIV = domePerspectives.find('div').at(6).children();//col-4 dome-perspectives-info
            expect(infoDIV.length).toBe(4);
        });
        describe('Should show shutters status',function(){
            it('Should create components with the right className open',()=>{
                domePerspectives = shallow( <DomePerspectives shuttersAperture={30.5}
                    updateShuttersAperture={Dome.updateShuttersAperture} />);
                expect(domePerspectives.find('.status-circle-open').length).toBe(1);    
            });

            it('Should create components with the right className closed',()=>{
                domePerspectives = shallow( <DomePerspectives shuttersAperture={30.5}
                    updateShuttersAperture={Dome.updateShuttersAperture} />);
                expect(domePerspectives.find('.status-circle-open').length).toBe(1);    
            });

            it('Should show shutters status : Open',()=>{          
                domePerspectives = shallow( <DomePerspectives shuttersAperture={30.5}
                updateShuttersAperture={Dome.updateShuttersAperture} />);
                let infoDIV = domePerspectives.find('div').at(6).children();//inside col-4 dome-perspectives-info
                expect(infoDIV.at(0).text()).toBe('Shutters status:  Open');
            });

            it('Should show shutters status : Closed',()=>{
                domePerspectives = shallow( <DomePerspectives shuttersAperture={0}
                    updateShuttersAperture={Dome.updateShuttersAperture} />);
                let infoDIV = domePerspectives.find('div').at(6).children();//inside col-4 dome-perspectives-info
                expect(infoDIV.at(0).text()).toBe('Shutters status:  Closed');
            });
        });

        describe('Should show Aperture',function(){
            
            it('Should show the right aperture message',()=>{
                domePerspectives = shallow( <DomePerspectives shuttersAperture={0}
                    updateShuttersAperture={Dome.updateShuttersAperture} />);
                let infoDIV = domePerspectives.find('div').at(6).children();//inside col-4 dome-perspectives-info
                expect(infoDIV.at(1).text()).toBe('Aperture: 0 m ');
            });
            it('Should show the right aperture message',()=>{
                domePerspectives = shallow( <DomePerspectives shuttersAperture={30.5}
                    updateShuttersAperture={Dome.updateShuttersAperture} />);
                let infoDIV = domePerspectives.find('div').at(6).children();//inside col-4 dome-perspectives-info
                expect(infoDIV.at(1).text()).toBe('Aperture: 30.5 m ');
            });
        });

        describe('Should show Top windscreen position',function(){
            it('Should show the right top windscreen message',()=>{
                domePerspectives = shallow( <DomePerspectives shuttersAperture={0}
                    updateShuttersAperture={Dome.updateShuttersAperture} />);
                let infoDIV = domePerspectives.find('div').at(6).children();//inside col-4 dome-perspectives-info
                expect(infoDIV.at(2).text()).toBe('Top windscreen position: 3.5 ');
            });
            it('Should show the right top windscreen message',()=>{
                domePerspectives = shallow( <DomePerspectives shuttersAperture={30.5}
                    updateShuttersAperture={Dome.updateShuttersAperture} />);
                let infoDIV = domePerspectives.find('div').at(6).children();//inside col-4 dome-perspectives-info
                expect(infoDIV.at(2).text()).toBe('Top windscreen position: 3.5 ');
            });

        });


        describe('Should show Bottom windscreen position',function(){
            it('Should show the right bottom windscreen position message',()=>{
                domePerspectives = shallow( <DomePerspectives shuttersAperture={0}
                    updateShuttersAperture={Dome.updateShuttersAperture} />);
                let infoDIV = domePerspectives.find('div').at(6).children();//inside col-4 dome-perspectives-info
                expect(infoDIV.at(3).text()).toBe('Bottom windscreen position: 20 ');
            });
            it('Should show the right bottom windscreen position message',()=>{
                domePerspectives = shallow( <DomePerspectives shuttersAperture={30.5}
                    updateShuttersAperture={Dome.updateShuttersAperture} />);
                let infoDIV = domePerspectives.find('div').at(6).children();//inside col-4 dome-perspectives-info
                expect(infoDIV.at(3).text()).toBe('Bottom windscreen position: 20 ');
            });
        });
    });
});
