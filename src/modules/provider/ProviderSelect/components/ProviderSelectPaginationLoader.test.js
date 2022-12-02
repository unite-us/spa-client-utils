import renderer from 'react-test-renderer';
import React from 'react';
import ProviderSelectPaginationLoader from './ProviderSelectPaginationLoader';

describe('ProviderSelectPaginationLoader', () => {
  const props = {
    onLoadMore: jest.fn(),
    emptyNextPageMessage: 'We have no more',
    isFetching: false,
    isReferral: false,
    paging: {
      current_page: 1,
      next_page: 2,
      total_count: 100,
    },
  };

  let tree = renderer.create(<ProviderSelectPaginationLoader {...props} />);

  it('renders "Load More"', () => {
    expect(tree).toMatchSnapshot();
  });

  it('renders the empty message', () => {
    tree = renderer.create(<ProviderSelectPaginationLoader {...props} paging={{ next_page: null }} />);
    expect(tree).toMatchSnapshot();
  });

  it('renders the the default empty message', () => {
    tree = renderer.create(<ProviderSelectPaginationLoader {...props} emptyNextPageMessage={undefined} paging={{ next_page: null }} />);
    expect(tree).toMatchSnapshot();
  });

  it('renders null, returns no empty message', () => {
    tree = renderer.create(<ProviderSelectPaginationLoader {...props} emptyNextPageMessage={null} paging={{ next_page: null }} />);
    expect(tree).toMatchSnapshot();
  });

  it('renders html empty message', () => {
    tree = renderer.create(<ProviderSelectPaginationLoader {...props} emptyNextPageMessage={<div>No More</div>} paging={{ next_page: null }} />);
    expect(tree).toMatchSnapshot();
  });

  it('renders the ProviderCardLoading when loading', () => {
    tree = renderer.create(<ProviderSelectPaginationLoader {...props} isFetching />);
    expect(tree).toMatchSnapshot();
  });
});
