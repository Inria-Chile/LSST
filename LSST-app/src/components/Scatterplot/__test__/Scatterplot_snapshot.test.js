import React from 'react';
import Scatterplot from '../Scatterplot';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount} from "enzyme"; 
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });


describe('Scatterplot snapshot test',function(){
    let hola;

    it('Renders correctly',()=>{
        let displayedData = [
            {
                airmass: 1.3828,
                count: 1,
                expDate: 955592,
                expTime: 34,
                fieldDec: -40.227999999999994,
                fieldID: 166,
                fieldRA: 91.217,
                filterName: "z",
                lst: 1.0884,
                rotSkyPos: 0.375884,
                seeing: 1.00583,
                skybrightness_modified: 19.4018,
            }
        ]
        let tree = mount(<Scatterplot displayedData = {[]}/>);
        tree.setProps({displayedData : displayedData});
        expect(toJson(tree)).toMatchSnapshot();

    })

})