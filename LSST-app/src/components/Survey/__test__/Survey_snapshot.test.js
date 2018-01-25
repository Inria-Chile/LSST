import React from 'react';
import Survey from '../Survey';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
global.fetch = require('jest-fetch-mock');

describe('Survey snapshot test',function(){
    let res = {
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

    it('renders correctly',()=>{
        const tree = shallow(<Survey/>);
        expect(toJson(tree)).toMatchSnapshot();
        console.log(tree.state().hoveredField);
    });

    it('shows cellHoverInfo when a field in the skymap is selected',()=>{
        const selectedField = {
            airmass: 2.49149,
            count: 1,
            expDate: 2594813,
            expTime: 34,
            fieldDec: -50.2,
            fieldID: 39,
            fieldRA: 196.858,
            filterName: "y",
            lst: 1.24181,
            rotSkyPos: 2.30015,
            seeing: 0.98908,
            skybrightness_modified: 17,  
        };
        const tree = shallow(<Survey/>);
        tree.setState({hoveredField :selectedField})
        expect(toJson(tree)).toMatchSnapshot();      
    });

    it('shows scatterplot instead of mainskymap when scatterplot container is clicked',()=>{  
        const tree = shallow(<Survey/>);
        let scatterplotContainer = tree.find('.scatterplot-container');
        scatterplotContainer.simulate('click');
        expect(toJson(tree)).toMatchSnapshot();    
    });

    it('shows mainskymap when scatterplot container is clicked',()=>{
        const tree = shallow(<Survey/>);
        let scatterplotContainer = tree.find('.scatterplot-container');
        scatterplotContainer.simulate('click');
        scatterplotContainer.simulate('click');
        expect(toJson(tree)).toMatchSnapshot();    
    });


});