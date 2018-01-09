import React from 'react';
import Environment from '../Environment';
import renderer from 'react-test-renderer';

/*----Snapshot testing----*/
describe('environment_Test',function(){
    it('renders correctly', () => {
      const tree = renderer
        .create(<Environment temperature = {32}/>)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    
  })