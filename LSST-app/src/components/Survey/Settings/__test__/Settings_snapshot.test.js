import React from 'react';
import Settings from '../Settings';
import renderer from 'react-test-renderer';
import shallowRenderer from 'react-test-renderer/shallow';


describe('Settings snapshot test',function(){

    it('renders correctly with shallowRender',()=>{
        let setters = {
            setEcliptic: jest.fn(),
            setGalactic: jest.fn(),
            setMoon: jest.fn(),
            setTelescopeRange: jest.fn(),
            setProjection: jest.fn(),
        }
        const renderer = new shallowRenderer();
        const tree = renderer.render(
            <Settings {...setters} />
        );
        expect(tree).toMatchSnapshot();
    });
});
