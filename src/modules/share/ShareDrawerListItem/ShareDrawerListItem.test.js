import React from 'react';
import renderer from 'react-test-renderer';
import ShareDrawerListItem from './ShareDrawerListItem';

describe('ShareDrawerListItem', () => {
  it('renders list item with content', () => {
    expect(renderer.create(
      <ShareDrawerListItem className="additional-class">
        Share drawer list item
      </ShareDrawerListItem>,
    )).toMatchSnapshot();
  });
});
