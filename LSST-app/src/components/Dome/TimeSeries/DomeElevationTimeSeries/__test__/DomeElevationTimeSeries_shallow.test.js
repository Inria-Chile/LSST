import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from "enzyme"; 
import DomeElevationTimeSeries from '../DomeElevationTimeSeries';
import Dome from '../../../Dome';
import * as d3 from 'd3';


Enzyme.configure({ adapter: new Adapter() });

describe('DomeElevationTimeSeries renders all nested components',function(){
    let domeElevation;
    //We mock Date 
    const mockedDate = new Date("2018-01-04T19:44:10.611Z");
    const originalDate = Date;
    global.Date = jest.fn(() => mockedDate);
    global.Date.getTime = originalDate.getTime;

    /**
     * When you do domeElevationShallow.props() it returns the props given to the LineChart nested component.
     */
    const domeElevationShallow = ()=>{
        domeElevation =  shallow( <DomeElevationTimeSeries telescopeElevation={0}
            telescopeTargetElevation={0}
            telescopeOptimalElevation={0}
            timestamp={"2018-01-04T19:44:10.611Z"}
            width={600} height={350} />);
        return domeElevation;
    };

    describe('Should give the right props to the Linechart nested component',function(){
        let LineColors = {
            'elevation': '#ddd', 
            'target': '#5e8ba9', 
            'optimal': '#3e6b89'
        }
        
        let limits = [0,0];
        let data = domeElevationShallow().state().data;
        let x = x=>x.x;
        let y = y=>y.y;
        let width = 600;
        let height = 350;
        let margin = {top: 10, bottom: 50, left: 50, right: 20};
        let xScale = d3.scaleTime().domain([new Date("2018-01-04T19:44:10.611Z"), new Date("2018-01-04T19:44:10.611Z")]).range([0, 600 - 70]);
        let yScale = d3.scaleLinear().domain([90, 0]).range([0, 350 - 70]);
        let lineDash = {
            'elevation': '0', 
            'target': '0', 
            'optimal': '6'
        };
        let stroke = {strokeWidth: (label) => "3", strokeDasharray: (label) => lineDash[label]};
        let yAxis={label: 'Angle [deg]', tickArguments: [7], domain:limits};
        let xAxis={label: 'Time', tickPadding:5, tickArguments: [5], tickFormat: (date) => date.toLocaleTimeString()};
        
        it('give the right data to LineChart nested component',()=>{
            expect(domeElevationShallow().props().data).toEqual(data);
        });

        it('give the right x to LineChart nested component',()=>{
            expect(String(domeElevationShallow().props().x)).toEqual(String(x));
        });
        
        it('give the right y to LineChart nested component',()=>{
            expect(String(domeElevationShallow().props().y)).toEqual(String(y));
        });

        it('give the right width to LineChart nested component',()=>{
            expect(domeElevationShallow().props().width).toEqual(width);
        });

        it('give the right height to LineChart nested component',()=>{
            expect(domeElevationShallow().props().height).toEqual(height);
        });

        it('give the right margin to LineChart nested component',()=>{
            expect(domeElevationShallow().props().margin).toEqual(margin);
        });

        it('give the right xScale to LineChart nested component',()=>{
            expect(String(domeElevationShallow().props().xScale)).toEqual(String(xScale));
        });

        it('give the right colorScale to LineChart nested component',()=>{
            expect(domeElevationShallow().props().colorScale(0)).toEqual(LineColors[0]);
        });

        it('give the right stroke to LineChart nested component',()=>{
            expect(String(domeElevationShallow().props().stroke)).toEqual(String(stroke));
        });

        it('give the right yAxis to LineChart nested component',()=>{
            expect(domeElevationShallow().props().yAxis).toEqual(yAxis);
        });

        it('give the right xAxis to LineChart nested component',()=>{
            expect(String(domeElevationShallow().props().xAxis)).toEqual(String(xAxis));
        });
        











        
        

    });

});
