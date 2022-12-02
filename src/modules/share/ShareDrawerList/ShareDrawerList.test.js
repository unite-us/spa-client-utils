import React from 'react';
import renderer from 'react-test-renderer';
import ShareDrawerList from './ShareDrawerList';

describe('ShareDrawerList', () => {
  it('renders list', () => {
    const listItems = [
      { name: 'One', id: 1 },
      { name: 'Two', id: 2 },
      { name: 'Three', id: 3 },
    ];
    expect(renderer.create(
      <ShareDrawerList
        className="additional-class"
        listItems={listItems}
      />,
    )).toMatchSnapshot();
  });

  it('renders list with custom item properties', () => {
    const listItems = [
      { display: 'One', key: 1 },
      { display: 'Two', key: 2 },
      { display: 'Three', key: 3 },
    ];
    expect(renderer.create(
      <ShareDrawerList
        className="additional-class"
        displayProperty="display"
        listItems={listItems}
        keyProperty="key"
      />,
    )).toMatchSnapshot();
  });
});
