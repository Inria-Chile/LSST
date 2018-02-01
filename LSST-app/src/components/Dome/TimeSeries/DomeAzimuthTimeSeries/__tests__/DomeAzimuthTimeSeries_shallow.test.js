import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from "enzyme"; 
import DomeAzimuthTimeSeries from '../DomeAzimuthTimeSeries';
import Dome from '../../../Dome';
import * as d3 from 'd3';

Enzyme.configure({ adapter: new Adapter() });

describe('DomeAzimuthTimeSeries renders all nested components',function(){
    let domeAzimuth;
    //we mock date to make easier 
    const mockedDate = new Date("2018-01-04T19:44:10.611Z");
    const originalDate = Date;
    global.Date = jest.fn(() => mockedDate);
    global.Date.getTime = originalDate.getTime;


    const domeAzimuthShallow = (domeAzimuthVar,domeTargetAzimuthVar,domeOptimalAzimuthVar,timestampVar)=>{
        domeAzimuth =  shallow(<DomeAzimuthTimeSeries domeAzimuth={domeAzimuthVar}
            domeTargetAzimuth={domeTargetAzimuthVar}
            domeOptimalAzimuth={domeOptimalAzimuthVar}
            timestamp={timestampVar}
            width={600} height={350} /> );
        return domeAzimuth;
        };

    describe('Should give the right props to LineChartProps nested component',function(){
        let dome,defaultData,lineDash,limits,LineChartProps,LineColors;
        LineColors = {
            'azimuth': '#ddd', 
            'target': '#5e8ba9', 
            'optimal': '#3e6b89'
        }
        
        defaultData = [...Array(10).keys()].map( (el, i) => {
            return {x:new Date(new Date("2018-02-04T19:44:10.611Z").getTime() - (10-i)*300), y: null};
        });
        lineDash = {
            'azimuth': '0', 
            'target': '0', 
            'optimal': '6'
        }
        limits = [0,0];
        LineChartProps = {
            data : [
                {label: 'target', values: defaultData.slice()},
                {label : 'optimal', values: defaultData.slice()},
                {label: 'azimuth', values: defaultData.slice()},
            ],
            x : x => x.x,
            y : y => y.y,
            width : 600,
            height : 350,
            margin : {top: 10, bottom: 50, left: 50, right: 20},
            xScale: d3.scaleTime().domain([new Date("2018-01-04T19:44:10.611Z"), new Date("2018-01-04T19:44:10.611Z")]).range([0, 600 - 70]),
            yScale: d3.scaleLinear().domain([360, 0]).range([0, 350 - 70]),
            colorScale :(label) => LineColors[label],
            stroke:{strokeWidth: (label) => "3", strokeDasharray: (label) => lineDash[label]},                
            yAxis:{label: 'Angle [deg]', tickArguments: [7], domain:limits},
            xAxis:{label: 'Time', tickPadding:5, tickArguments: [5], tickFormat: (date) => date.toLocaleTimeString()},
        };
        describe('timestamp is null',function(){            
            beforeEach(()=>{                
                dome = domeAzimuthShallow(0,0,0);
                let timestamp = new Date("2018-01-04T19:44:10.611Z");
                let padding = 3;
                LineChartProps.xScale.domain([LineChartProps.data[0].values[0].x, new Date(timestamp)]);
                LineChartProps.yScale.domain([limits[1]+padding, limits[0]-padding]);
            });    

            it('should give the right data prop',()=>{
            
                expect(dome.props().data).toEqual(LineChartProps.data);        
            });
            it('should give the right x prop',()=>{
            
                expect(String(dome.props().x)).toBe(String(LineChartProps.x));        
            });
            it('should give the right y prop',()=>{
            
                expect(String(dome.props().y)).toEqual(String(LineChartProps.y));        
            });        
            it('should give the right width prop',()=>{
            
                expect(dome.props().width).toEqual(LineChartProps.width);        
            });
            it('should give the right height prop',()=>{
            
                expect(dome.props().height).toEqual(LineChartProps.height);        
            });
            it('should give the right margin prop',()=>{
            
                expect(dome.props().margin).toEqual(LineChartProps.margin);        
            });
            it('should give the right xScale prop',()=>{
            
                expect(String(dome.props().xScale)).toEqual(String(LineChartProps.xScale));        
            });
            it('should give the right yScale prop',()=>{
            
                expect(String(dome.props().yScale)).toEqual(String(LineChartProps.yScale));        
            });
            it('should give the right result when we try the colorScale method',()=>{
            
                expect(dome.props().colorScale('azimuth')).toEqual(LineChartProps.colorScale('azimuth'));        
            });
            it('should give the right stroke prop',()=>{
            
                expect(String(dome.props().stroke)).toEqual(String(LineChartProps.stroke));        
            });
            it('should give the right yAxis prop',()=>{
            
                expect(String(dome.props().yAxis)).toEqual(String(LineChartProps.yAxis));        
            });
        });    

        describe('timestamp is not null',function(){
            beforeEach(()=>{                
                dome = domeAzimuthShallow(0,0,0,"2018-02-04T19:44:10.611Z");
                let timestamp =new Date("2018-02-04T19:44:10.611Z") *1000;
                let padding = 3;
                LineChartProps.xScale.domain([LineChartProps.data[0].values[0].x, new Date(timestamp)]);
                LineChartProps.yScale.domain([limits[1]+padding, limits[0]-padding]);
            }); 

            it('should give the right xScale prop',()=>{
            
                expect(String(dome.props().xScale)).toEqual(String(LineChartProps.xScale));        
            });
            it('should give the right yScale prop',()=>{
            
                expect(String(dome.props().yScale)).toEqual(String(LineChartProps.yScale));        
            });
        });
    });        
});