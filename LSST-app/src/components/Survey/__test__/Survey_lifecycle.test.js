import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount} from "enzyme"; 
import Survey  from "../Survey";
import sinon from 'sinon';
import SocketMock from 'socket.io-mock'
import moment from 'moment';
Enzyme.configure({ adapter: new Adapter() });


global.fetch = require('jest-fetch-mock');

describe('Survey lifecycle test',function(){
    let res,mountedSurvey,socket,timestamp;

    res = {
        results : []
    }    
    //const primero = [{expDate :"1995-12-20T13:14:05.000Z"} ,4,5]
    //const segundo = [{expDate : "1993-11-20T13:14:05.000Z"},6,7]
    const primero = {expDate : 756893245000};
    const segundo = {expDate : 756894245000}
    res.results.push(primero);
    res.results.push(segundo);
    fetch.mockResponse(JSON.stringify(res));

    const surveyComponent = ()=>{      
        if(!mountedSurvey){
          mountedSurvey = mount(
            <Survey setFieldDetailsVisibility={jest.fn()} 
            showFieldDetails={true}
            setSelectedFieldData={jest.fn()} />   
          );
        }
        return mountedSurvey;
    };
    
    beforeEach(()=>{
        
        socket = new SocketMock();
        socket.on('data',timestamp=>{
          timestamp.expDate = timestamp.request_time;
          surveyComponent().instance().addObservation(timestamp);
          surveyComponent().instance().setDate((new Date(parseInt(timestamp.request_time, 10))));  
          mountedSurvey = undefined;
        });

        timestamp = {
            expDate : new Date("2018-01-04T19:44:10.611Z"),
            request_time : new Date("2018-03-04T19:44:10.611Z"),
        };
        socket.socketClient.emit('data',timestamp);
        
    });
    describe('componentDidMount test',function(){
        it('calls componentDidMount',()=>{
            let spy = sinon.spy(Survey.prototype,'componentDidMount');
            expect(spy.calledOnce).toEqual(false);
            const wrapper = surveyComponent();
            expect(spy.calledOnce).toEqual(true);
            spy.reset();
        });


        //TODO: buscar la forma de espiar en metodos que son variables!!!!
       /* it('calls fetchDataByDate',()=>{
            const spy = sinon.spy(surveyComponent().instance(),'fetchDataByDate');
            expect(spy.calledOnce).toEqual(false);
            surveyComponent().update();
            expect(spy.calledOnce).toEqual(true);
            spy.restore();
        });*/
    });

    describe('componentDidUpdate test',function(){
        it('calls componentDidUpdate',()=>{
            let spy = sinon.spy(Survey.prototype,'componentDidUpdate');
            expect(spy.calledOnce).toEqual(false);
            surveyComponent().setState({displayedFiler : 'y'});
            expect(spy.calledOnce).toBe(true);
            spy.reset();
        });

        it('calls updateObervationsTable when setState is called',()=>{

        });

        //updateObservationsTable will be tested when cellClickCallback is tested.


    });

    describe('SurveyControls lifecycle',function(){
        it('consoleLOG',()=>{
            console.log('selectedMmode',surveyComponent().state().selectedMode);
        })

        it('ModeSelection set live mode after click',()=>{
            expect(surveyComponent().state().selectedMode).toBe('playback');
            let modeSelection = surveyComponent().find('SurveyControls').first().find('ModeSelection').first();
            modeSelection.find('span').at(2).simulate('click');
            expect(surveyComponent().state().selectedMode).toBe('live');
        });

        it('ModeSelection set live mode after change',()=>{
            let modeSelection = surveyComponent().find('SurveyControls').first().find('ModeSelection').first();
            modeSelection.find('input').first().simulate('change');
            expect(surveyComponent().state().selectedMode).toEqual('live');
        });

        it('TimeWindow set the window time',()=>{
            surveyComponent().setState({ selectedMode : 'live'});
            let timeWindow = surveyComponent().find('SurveyControls').first().find('TimeWindow').first();
            timeWindow.find('input').first().simulate('change',{target : {value : 5}});
            expect(surveyComponent().state().timeWindow).toEqual(5);            
        });

        describe('dateSelection calls setDataByDate',function(){
            //TODO: lograr simular el cambio de la fecha!!!!
            /*it('change the initial date',()=>{
                console.log('date before',surveyComponent().state().startDate);
                console.log('nodes',surveyComponent().find('SurveyControls').first().find('DateSelection').first().find('div').first().props())
                let dateSelection = surveyComponent().find('SurveyControls').first().find('DateSelection');
                let datePicker = dateSelection.find('div');
                datePicker.simulate('click',{target : {value : moment()}});
                console.log('date after',surveyComponent().state().startDate);
            });*/

            it('change the end date',()=>{
                //TODO: lograr simular el cambio de la fecha!!!
            });

        });

        describe('playerControls calls setDisplayedDateLimits',function(){
            beforeEach(()=>{
                //we call setDataByDate to simulate that we already picked start and end date. 
                console.log('displayedData before',surveyComponent().state().displayedData);
                for(var i=0;i<res.results.length;++i)
                    console.log('estoy en el for de la funcion del fetch');    
                //res.results[i]['fieldDec'] += 30;
                surveyComponent().instance().setData(res.results);
                surveyComponent().setState({
                    data: res.results,
                    startDate: 756393245000, 
                    endDate: 757393245000
                });
                console.log('it already fetched');
                surveyComponent().instance().setDate(new Date(parseInt(2, 10)));

            });
            
            it('should change state when previous button is pressed',()=>{
                
                let playbackControls = surveyComponent().find('SurveyControls').first().find('PlayerControls').first().find('PlaybackControls');
                let prevButton = playbackControls.find('PrevButton');
                console.log('PlayBackControls',surveyComponent().state().data);
                prevButton.simulate('click');    
                expect(surveyComponent().state().displayedData).toEqual([]);          
            });

            it('should change state when next button is pressed',()=>{
                let playbackControls = surveyComponent().find('SurveyControls').first().find('PlayerControls').first().find('PlaybackControls');
                let prevButton = playbackControls.find('NextButton');
                console.log('PlayBackControls',surveyComponent().state().data);
                prevButton.simulate('click');    
                console.log('displayedData after',surveyComponent().state().displayedData)    
                expect(surveyComponent().state().displayedData).toEqual([{expDate: 756893245000}, {expDate: 756894245000 }])
            
            });
        });

    });
    //TODO: component did update
    //TODO: probar los botones de a uno, segun los setters que hayan en cada componente anidada.
   
});
