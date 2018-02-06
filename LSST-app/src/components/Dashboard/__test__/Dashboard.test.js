import React from 'react';
import Dashboard2 from '../Dashboard2';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from "enzyme"; 
import toJson from 'enzyme-to-json';
Enzyme.configure({ adapter: new Adapter() });


describe('Dahshboard test',function(){
    it('renders correctly with shallow renderer',()=>{
        const tree = shallow(<Dashboard2/>);
        expect(toJson(tree)).toMatchSnapshot();
    });

    it('renders FieldDetails when showFieldDetails is setted true',()=>{
        let tree  = shallow(<Dashboard2/>);
        tree.setState({showFieldDetails : true});
        expect(toJson(tree)).toMatchSnapshot();
    });

    it('doesnt render FieldDetails when showFieldDetails is setted false',()=>{
        let tree  = shallow(<Dashboard2/>);
        tree.setState({showFieldDetails : false});
        expect(toJson(tree)).toMatchSnapshot();
    });

});