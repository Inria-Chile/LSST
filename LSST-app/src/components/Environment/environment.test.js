import React from 'react';
import Environment from './Environment';
import renderer from 'react-test-renderer';


it('renders correctly', () => {
  const tree = renderer
    .create(<Environment />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

