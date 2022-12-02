import React from 'react';
import renderer from 'react-test-renderer';
import FilterBadge from './FilterBadge';

describe('FilterBadge', () => {
  it('renders a white badge with text', () => {
    expect(renderer.create(
      <FilterBadge text="Sheriff's Badge" />,
    ).toJSON()).toMatchSnapshot();
  });

  it('renders a blue (background) badge', () => {
    expect(renderer.create(
      <FilterBadge color="blue" text="Deputy's Badge" />,
    ).toJSON()).toMatchSnapshot();
  });

  it('returns null when no text passed', () => {
    expect(renderer.create(<FilterBadge />).toJSON()).toMatchSnapshot();
  });
});
