//actualizar el estado y ver que se llmao a componentDidupdate
//probar con varios estados para que se cumplan los if
//ver que se setee bien el estado al actualizar,
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount} from "enzyme"; 
import PlayerControls  from "../PlayerControls";
import sinon from 'sinon';
import moment from 'moment';
import { lsstEpoch } from '../../../Utils/Utils';
Enzyme.configure({ adapter: new Adapter() });

describe('PlayerControls mount test',function(){
    let mountedPlayerControls,spy;
    let setDisplayedDateLimits = sinon.spy();
    const PlayerControlsComponent = ()=>{
        if(!mountedPlayerControls){
          mountedPlayerControls = mount(
            <PlayerControls startDate={73872874095096 }
             endDate={73872877095096 } 
              setDisplayedDateLimits={setDisplayedDateLimits} />
          );
        }
        return mountedPlayerControls;
      };

    beforeEach(()=>{
        mountedPlayerControls = undefined;
    });
    
      //el componentDidUpdate llama a setIntervar asi que habra que simular que pase el tiempo para ver que se usar animate.
      //en animate hay q ver que se setee el state y que se llame a stropAnimating
      //hay que revisar entonces que se setee el estado denuevo.
    describe('componentDidUpdate work',function(){
        it('calls componentDidUpdate',()=>{
            spy= sinon.spy(PlayerControls.prototype,'componentDidUpdate');
            const wrapper = PlayerControlsComponent();
            expect(spy.calledOnce).toEqual(false);
            wrapper.setState({startDate : 73872874095096 , endDate : 73872874097096});
            expect(spy.calledOnce).toEqual(true);
            spy.restore();
        });

        describe('setInterval is called and work good',function(){
            beforeEach(()=>{
                this.clock = sinon.useFakeTimers();
            });

            afterEach(()=>{
                this.clock.restore();
            });

            it('calls animate',()=>{
                PlayerControlsComponent();
                spy = sinon.spy(PlayerControlsComponent().instance(),'animate');
                expect(spy.calledOnce).toBe(false);
                PlayerControlsComponent().setState({isPlaying : true});
                expect(spy.calledOnce).toBe(false); //time haven't passed yet
                this.clock.tick(400);
                expect(spy.calledOnce).toEqual(true);               
            });

            describe('animate calls setState and stopAnimating',function(){
                beforeEach(()=>{
                    this.clock = sinon.useFakeTimers();
                });
    
                afterEach(()=>{
                    this.clock.restore();
                });
                it('sets currentTime',()=>{
                    PlayerControlsComponent().setState({isPlaying : true});
                    this.clock.tick(400);
                    expect(PlayerControlsComponent().state().currentTime).toEqual(73872877095096);
                });

                it('calls stopAnimating',()=>{
                    PlayerControlsComponent();
                    spy = sinon.spy(PlayerControlsComponent().instance(),'stopAnimating');
                    expect(spy.calledOnce).toBe(false);
                    PlayerControlsComponent().setState({isPlaying : true});
                    expect(spy.calledOnce).toBe(false); //time haven't passed yet
                    this.clock.tick(400);
                    expect(spy.calledOnce).toEqual(true);
                    expect(PlayerControlsComponent().state().isPlaying).toEqual(false);
                });
            });
            describe('animate calls setState and setDisplayedDateLimits',function(){
                beforeEach(()=>{
                    
                    this.clock = sinon.useFakeTimers();
                });
    
                afterEach(()=>{
                    this.clock.reset();
                    setDisplayedDateLimits.reset();
                });

                it('sets currentTime',()=>{
                    PlayerControlsComponent().setState({isPlaying : true, currentTime : 73572874097096});
                    this.clock.tick(400);
                 
                    let newCurrentTime = 73572874097096 + (73872877095096 - 73872874095096 )/100;
                    expect(PlayerControlsComponent().state().currentTime).toEqual(newCurrentTime);
                });

                it('calls setDisplayedLimits',()=>{
                    expect(setDisplayedDateLimits.calledOnce).toEqual(false);
                    PlayerControlsComponent().setState({isPlaying : true, currentTime : 73572874097096});
                    this.clock.tick(400);
                    expect(setDisplayedDateLimits.calledOnce).toEqual(true);
                });
            });

        
        });
        
    });
});