import React from 'react';
import moment from 'moment';
import SurveyControls from './SurveyControls';
import renderer from 'react-test-renderer';
import shallowRenderer from 'react-test-renderer/shallow';
import Survey from '../Survey/Survey';

/*----Snapshot testing ----*/
describe('SurveyControls_Test',function(){
    it('renders correctly whith shallowRender live mode',()=>{
        const renderer = new shallowRenderer();
        const tree = renderer.render(
            <SurveyControls setPlaybackMode={Survey.setPlaybackMode} 
            setLiveMode={Survey.setLiveMode} 
            setDataByDate={Survey.setDataByDate}
            selectedMode={'live'}
            startDate={moment("1994-01-01")} 
            endDate={moment("1994-01-01")}
            setTimeWindow={Survey.setTimeWindow}
            setDisplayedDateLimits={Survey.setDisplayedDateLimits}/>);

        expect(tree).toMatchSnapshot();
    });

    it('renders correctly whith shallowRender playback mode',()=>{
        const renderer = new shallowRenderer();
        const tree = renderer.render(
            <SurveyControls setPlaybackMode={Survey.setPlaybackMode} 
            setLiveMode={Survey.setLiveMode} 
            setDataByDate={Survey.setDataByDate}
            selectedMode={'playback'}
            startDate={moment("1994-01-01")} 
            endDate={moment("1994-01-01")}
            setTimeWindow={Survey.setTimeWindow}
            setDisplayedDateLimits={Survey.setDisplayedDateLimits}/>);

        expect(tree).toMatchSnapshot();
    });

})


/*---- other test ----*/