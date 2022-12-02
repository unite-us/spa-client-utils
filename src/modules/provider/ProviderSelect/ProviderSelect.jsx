import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { concat, findIndex, filter, includes, isEmpty, noop, some } from 'lodash';
import classNames from 'classnames';
import ProviderCard from 'modules/provider/ProviderCard';
import ProviderCardV2 from 'modules/provider/ProviderCardV2';
import ProviderCardEmpty from './components/ProviderCardEmpty';
import ProviderCardLoading from './components/ProviderCardLoading';
import ProviderSelectPaginationLoader from './components/ProviderSelectPaginationLoader';

class ProviderSelect extends Component {
  constructor(props) {
    super(props);

    this.onAddProvider = this.onAddProvider.bind(this);
    this.onRemoveProvider = this.onRemoveProvider.bind(this);
  }

  onAddProvider(provider) {
    const { input: { onChange, value } } = this.props;
    const originalValue = value === '' ? [] : value;
    const newValue = concat(originalValue, provider);

    onChange(newValue);
  }

  onRemoveProvider(provider) {
    const { input: { onChange, value } } = this.props;
    const originalValue = value === '' ? [] : value;
    const newValue = filter(originalValue, val => val.id !== provider.id);

    onChange(newValue);
  }

  render() {
    const {
      ccGroupIds,
      id,
      input,
      isLoading,
      isReferral,
      meta,
      onDetailClick,
      onLoadMore,
      openLink,
      options,
      originLatLng,
      paging,
      renderPaginationLoader,
      selectedServiceType,
      v2Flag,
    } = this.props;
    const hasError = meta.invalid && meta.touched;
    const containerClass = () => classNames({
      'ui-form-field': true,
      'ui-form-field--has-error': hasError,
    });
    const selectedProviders = input.value;
    const hasSelection = selectedProviders.length > 0;
    // Potentially high time complexity operation?
    const hasCCSelected = some(selectedProviders, provider => some(ccGroupIds, ccId => provider.id === ccId));

    return (
      <div
        className={containerClass()}
        id={id}
      >
        <div className="ui-provider-select">
          {
            (isLoading && isEmpty(options) && !renderPaginationLoader) && <ProviderCardLoading />
          }
          {
            !isEmpty(options) && (!isLoading || renderPaginationLoader) &&
            <div
              onBlur={input.onBlur}
              onFocus={input.onFocus}
              className="ui-provider-select-cards"
            >
              {
                options.map((provider) => {
                  const isCC = includes(ccGroupIds, provider.id);
                  const isSelected = findIndex(selectedProviders, val => val.id === provider.id) >= 0;
                  const disableSelection = !isSelected && ( // Only prevent selection if the item is not already selected
                    (!isCC && hasSelection && hasCCSelected) // Item is non-CC and some CC is already selected
                    || (isCC && hasSelection) // Item is CC and another item is selected
                  );

                  if (v2Flag) {
                    return (
                      <ProviderCardV2
                        disableSelection={disableSelection}
                        isSelected={isSelected}
                        key={provider.id}
                        onAddProvider={this.onAddProvider}
                        openLink={openLink}
                        onDetailClick={onDetailClick}
                        onRemoveProvider={this.onRemoveProvider}
                        originLatLng={originLatLng}
                        provider={provider}
                        selectedServiceType={selectedServiceType}
                      />
                    );
                  }
                  return (
                    <ProviderCard
                      disableSelection={disableSelection}
                      isSelected={isSelected}
                      key={provider.id}
                      onAddProvider={this.onAddProvider}
                      onDetailClick={onDetailClick}
                      onRemoveProvider={this.onRemoveProvider}
                      originLatLng={originLatLng}
                      provider={provider}
                      selectedServiceType={selectedServiceType}
                    />
                  );
                })
              }
            </div>
          }
          {
            !isLoading && isEmpty(options) && <ProviderCardEmpty />
          }
          {
            renderPaginationLoader &&
            <ProviderSelectPaginationLoader
              isFetching={isLoading}
              isReferral={isReferral}
              onLoadMore={onLoadMore}
              paging={paging}
            />
          }
        </div>
        <div className="ui-form-field__error">
          {meta.error}
        </div>
      </div>
    );
  }
}

ProviderSelect.propTypes = {
  /** Array of group ids identified as coordination centers */
  ccGroupIds: PropTypes.array,
  /** ID for the component */
  id: PropTypes.string.isRequired,
  /** input prop passed by Redux-form */
  input: PropTypes.object.isRequired,
  /** display loading bar */
  isLoading: PropTypes.bool,
  /** indicates Referral Workflow */
  isReferral: PropTypes.bool,
  /** meta prop passed by Redux-form */
  meta: PropTypes.object.isRequired,
  /**
   * callback when the detail card is clicked
   * @param {object} provider
  */
  onDetailClick: PropTypes.func,
  /** callback when the "Load More" button is clicked */
  onLoadMore: PropTypes.func,
  /** called to open link with AGL protocol */
  openLink: PropTypes.func,
  /** array of providers */
  options: PropTypes.array,
  /** origin lat_lng array used to calculate distance to provider location */
  originLatLng: PropTypes.array,
  /** object prop for paging information */
  paging: PropTypes.object,
  /** shows "Load More" if ProviderSelectPaginationLoader prop is passed */
  renderPaginationLoader: PropTypes.bool,
  /** the current service type(s) to display on the card */
  selectedServiceType: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  /** Temporary prop to display ProviderCardV2 component -- should remove after feature flag is removed */
  v2Flag: PropTypes.bool,
};

ProviderSelect.defaultProps = {
  ccGroupIds: [],
  isLoading: false,
  isReferral: false,
  onDetailClick: null,
  onLoadMore: noop,
  openLink: window.open,
  options: [],
  originLatLng: [],
  paging: {},
  renderPaginationLoader: false,
  selectedServiceType: {},
  v2Flag: false,
};

export default ProviderSelect;
