import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Settings from '../Settings';
import sinon from 'sinon';
Enzyme.configure({ adapter: new Adapter() });

describe('Settings behavior test',()=>{
    let wrapper,setters;
   
    beforeEach(()=>{
        setters = {
            setEcliptic: sinon.spy(),
            setGalactic: sinon.spy(),
            setMoon: sinon.spy(),
            setTelescopeRange: sinon.spy(),
            setProjection: sinon.spy(),
        }
        wrapper = shallow( <Settings {...setters} />)
    });



    //we simulate the change of all checkbox 
    describe('Ecliptic plane input',function(){
        
        it('calls setState',()=>{
            expect(wrapper.state().showEcliptic).toEqual(true);
            wrapper.find('input').first().simulate('change');
            expect(wrapper.state().showEcliptic).toEqual(false);
            setters.setEcliptic.reset();
        });

        it('calls setEcpliptic',()=>{
            expect(setters.setEcliptic.calledOnce).toEqual(false);
            wrapper.find('input').first().simulate('change');
            expect(setters.setEcliptic.calledOnce).toEqual(true);
            setters.setEcliptic.reset();
        });
    });

    describe('Galactic plane input',function(){
        
        it('calls setState',()=>{
            expect(wrapper.state().showEcliptic).toEqual(true);
            wrapper.find('input').at(1).simulate('change');
            expect(wrapper.state().showGalactic).toEqual(false);
            setters.setGalactic.reset();
        });

        it('calls setGalactic',()=>{
            expect(setters.setEcliptic.calledOnce).toEqual(false);
            wrapper.find('input').at(1).simulate('change');
            expect(setters.setGalactic.calledOnce).toEqual(true);
            setters.setGalactic.reset();
        });
    });

    describe('Elevation limit input',function(){
        
        it('calls setState',()=>{
            expect(wrapper.state().showTelescopeRange).toEqual(true);
            wrapper.find('input').at(2).simulate('change');
            expect(wrapper.state().showTelescopeRange).toEqual(false);
            setters.setTelescopeRange.reset();
        });

        it('calls setTelescopeRange',()=>{
            expect(setters.setTelescopeRange.calledOnce).toEqual(false);
            wrapper.find('input').at(2).simulate('change');
            expect(setters.setTelescopeRange.calledOnce).toEqual(true);
            setters.setTelescopeRange.reset();
        });
    });

    describe('Moon input',function(){
        
        it('calls setState',()=>{
            expect(wrapper.state().showMoon).toEqual(true);
            wrapper.find('input').at(3).simulate('change');
            expect(wrapper.state().showMoon).toEqual(false);
            setters.setMoon.reset();
        });

        it('calls setMoon',()=>{
            expect(setters.setMoon.calledOnce).toEqual(false);
            wrapper.find('input').at(3).simulate('change');
            expect(setters.setMoon.calledOnce).toEqual(true);
            setters.setMoon.reset();
        });
    });
    

});