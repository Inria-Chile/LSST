import React from 'react';
import Survey from '../Survey';
import renderer from 'react-test-renderer';
import shallowRenderer from 'react-test-renderer/shallow';

describe('Survey snapshot test',function(){
    it('renders correctly',()=>{
        const renderer = new shallowRenderer();
        const tree = renderer.render(<Survey/>);
        expect(tree).toMatchSnapshot();
    });
});