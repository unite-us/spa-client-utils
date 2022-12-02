import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, uniqueId } from 'lodash';
import { Icon } from '@unite-us/ui';
import AllOrOne from 'modules/AllOrOne';
import EmailAddress from 'modules/contact/EmailAddress';
import HoursOfOperationV2 from 'modules/hours/HoursOfOperationV2';
import addresses from 'modules/utils/addresses';
import phones from 'modules/utils/phones';

const Location = ({
  addressCount,
  className,
  clickableAddress,
  disableEmailLink,
  disablePhoneLink,
  hideLabels,
  isInNetworkGroup,
  location: locationData,
  originLatLng,
  showHours,
  showHoursIcon,
  showMore,
  stopEventPropagation,
  additionalContentComponent,
}) => {
  const location = addresses.calculateDistance(locationData, originLatLng);

  const locationAddress = loc => (!isEmpty(originLatLng) ? `${loc.displayName} (${loc.distance})` : `${loc.displayName}`);

  const locationAddressWithLink = () => (clickableAddress ?
    <a
      href={addresses.makeGoogleMapLink(location)}
      rel="noopener noreferrer"
      target="_blank"
      className="ui-locations-address-link"
    >
      {locationAddress(location)}
    </a> :
    locationAddress(location));

  const formattedPhoneNumber = phoneNumber => (
    (!hideLabels && phoneNumber.phone_type) ?
      `${phoneNumber.phone_type}: ${phones.formatPhoneNumber(phoneNumber.phone_number)}` :
      phones.formatPhoneNumber(phoneNumber.phone_number));

  const AdditionalContentComponent = additionalContentComponent;

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={`ui-location ${className}`}
      onClick={(e) => { if (stopEventPropagation) { e.stopPropagation(); } }}
    >
      <div
        className="ui-location__address"
        key={uniqueId(location.name || location.displayName)}
      >
        <Icon
          className="ui-location__icon mr-half"
          color={`${isInNetworkGroup ? '#4571BA' : '#2C405A'}`}
          icon="IconMapMarkV2"
          size={18}
        />
        <div className="ui-location__content pl-quarter">

          { !hideLabels && location.name ?
            location.name :
            <p className="ui-location__address-name">
              <span className="mr-half">{locationAddressWithLink(location)}</span>
              <span className="ui-location__address-name-more">
                {!isEmpty(addressCount) ? addressCount : ''}
              </span>
            </p>
          }

          { !hideLabels && location.name && (
            <p className="ui-location__address">
              <span className="mr-half">{locationAddressWithLink(location)}</span>
              <span className="ui-location__address-name-more">
                {!isEmpty(addressCount) ? addressCount : ''}
              </span>
            </p>
          )}

          <AllOrOne showAll={showMore}>
            { location.phone_numbers && location.phone_numbers.map(phoneNumber => (
              <p
                key={`phone-${phoneNumber.phone_number}`}
                className="ui-location__phone"
              >
                { disablePhoneLink ?
                  formattedPhoneNumber(phoneNumber) :
                  <a
                    href={phones.getTelLink(phoneNumber)}
                    target="_blank"
                    tabIndex={0}
                    rel="noopener noreferrer"
                  >
                    { formattedPhoneNumber(phoneNumber) }
                  </a>
                }
              </p>
            ))
            }
          </AllOrOne>

          <AllOrOne showAll={showMore}>
            {
              location.email_addresses && location.email_addresses.map(email => (
                <p
                  className="ui-location__email"
                  key={`email-${email}`}
                >
                  <EmailAddress
                    className="program-details__email-text"
                    disableLink={disableEmailLink}
                    emailAddress={email}
                  />
                </p>
              ))
            }
          </AllOrOne>
        </div>
      </div>
      { showHours &&
        <div className="ui-location__hours">
          <HoursOfOperationV2
            hours={location.hours || location.hours_of_operation}
            isInNetworkGroup={isInNetworkGroup}
            showAll={showMore}
            showHoursIcon={showHoursIcon}
            showToggle
          />
        </div>
      }
      {additionalContentComponent && <AdditionalContentComponent location={location} />}
    </div>
  );
};

Location.propTypes = {
  addressCount: PropTypes.string,
  className: PropTypes.string,
  clickableAddress: PropTypes.bool,
  disableEmailLink: PropTypes.bool,
  disablePhoneLink: PropTypes.bool,
  hideLabels: PropTypes.bool,
  isInNetworkGroup: PropTypes.bool,
  location: PropTypes.object.isRequired,
  originLatLng: PropTypes.array,
  showHours: PropTypes.bool,
  showHoursIcon: PropTypes.bool,
  showMore: PropTypes.bool,
  stopEventPropagation: PropTypes.bool,
  /**
   * Property to pass a component that will render in the main content area of the component.
   * This feature is used to render an edit location link.
   */
  additionalContentComponent: PropTypes.func,
};

Location.defaultProps = {
  addressCount: null,
  className: '',
  clickableAddress: false,
  disableEmailLink: false,
  disablePhoneLink: false,
  hideLabels: false,
  isInNetworkGroup: true,
  originLatLng: [],
  showHours: true,
  showHoursIcon: false,
  showMore: false,
  stopEventPropagation: false,
  additionalContentComponent: null,
};

export default Location;
