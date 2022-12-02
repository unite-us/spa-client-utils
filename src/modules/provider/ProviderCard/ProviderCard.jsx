import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { get, find, isEmpty, map, noop, orderBy } from 'lodash';
import { Icon } from '@unite-us/ui';
import serviceTypeUtils from 'modules/utils/serviceTypes';
import addresses from 'modules/utils/addresses';
import constants from 'modules/utils/constants';
import arrays from 'modules/utils/arrays';
import phones from 'modules/utils/phones';
import urls from 'modules/utils/urls';
import { DAYS_OF_THE_WEEK, CLOSED_DAY } from 'modules/hours/HoursOfOperation/constants';
import { formatDuration } from 'modules/hours/HoursOfOperation/utils';
import EmailAddress from 'modules/contact/EmailAddress';
import ProviderCardAddRemoveButton from './components/ProviderCardAddRemoveButton';

class ProviderCard extends Component {
  constructor(props) {
    super(props);

    this.onAddProvider = this.onAddProvider.bind(this);
    this.onRemoveProvider = this.onRemoveProvider.bind(this);
    this.onDetailClick = this.onDetailClick.bind(this);
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

  render() {
    const {
      className,
      disableSelection,
      isSelected,
      onDetailClick,
      originLatLng,
      provider,
      selectedServiceType,
      unselectable,
    } = this.props;

    const date = new Date();
    const today = DAYS_OF_THE_WEEK[date.getDay() - 1];
    const hasHoursOfOperation = !isEmpty(provider.hours_of_operation) || !isEmpty(provider.hours);
    let hoursDisplay = '';
    let todayHours = [];
    if (provider.hours_of_operation !== undefined) {
      todayHours = find(provider.hours_of_operation, { day_of_week: today }) || {};
      hoursDisplay = map(
        orderBy(todayHours.hours_of_operation, 'opens_at'),
        formatDuration,
      ).join(', ');
    } else {
      todayHours = get(provider, ['hours', today], []);
      hoursDisplay = map(
        todayHours,
        formatDuration,
      ).join(', ');
    }

    const email = arrays.findPrimaryOrFirst(provider.email_addresses);
    const phone = arrays.findPrimaryOrFirst(provider.phone_numbers);

    const destinationLatLng = provider.addresses[0] && provider.addresses[0].lat_lng !== undefined ?
      get(provider, 'addresses[0].lat_lng', []) :
      [get(provider, 'addresses[0].latitude', []), get(provider, 'addresses[0].longitude', [])];
    const distance = addresses.getDistanceInMiles(originLatLng, destinationLatLng);

    const detailsProps = !onDetailClick ? {} : {
      onClick: this.onDetailClick,
      onKeyPress: this.onDetailClick,
      role: 'button',
      style: { cursor: 'pointer' },
      tabIndex: 0,
    };

    const isInNetworkGroup = get(provider, 'group_type') === constants.IN_NETWORK_GROUP_TYPE || get(provider, 'licensed') === true;
    const providerServiceTypes = provider.service_types;

    const serviceTypes = serviceTypeUtils.matchingServiceTypes(selectedServiceType, providerServiceTypes);
    const svcTypeBanner = serviceTypeUtils.serviceTypeBanner(serviceTypes);

    const addressString = addresses.getAddressString(get(provider, 'addresses[0]'));

    return (
      <div className={classnames('ui-provider-card', className)}>
        <div className={
          classnames('ui-provider-card__info', {
            'ui-provider-card__info-disabled': disableSelection,
          })
        }
        >
          <div className="ui-provider-card__detail" {...detailsProps}>
            {
              (!isInNetworkGroup) &&
                <div className="ui-provider-card__oon">
                  <Icon
                    icon="IconElectronsArrow"
                    size={20}
                    className="mr-half"
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
              !isEmpty(provider.addresses) &&
              <p
                className="ui-provider-card__address mb-quarter"
                title={addressString}
              >
                <Icon icon="IconMapMarker" size={16} />
                {addressString}
              </p>
            }
            {
              !isEmpty(distance) &&
              <p className="ui-provider-card__distance mb-quarter">
                <span><Icon icon="IconCompass" size={16} /></span>
                <span>{distance}</span>
              </p>
            }
            {
              hasHoursOfOperation &&
              <p className="ui-provider-card__hours mb-quarter">
                <span><Icon icon="IconClock" size={16} /></span>
                <span>TODAY:&nbsp;</span>
                <span>
                  {isEmpty(todayHours) ? CLOSED_DAY : hoursDisplay}
                </span>
              </p>
            }
            {
              !isEmpty(phone) &&
              <p className="ui-provider-card__phone mb-quarter">
                <a
                  href={phones.getTelLink(phone)}
                  target="_blank"
                  tabIndex={0}
                  rel="noopener noreferrer"
                >
                  <span><Icon icon="IconPhone" size={12} /></span>
                  {phones.formatPhoneNumber(phone.extension ?
                    phone.phone_number + phone.extension : phone.phone_number)}
                </a>
              </p>
            }
            {
              /** @todo Do we need a way to hide emails in emr? */
              !isEmpty(email) &&
              <p className="ui-provider-card__email mb-quarter">
                <span>
                  <Icon icon="IconEnvelope" size={16} />
                  <EmailAddress emailAddress={email.email_address} />
                </span>
              </p>
            }
            {
              provider.website_url &&
              <p className="ui-provider-card__url mb-quarter">
                <a
                  href={urls.addHttpIfNeeded(provider.website_url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={0}
                >
                  <span><Icon icon="IconWeb" size={16} /></span>
                  {provider.website_url}
                </a>
              </p>
            }
          </div>
        </div>
        {
          !disableSelection && !unselectable &&
            <ProviderCardAddRemoveButton
              selected={isSelected}
              distance={distance}
              destinationLatLng={destinationLatLng}
              onAddClick={this.onAddProvider}
              onRemoveClick={this.onRemoveProvider}
            />
        }
      </div>
    );
  }
}

ProviderCard.propTypes = {
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
  /** object containing provider data */
  provider: PropTypes.shape({
    addresses: PropTypes.array,
    email_addresses: PropTypes.array,
    group_type: PropTypes.string,
    hours: PropTypes.object,
    hours_of_operation: PropTypes.array,
    name: PropTypes.string,
    phone_numbers: PropTypes.array,
    programs: PropTypes.array,
    service_types: PropTypes.array,
    website_url: PropTypes.string,
  }).isRequired,
  /** service type object or array of service type objects */
  selectedServiceType: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
    ),
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
  ]).isRequired,
  /** true to hide add/remove buttons */
  unselectable: PropTypes.bool,
};

ProviderCard.defaultProps = {
  className: '',
  disableSelection: false,
  isSelected: false,
  onAddProvider: noop,
  onDetailClick: noop,
  onRemoveProvider: noop,
  originLatLng: [],
  unselectable: false,
};

export default ProviderCard;
