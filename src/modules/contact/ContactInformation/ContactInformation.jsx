import React from 'react';
import PropTypes from 'prop-types';
import { compact, isEmpty, without } from 'lodash';
import { Icon } from '@unite-us/ui';
import AllOrOne from 'modules/AllOrOne';
import EmailAddress from 'modules/contact/EmailAddress';
import Location from 'modules/locations/Location';
import PhoneNumbers from 'modules/contact/PhoneNumbers';
import arrays from 'modules/utils/arrays';
import urls from 'modules/utils/urls';

const ContactInformation = ({
  addressCount,
  addresses,
  className,
  email_addresses,
  headerText,
  hideLabels,
  isInNetworkGroup,
  openLink,
  originLatLng,
  phone_numbers,
  primary_contact_name,
  showContactInfoHeader,
  showLocationHours,
  showMore,
  website_url,
  serve,
}) => {
  const primaryEmail = arrays.findPrimaryOrFirst(email_addresses);
  const emailAdresses = compact([
    primaryEmail,
    ...without(email_addresses, primaryEmail),
  ]);

  const validExternalUrl = urls.addHttpIfNeeded(website_url);

  const showHeader = showContactInfoHeader && (
    !isEmpty(email_addresses) ||
    !isEmpty(phone_numbers) ||
    !isEmpty(primary_contact_name) ||
    !isEmpty(website_url)
  );

  const handleOpenLink = (e) => {
    e.preventDefault();
    openLink(validExternalUrl);
  };

  return (
    <div className={`ui-contact-information ${className}`}>
      {showHeader &&
        <h4 className="ui-contact-information__header mb-half">
          {headerText}
        </h4>
      }

      {
        primary_contact_name ? (
          <div className="ui-contact-information__worker mb-half">
            <Icon
              className="ui-contact-information__icon mr-half"
              color={`${isInNetworkGroup ? '#4571BA' : '#2C405A'}`}
              icon="IconUserCircle"
            />
            <span className="ui-contact-information__worker--name pl-quarter">{primary_contact_name}</span>
          </div>
        ) : null
      }

      <AllOrOne>
        {!serve && addresses && addresses.map(location => (
          <Location
            addressCount={addressCount}
            className="ui-contact-information__location mb-quarter"
            hideLocationName={false}
            isInNetworkGroup={isInNetworkGroup}
            location={location}
            originLatLng={originLatLng}
            showHours={showLocationHours}
            showMore={showMore}
          />
        ),
        )}
      </AllOrOne>
      <AllOrOne showAll={showMore}>
        {
          phone_numbers &&
            <PhoneNumbers
              hideLabels={hideLabels}
              isInNetworkGroup={isInNetworkGroup}
              phone_numbers={phone_numbers}
            />
        }
      </AllOrOne>

      <AllOrOne showAll={showMore}>
        {
          !isEmpty(email_addresses) && emailAdresses.map(email => (
            <div
              key={`email-${email}`}
              className="ui-contact-information__email mb-half"
            >
              <Icon
                className="ui-contact-information__icon--email mr-half"
                color={`${isInNetworkGroup ? '#4571BA' : '#2C405A'}`}
                icon="IconEnvelope"
              />
              <EmailAddress
                className="ui-contact-information__icon-text pl-quarter"
                emailAddress={email}
              />
            </div>
          ))
        }
      </AllOrOne>

      {
        website_url ? (
          <div className="ui-contact-information__website mb-half">
            <Icon
              className="ui-contact-information__icon mr-half"
              color={`${isInNetworkGroup ? '#4571BA' : '#2C405A'}`}
              icon="IconGlobe"
            />
            <a
              id="website-link"
              className="ui-contact-information__icon-text--website pl-quarter"
              href="#"
              onClick={handleOpenLink}
              title={'Organization Website'}
              target="_blank"
              rel="noreferrer noopener"
            >
              {validExternalUrl}
            </a>
          </div>
        ) : null
      }
    </div>
  );
};

ContactInformation.propTypes = {
  addressCount: PropTypes.string,
  addresses: PropTypes.array,
  className: PropTypes.string,
  email_addresses: PropTypes.array,
  headerText: PropTypes.string,
  hideLabels: PropTypes.bool,
  isInNetworkGroup: PropTypes.bool,
  openLink: PropTypes.func,
  originLatLng: PropTypes.array,
  phone_numbers: PropTypes.array,
  primary_contact_name: PropTypes.string,
  showContactInfoHeader: PropTypes.bool,
  showLocationHours: PropTypes.bool,
  showMore: PropTypes.bool,
  website_url: PropTypes.string,
  serve: PropTypes.bool,
};

ContactInformation.defaultProps = {
  addressCount: '',
  addresses: [],
  className: '',
  email_addresses: [],
  headerText: 'Contact Information',
  hideLabels: false,
  isInNetworkGroup: true,
  openLink: window.open,
  originLatLng: [],
  phone_numbers: [],
  primary_contact_name: '',
  showContactInfoHeader: true,
  showLocationHours: false,
  showMore: false,
  website_url: '',
  serve: false,
};

export default ContactInformation;
