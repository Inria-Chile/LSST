import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount} from "enzyme"; 
import Survey  from "../Survey";
import sinon from 'sinon';
import SocketMock from 'socket.io-mock'
import moment from 'moment';
import { setTimeout } from 'timers';
Enzyme.configure({ adapter: new Adapter() });


global.fetch = require('jest-fetch-mock');

describe('Survey lifecycle test',function(){
    let res,mountedSurvey,socket,timestamp;

    res = {
        results : []
    }    

   
    const firstElement = {airmass: 1.3828,
        count: 1,
        expDate: 756893245000,
        expTime: 34,
        fieldDec: -40.227999999999994,
        fieldID: 166,
        fieldRA: 91.217,
        filterName: "z",
        lst: 1.0884,
        rotSkyPos: 0.375884,
        seeing: 1.00583,
        skybrightness_modified: 19.4018}
    
    const secondElement = {
        airmass: 1.3828,
        count: 1,
        expDate:  756894245000,
        expTime: 34,
        fieldDec: -40.227999999999996,
        fieldID: 166,
        fieldRA: 91.217,
        filterName: "z",
        lst: 1.0884,
        rotSkyPos: 0.375884,
        seeing: 1.00583,
        skybrightness_modified: 19.4018
    }
    res.results.push(firstElement);
    res.results.push(secondElement);
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
        mountedSurvey = undefined;

        
    });
    describe('componentDidMount test',function(){
        //couldnt test that fetchDataByDate is called because, it is a property and not a method of the component. 
        it('calls componentDidMount',()=>{
            let spy = sinon.spy(Survey.prototype,'componentDidMount');
            expect(spy.calledOnce).toEqual(false);
            const wrapper = surveyComponent();
            expect(spy.calledOnce).toEqual(true);
            spy.reset();
        });
    });

    describe('componentDidUpdate test',function(){
        it('calls componentDidUpdate',()=>{
            let spy = sinon.spy(Survey.prototype,'componentDidUpdate');
            expect(spy.calledOnce).toEqual(false);
            surveyComponent().setState({displayedFilter : 'y'},()=>{
                expect(spy.calledOnce).toBe(true);
                spy.reset();
            });            
        });

        it('calls updateObervationsTable when setState is called',()=>{

        });

        //updateObservationsTable will be tested when cellClickCallback is tested.


    });

    describe('SurveyControls lifecycle',function(){
        describe('ModeSelection sets the mode',function(){
            beforeEach(()=>{
                socket = new SocketMock();
                socket.on('data',timestamp=>{
                    timestamp.expDate = timestamp.request_time;
                    surveyComponent().instance().addObservation(timestamp);
                    surveyComponent().instance().setDate((new Date(parseInt(timestamp.request_time, 10)))); 
                    mountedSurvey = undefined; 
                });
        
                timestamp = {
                    count: 1,
                    expDate: 759422730.3235774,
                    expTime: 34,
                    fieldDec: -1,
                    fieldID: "live153",
                    fieldRA: 13,
                    filterName: "u",
                    request_time: 759422730.3235774,     
                };
                socket.socketClient.emit('data',timestamp);
            });

            it('ModeSelection set live mode after click',()=>{
                expect(surveyComponent().state().selectedMode).toBe('playback');
                let modeSelection = surveyComponent().find('SurveyControls').first().find('ModeSelection').first();
                modeSelection.find('span').at(2).simulate('click');
                expect(surveyComponent().state().selectedMode).toBe('live');
                expect(surveyComponent().state().displayedData).toEqual([]);
            });
    
            it('ModeSelection set live mode after change',()=>{
                let modeSelection = surveyComponent().find('SurveyControls').first().find('ModeSelection').first();
                modeSelection.find('input').first().simulate('change');
                expect(surveyComponent().state().selectedMode).toEqual('live');
                expect(surveyComponent().state().displayedData).toEqual([]);
            });
    
        });
        
        it('TimeWindow set the window time',()=>{
            surveyComponent().setState({ selectedMode : 'live'});
            let timeWindow = surveyComponent().find('SurveyControls').first().find('TimeWindow').first();
            timeWindow.find('input').first().simulate('change',{target : {value : 600}});
            expect(surveyComponent().state().timeWindow).toEqual(600);            
        });

        describe('dateSelection calls setDataByDate',function(){

            it('shouldnt change the initial date if the endDate is not setted',async()=>{                
                let dateSelection = surveyComponent().find('SurveyControls').first().find('DateSelection').first();
                console.log('end date before setState',surveyComponent().state().endDate);
                let datePicker = dateSelection.find('div').at(2);
                datePicker.children().at(0).find('input').simulate('change',{target : {value : moment("1994-03-01")}});
                await new Promise(resolve=> setTimeout(resolve,1));
                console.log('startDate after the promise is resolved',surveyComponent().state().startDate);
                expect(surveyComponent().state().startDate).toEqual(null);
               
            });

            it('should change the initial date when the endDate is setted',async()=>{
                //set startDate
                let dateSelection = surveyComponent().find('SurveyControls').first().find('DateSelection').first();
                console.log('end date before setState',surveyComponent().state().endDate);
                let datePickerStart = dateSelection.find('div').at(2);
                datePickerStart.children().at(0).find('input').simulate('change',{target : {value : moment("1994-03-01")}});
                await new Promise(resolve=> setTimeout(resolve,1));

                //setEndDate
                let datePickerEnd = dateSelection.find('div').at(7);
                datePickerEnd.children().at(0).find('input').simulate('change',{target : {value : moment("1994-03-03")}});
                await new Promise(resolve=> setTimeout(resolve,1));

                expect(surveyComponent().state().startDate).toEqual(5097555);
                expect(surveyComponent().state().endDate).toBe(5270355);
            });
            it('change the end date',async()=>{
                  //we use the Promise to handle that setDataByDate has a fetch request (asynchronous)
                  let dateSelection = surveyComponent().find('SurveyControls').first().find('DateSelection').first();
                  let datePicker = dateSelection.find('div').at(7);
                  datePicker.children().at(0).find('input').simulate('change',{target : {value : moment("1994-03-03")}});
                  await new Promise(resolve=> setTimeout(resolve,1));
                //the simulation of the change of the endDate is done in the beforeEach part.
                expect(surveyComponent().state().endDate).toBe(5270355);
            });

        });

        describe('playerControls calls setDisplayedDateLimits',function(){
            beforeEach(()=>{
                mountedSurvey = undefined; 
                //we call setDataByDate to simulate that we already picked start and end date. 
                for(var i=0;i<res.results.length;++i)
                    res.results[i]['fieldDec'] += 30;
                surveyComponent().instance().setData(res.results);
                surveyComponent().setState({
                    data: res.results,
                    startDate: 756393245000, 
                    endDate: 757393245000
                });
                surveyComponent().instance().setDate(new Date(parseInt(2, 10)));
            });
            
            it('should change state when previous button is pressed',()=>{
                
                let playbackControls = surveyComponent().find('SurveyControls').first().find('PlayerControls').first().find('PlaybackControls');
                let prevButton = playbackControls.find('PrevButton');
                prevButton.simulate('click');    
                let startDate = new Date("1993-12-20T13:14:05.000Z");
                expect(surveyComponent().state().displayedData).toEqual([]);   
                expect(surveyComponent().state().currentDate).toEqual(new Date(startDate.getTime()));       
            });

            it('should change state when next button is pressed',()=>{
                let playbackControls = surveyComponent().find('SurveyControls').first().find('PlayerControls').first().find('PlaybackControls');
                let prevButton = playbackControls.find('NextButton');
                prevButton.simulate('click');    
                let endDate = new Date("1994-01-01T03:00:45.000Z");

                expect(surveyComponent().state().displayedData).toEqual( [{"airmass": 1.3828, "count": 1, "expDate": 756893245000, "expTime": 34, "fieldDec": 19.772000000000006, "fieldID": 166, "fieldRA": 91.217, "filterName": "z", "lst": 1.0884, "rotSkyPos": 0.375884, "seeing": 1.00583, "skybrightness_modified": 19.4018},
                 {"airmass": 1.3828, "count": 1, "expDate": 756894245000, "expTime": 34, "fieldDec": 19.772000000000006, "fieldID": 166, "fieldRA": 91.217, "filterName": "z", "lst": 1.0884, "rotSkyPos": 0.375884, "seeing": 1.00583, "skybrightness_modified": 19.4018}])
                expect(surveyComponent().state().currentDate).toEqual(new Date(endDate.getTime()));
            });
        });

        describe('Settings set properties of the skymap',function(){
            beforeEach(()=>{
                mountedSurvey = undefined; 
            })

            describe('set ecpliptic',function(){
                it('set ecpliptic to false',()=>{
                    let settings = surveyComponent().find('Settings').first();
                    expect(surveyComponent().state().showEcliptic).toEqual(true);
                    settings.find('input').first().simulate('change');
                    expect(surveyComponent().state().showEcliptic).toEqual(false);
                });
    
                it('set ecpliptic to true',()=>{
                    let settings = surveyComponent().find('Settings').first();
                    expect(surveyComponent().state().showEcliptic).toEqual(true);
                    settings.find('input').first().simulate('change');
                    settings.find('input').first().simulate('change');
                    expect(surveyComponent().state().showEcliptic).toEqual(true);
                });
            })
            
            describe('set galactic plane',function(){
                it('set galactic to false',()=>{
                    expect(surveyComponent().state().showGalactic).toEqual(true);
                    let settings = surveyComponent().find('Settings').first();                    
                    settings.find('input').at(1).simulate('change');
                    expect(surveyComponent().state().showGalactic).toEqual(false);
                });
                it('set galactic to true',()=>{
                    expect(surveyComponent().state().showGalactic).toEqual(true);
                    let settings = surveyComponent().find('Settings').first();
                    settings.find('input').at(1).simulate('change');
                    settings.find('input').at(1).simulate('change');
                    expect(surveyComponent().state().showGalactic).toEqual(true);
                });
            });

            describe('set elevation limit',function(){
                it('set elevation limit to false',()=>{
                    expect(surveyComponent().state().showTelescopeRange).toEqual(true);
                    let settings = surveyComponent().find('Settings').first();                    
                    settings.find('input').at(2).simulate('change');
                    expect(surveyComponent().state().showTelescopeRange).toEqual(false);
                });
                it('set elevation limit to true',()=>{
                    expect(surveyComponent().state().showTelescopeRange).toEqual(true);
                    let settings = surveyComponent().find('Settings').first();
                    settings.find('input').at(2).simulate('change');
                    settings.find('input').at(2).simulate('change');
                    expect(surveyComponent().state().showTelescopeRange).toEqual(true);
                });
            });

            describe('set moon input',function(){
                it('set moon input to false',()=>{
                    expect(surveyComponent().state().showMoon).toEqual(true);
                    let settings = surveyComponent().find('Settings').first();                    
                    settings.find('input').at(3).simulate('change');
                    expect(surveyComponent().state().showMoon).toEqual(false);
                });
                it('set moon input to true',()=>{
                    expect(surveyComponent().state().showMoon).toEqual(true);
                    let settings = surveyComponent().find('Settings').first();
                    settings.find('input').at(3).simulate('change');
                    settings.find('input').at(3).simulate('change');
                    expect(surveyComponent().state().showMoon).toEqual(true);
                });
            });
            
        });
    
    });

        //-----------test skymap callbacks here-----------------//


    describe('MiniSkyMap lifecycle',function(){
        beforeEach(()=>{
            mountedSurvey = undefined;
        })
        it('select all filters',()=>{
            let miniSkyMaps = surveyComponent().find('MiniSkymaps').first();
            let all = miniSkyMaps.find('div').at(3);
            all.simulate('click');
            expect(surveyComponent().state().displayedFilter).toEqual('all');   
            expect(surveyComponent().state().showSkyMap).toEqual(true);            
        });

        it('select u filter',()=>{
            let miniSkyMaps = surveyComponent().find('MiniSkymaps').first();
            let ufilter = miniSkyMaps.find('div').at(8);
            expect(surveyComponent().state().displayedFilter).toEqual('all');  
            ufilter.simulate('click');
            expect(surveyComponent().state().displayedFilter).toEqual('u');    
            expect(surveyComponent().state().showSkyMap).toEqual(true);     
        });

        it('select g filter',()=>{
            let miniSkyMaps = surveyComponent().find('MiniSkymaps').first();
            let gfilter = miniSkyMaps.find('div').at(10);
            expect(surveyComponent().state().displayedFilter).toEqual('all');  
            gfilter.simulate('click');
            expect(surveyComponent().state().displayedFilter).toEqual('g');   
            expect(surveyComponent().state().showSkyMap).toEqual(true);   
        });

        describe('it sets the filter and shows the mainSkyMap',function(){
            beforeEach(()=>{
                let miniSkyMaps = surveyComponent().find('MiniSkymaps').first();
                let rfilter = miniSkyMaps.find('.row').at(2).children().at(0);
                expect(surveyComponent().state().displayedFilter).toEqual('all');  
                rfilter.simulate('click');
            });

            it('select r filter',()=>{                
                expect(surveyComponent().state().displayedFilter).toEqual('r');
            });

            it('displays the mainSkymap',()=>{
                expect(surveyComponent().state().showSkyMap).toEqual(true);  
            });

            it('sets mainSkymap style to visible',()=>{
                let visibleStyle = {
                    display:'block'
                };
                expect(surveyComponent().instance().mainSkymapStyle).toEqual(visibleStyle);
            });

            it('sets mainScatterplotStyle to hidden',()=>{
                let hiddenStyle = {
                    visibility: 'hidden',
                    position: 'absolute',
                    width: '100%',
                    top: 0
                };
                expect(surveyComponent().instance().mainScatterplotStyle).toEqual(hiddenStyle);
            });
        });

        
        it('select i filter',()=>{
            let miniSkyMaps = surveyComponent().find('MiniSkymaps').first();
            let ifilter = miniSkyMaps.find('.row').at(2).children().at(1);
            expect(surveyComponent().state().displayedFilter).toEqual('all');  
            ifilter.simulate('click');
            expect(surveyComponent().state().displayedFilter).toEqual('i');
            expect(surveyComponent().state().showSkyMap).toEqual(true); 
        });

        it('select z filter', ()=>{
            let miniSkyMaps = surveyComponent().find('MiniSkymaps').first();
            let zfilter = miniSkyMaps.find('.row').at(3).children().at(0);
            expect(surveyComponent().state().displayedFilter).toEqual('all');  
            zfilter.simulate('click');
            expect(surveyComponent().state().displayedFilter).toEqual('z');
            expect(surveyComponent().state().showSkyMap).toEqual(true); 
        });

        it('select y filter',()=>{
            let miniSkyMaps = surveyComponent().find('MiniSkymaps').first();
            let yfilter = miniSkyMaps.find('.row').at(3).children().at(1);
            expect(surveyComponent().state().displayedFilter).toEqual('all');  
            yfilter.simulate('click');
            expect(surveyComponent().state().displayedFilter).toEqual('y');    
            expect(surveyComponent().state().showSkyMap).toEqual(true); 
        });        
    });


    describe('toggle MainSkymap and Scatterplot',function(){
        let scatterplotContainer;
        let visibleStyle = {
            display:'block'
        };

        let hiddenStyle = {
            visibility: 'hidden',
            position: 'absolute',
            width: '100%',
            top: 0
        };
        beforeEach(()=>{
            scatterplotContainer = surveyComponent().find('.scatterplot-container');
            scatterplotContainer.simulate('click');
        });

        it('shows the Scatterplot',()=>{
            expect(surveyComponent().instance().mainSkymapStyle).toEqual(hiddenStyle);
            expect(surveyComponent().instance().mainScatterplotStyle).toEqual(visibleStyle);
            expect(surveyComponent().state().showSkyMap).toEqual(false);
        });

        it('shows the MainSkymap',()=>{
            scatterplotContainer.simulate('click');
            expect(surveyComponent().instance().mainSkymapStyle).toEqual(visibleStyle);
            expect(surveyComponent().instance().mainScatterplotStyle).toEqual(hiddenStyle);
            expect(surveyComponent().state().showSkyMap).toEqual(true);
        });
    });    
});
