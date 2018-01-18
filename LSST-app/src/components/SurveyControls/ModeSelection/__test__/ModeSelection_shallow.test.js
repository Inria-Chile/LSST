import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import ModeSelection from '../ModeSelection';
import sinon from 'sinon';
Enzyme.configure({ adapter: new Adapter() });

describe('Model selection behavior test',function(){
    describe('Should highlight the right mode',function(){
        //payback mode active esta highlight al setear el estado
        it('should highlight playback span',()=>{
            let setPlaybackMode = jest.fn();
            let setLiveMode = jest.fn();
            let wrapper = shallow( <ModeSelection selectedMode={'playback'}
                setPlaybackMode={setPlaybackMode}
                setLiveMode={setLiveMode} />);
            expect(wrapper.find('.highlight-text').first().text()).toBe('Playback');
        });

        //live mode esta highlight al setear el estado. 
        it('should highlight live span',()=>{
            let setPlaybackMode = jest.fn();
            let setLiveMode = jest.fn();
            let wrapper = shallow( <ModeSelection selectedMode={'live'}
                setPlaybackMode={setPlaybackMode}
                setLiveMode={setLiveMode} />);
            expect(wrapper.find('.highlight-text').first().text()).toBe('Live');
        });

    });

    describe('Button pressed',function(){
        let setPlaybackMode,setLiveMode,wrapper;
        beforeEach(()=>{            
            setPlaybackMode = sinon.spy();
            setLiveMode = sinon.spy();
            wrapper = shallow( <ModeSelection selectedMode={'live'}
                setPlaybackMode={setPlaybackMode}
                setLiveMode={setLiveMode} />);            
        });

        describe('Set playback state when button is pressed',function(){
            beforeEach(()=>{
                wrapper.find('span').first().simulate('click');
            });
            it('set playbackModeActive state right',()=>{                
                expect(wrapper.state().playbackModeActive).toBe(true);
            });
            it('should highlight the playback span',()=>{
                expect(wrapper.find('.highlight-text').first().text()).toBe('Playback');   
            });


    
        });
        
        describe('Set live state when button is pressed',function(){
            beforeEach(()=>{
                wrapper.find('span').at(2).simulate('click');               
            });

            it('set playbackModeActive state right',()=>{
             expect(wrapper.state().playbackModeActive).toBe(false);
               
            });
            it('should highlight the playback span',()=>{
                expect(wrapper.find('.highlight-text').first().text()).toBe('Live');
            });

            it('should should call setLiveMode',()=>{
                expect(setLiveMode.calledOnce).toBe(true);
            });
            
        });
        
    });

    describe('switch class change',function(){
        let onButtonClick,setPlaybackMode,setLiveMode,wrapper;
        beforeEach(()=>{
            setPlaybackMode = sinon.spy();
            setLiveMode = sinon.spy();
            wrapper = shallow( <ModeSelection selectedMode={'live'}
                setPlaybackMode={setPlaybackMode}
                setLiveMode={setLiveMode} />);
            
        });

        describe('checkbox change to playbackMode onChange',function(){
            beforeEach(()=>{
                wrapper.find('input').first().simulate('change'); 
            });

            it('set playbackModeActive right',()=>{
                expect(wrapper.state().playbackModeActive).toBe(true);
            });

            it('should highlight the right span',()=>{
                expect(wrapper.find('.highlight-text').first().text()).toBe('Playback');
            });
            it('should call setPlaybackMode',()=>{
                expect(setPlaybackMode.calledOnce).toBe(true);
            });

    
        });
        
        describe('checkbox change to liveMode onChange twice',function(){
            beforeEach(()=>{
                wrapper.find('input').first().simulate('change');
                wrapper.find('input').first().simulate('change');
                
            });

            it('should set playbackModeActive mode right',()=>{
                expect(wrapper.state().playbackModeActive).toBe(false);
            });
            
            it('should highlight the right span',()=>{
                expect(wrapper.find('.highlight-text').first().text()).toBe('Live');
            });

            it('should call setPlaybackMode and setLiveMode once',()=>{
                expect(setLiveMode.calledOnce).toBe(true);
                expect(setPlaybackMode.calledOnce).toBe(true);
            });
        });


                it('change to the right state after click and change',()=>{
            wrapper.find('span').first().simulate('click');
            wrapper.find('input').first().simulate('change');
            expect(wrapper.state().playbackModeActive).toBe(false);
            expect(wrapper.find('.highlight-text').first().text()).toBe('Live');
        });
    });
});