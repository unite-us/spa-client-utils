import React from 'react';
import renderer from 'react-test-renderer';
import ShareDrawer from './ShareDrawer';

require('modules/share/ShareForm').default = jest.fn(() => <mock-share-form />);

const groups = [
  { id: 'group-1', name: 'Group 1' },
  { id: 'group-2', name: 'Group 2' },
  { id: 'group-3', name: 'Group 3' },
  { id: 'group-4', name: 'Group 4' },
];

const props = {
  groups,
  shareFormProps: {
    onSend: jest.fn(),
    sharesUrl: 'the.shares.url.com',
    id: 'test-id',
  },
};

const singleGroupProps = {
  groups: [{ id: 'group-1', name: 'Group 1' }],
  shareFormProps: {
    onSend: jest.fn(),
    sharesUrl: 'the.shares.url.com',
    id: 'test-id',
  },
};

describe('ShareDrawer', () => {
  it('renders a closed drawer', () => {
    expect(renderer.create(
      <ShareDrawer {...props} />,
    )).toMatchSnapshot();
  });

  it('renders an open drawer with header and group list', () => {
    expect(renderer.create(
      <ShareDrawer {...props} open />,
    )).toMatchSnapshot();
  });

  it('renders an open drawer with correct header based on group length', () => {
    expect(renderer.create(
      <ShareDrawer {...singleGroupProps} open />,
    )).toMatchSnapshot();
  });
});
