import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button } from '@unite-us/ui';
import ProviderCardLoading from './ProviderCardLoading';

function hasMorePages(pagingObject) {
  return !!pagingObject.next_page;
}

const ProviderSelectPaginationLoader = ({
  onLoadMore,
  isFetching,
  isReferral,
  paging,
}) => {
  if (isFetching) {
    return (
      <div className="ui-provider-select__load-more--fetching">
        <ProviderCardLoading />
      </div>
    );
  }

  if (hasMorePages(paging) && !_.isEmpty(paging)) {
    const remainingProviders = paging.total_count - (50 * paging.current_page);
    const nextLoadSize = remainingProviders > 50 ? 50 : remainingProviders;
    let label = `Load ${nextLoadSize} More Results`;
    label = isReferral ? 'Load More Results' : label;

    return (
      <Button
        className="ui-provider-select__load-more"
        id="load-more"
        label={label}
        primary
        onClick={onLoadMore}
      />
    );
  }

  return null;
};

ProviderSelectPaginationLoader.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isReferral: PropTypes.bool.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  paging: PropTypes.object.isRequired,
};

ProviderSelectPaginationLoader.defaultProps = {
  isFetching: false,
  paging: {},
};

export default ProviderSelectPaginationLoader;
