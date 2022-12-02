import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isEmpty, noop } from 'lodash';
import { Icon } from '@unite-us/ui';
import addresses from 'modules/utils/addresses';
import ContactInformation from 'modules/contact/ContactInformation';
import HoursOfOperationV2 from 'modules/hours/HoursOfOperationV2';
import arrays from 'modules/utils/arrays';
import serviceTypeUtils from 'modules/utils/serviceTypes';
import ProviderCardAddRemoveButton from '../ProviderCard/components/ProviderCardAddRemoveButton';
import InfoPopover from '../../InfoPopover';

class ProviderCardV2 extends Component {
  constructor(props) {
    super(props);

    this.onAddProvider = this.onAddProvider.bind(this);
    this.onRemoveProvider = this.onRemoveProvider.bind(this);
    this.onDetailClick = this.onDetailClick.bind(this);
    this.generateMoreAddressCountText = this.generateMoreAddressCountText.bind(this);

    const { provider, originLatLng } = props;
    const calculatedDistances = provider.addresses.map(address => addresses.calculateDistance(address, originLatLng));

    const closestDistanceAddress = addresses.findClosestDistanceAddress(calculatedDistances);

    this.state = {
      addresses: provider.addresses,
      addressLength: provider.addresses.length,
      closestDistanceAddress,
      originLatLng,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      (nextProps.originLatLng[0] !== this.state.originLatLng[0]) ||
      (nextProps.originLatLng[1] !== this.state.originLatLng[1])) {
      const { provider } = nextProps;

      const calculatedDistances = provider.addresses.map(address => addresses.calculateDistance(address, nextProps.originLatLng));

      const closestDistanceAddress = addresses.findClosestDistanceAddress(calculatedDistances);

      this.setState({ closestDistanceAddress, originLatLng: nextProps.originLatLng });
    }
  }

  onAddProvider(destinationLatLng) {
    const {
      provider,
      onAddProvider,
      originLatLng,
    } = this.props;

    const distance = addresses.getDistanceInMiles(originLatLng, destinationLatLng, {
      format: 'float',
    });

    const providerWithDistance = { ...provider, distance };

    onAddProvider(providerWithDistance);
  }

  onRemoveProvider() {
    const { provider, onRemoveProvider } = this.props;
    onRemoveProvider(provider);
  }

  onDetailClick() {
    const { provider, onDetailClick } = this.props;
    onDetailClick(provider);
  }

  generateMoreAddressCountText() {
    let text;

    const { addressLength } = this.state;
    if (addressLength > 1) {
      text = `${addressLength - 1} more`;
    }
    return text;
  }

  render() {
    const {
      id,
      className,
      disableSelection,
      isSelected,
      onDetailClick,
      originLatLng,
      provider,
      selectedServiceType,
      unselectable,
      serve,
      tooltipText,
    } = this.props;

    const {
      closestDistanceAddress,
    } = this.state;

    const detailsProps = !onDetailClick ? {} : {
      onClick: this.onDetailClick,
      onKeyPress: this.onDetailClick,
      role: 'button',
      style: { cursor: 'pointer' },
      tabIndex: 0,
    };

    const isInNetworkGroup = provider.licensed;
    const providerServiceTypes = provider.service_types;

    const serviceTypes = serviceTypeUtils.matchingServiceTypes(selectedServiceType, providerServiceTypes);
    const svcTypeBanner = serviceTypeUtils.serviceTypeBanner(serviceTypes);

    const {
      email_addresses,
      hours,
      phone_numbers,
      website_url,
    } = provider;

    const showContactInfo =
      !isEmpty(email_addresses) ||
      !isEmpty(phone_numbers) ||
      !isEmpty(website_url);

    const addressCount = this.generateMoreAddressCountText();
    const location = {
      hours,
      ...closestDistanceAddress,
    };

    return (
      <InfoPopover
        tooltipText={tooltipText}
        id={id}
        hiddenTooltip={!serve}
        placement="right"
        boundariesElement="window"
        className="ui-provider-card__tooltip"
      >
        <div
          className={classnames('ui-provider-card ui-provider-card--v2', className)}
          id={`anchor-id-${id}`}
        >
          <div className={
            classnames('ui-provider-card__info', {
              'ui-provider-card__info-disabled': disableSelection,
            })
          }
          >
            {
              serve && (
                <div>
                  <Icon
                    className="ui-provider-card__service-area-icon"
                    color="#4467ab38"
                    icon="IconRadar"
                    size={18}
                  />
                  <div className="mb-half">
                    <Icon
                      className="ui-location__icon mr-quarter"
                      color={`${isInNetworkGroup ? '#4571BA' : '#2C405A'}`}
                      icon="IconRadar"
                      size={18}
                    />
                    <span>Serves this area</span>
                  </div>
                </div>
              )
            }
            <div className="ui-provider-card__detail" {...detailsProps}>
              {
                (!isInNetworkGroup) &&
                <div className="ui-provider-card__oon">
                  <Icon
                    className="mr-half"
                    color="#2C405A"
                    icon="IconElectronsArrowV2"
                  />
                  <span>
                    Out of Network Organization
                  </span>
                </div>
              }
              <h4 className="ui-provider-card__name">{provider.name}</h4>
              {
                !isEmpty(svcTypeBanner) &&
                <p className="ui-provider-card__service-type">
                  {svcTypeBanner}
                </p>
              }
              {
                showContactInfo &&
                <ContactInformation
                  addressCount={addressCount}
                  addresses={[location]}
                  email_addresses={email_addresses}
                  hideLabels
                  hours={hours}
                  isInNetworkGroup={isInNetworkGroup}
                  originLatLng={originLatLng}
                  phone_numbers={[arrays.findPrimaryOrFirst(phone_numbers)]}
                  showContactInfoHeader={false}
                  showLocationHours={false}
                  website_url={website_url}
                  serve={serve}
                />
              }
              <HoursOfOperationV2
                hours={location.hours || location.hours_of_operation}
                isInNetworkGroup={isInNetworkGroup}
                showAll={false}
                showHoursIcon
              />
            </div>
          </div>
          {
            !disableSelection && !unselectable &&
            <ProviderCardAddRemoveButton
              destinationLatLng={closestDistanceAddress.latLng}
              distance={closestDistanceAddress.distance}
              onAddClick={this.onAddProvider}
              onRemoveClick={this.onRemoveProvider}
              selected={isSelected}
            />
          }
        </div>
      </InfoPopover>

    );
  }
}

ProviderCardV2.propTypes = {
  /** identifier for each card */
  id: PropTypes.string.isRequired,
  /** className */
  className: PropTypes.string,
  /** true for disabled card state, hidden add/remove button */
  disableSelection: PropTypes.bool,
  /** true indicates this provider is selected */
  isSelected: PropTypes.bool,
  /** called on add button click */
  onAddProvider: PropTypes.func,
  /** called on provider card click */
  onDetailClick: PropTypes.func,
  /** called on remove button click */
  onRemoveProvider: PropTypes.func,
  /** center of map to calculate distance */
  originLatLng: PropTypes.array,
  /** called to open link with AGL protocol */
  openLink: PropTypes.func,
  /** object containing provider data */
  provider: PropTypes.shape({
    addresses: PropTypes.array,
    email_addresses: PropTypes.array,
    group_type: PropTypes.string,
    hours: PropTypes.object,
    licensed: PropTypes.bool,
    name: PropTypes.string,
    phone_numbers: PropTypes.array,
    service_types: PropTypes.array,
    website_url: PropTypes.string,
  }).isRequired,
  showMore: PropTypes.bool,
  /** service type object or array of service type objects */
  selectedServiceType: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
    ),
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
  ]).isRequired,
  /** true to hide add/remove buttons */
  unselectable: PropTypes.bool,
  /** true to hide location field and show map icon with serve this area label */
  serve: PropTypes.bool,
  /** text to show when using the popover as a tooltip */
  tooltipText: PropTypes.string,
};

ProviderCardV2.defaultProps = {
  className: '',
  disableSelection: false,
  isSelected: false,
  onAddProvider: noop,
  onDetailClick: noop,
  onRemoveProvider: noop,
  openLink: window.open,
  originLatLng: [],
  showMore: false,
  unselectable: false,
  serve: false,
  tooltipText: undefined,
};

export default ProviderCardV2;
