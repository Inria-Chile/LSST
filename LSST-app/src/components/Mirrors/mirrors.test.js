import React from 'react';
import Mirrors from './Mirrors';
import renderer from 'react-test-renderer';
import * as d3 from 'd3';


it('renders correctly', () => {
  const tree = renderer
    .create(<Mirrors/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

