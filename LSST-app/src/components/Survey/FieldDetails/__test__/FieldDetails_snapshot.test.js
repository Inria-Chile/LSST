import React from 'react';
import FieldDetails from '../FieldDetails';
import renderer from 'react-test-renderer';
import shallowRenderer from 'react-test-renderer/shallow';
import Dashboard2 from '../../../Dashboard/Dashboard2';

describe('Fields details test',function(){
    it('renders correctly with shallowRender',()=>{
        const renderer = new shallowRenderer();
        let fieldData = {
            fieldID: 15, 
            filterName : 'y',
            expDate : "2018-01-04T19:44:10.611Z",
        };
        const tree = renderer.render( 
        <FieldDetails fieldData={[fieldData]}
            setFieldDetailsVisibility={Dashboard2.setFieldDetailsVisibility}
            showFieldDetails={true}/>)
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with shallowRender without fieldData',()=>{
        const renderer = new shallowRenderer();
        let fieldData = {
            fieldId: 15, 
            filterName : 'y',
            expDate : "2018-01-04T19:44:10.611Z",
        };
        const tree = renderer.render( 
        <FieldDetails 
            setFieldDetailsVisibility={Dashboard2.setFieldDetailsVisibility}
            showFieldDetails={true}/>)
        expect(tree).toMatchSnapshot();
    });


});