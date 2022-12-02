import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@unite-us/ui';
import phones from 'modules/utils/phones';

const PhoneNumbers = ({ phone_numbers = [], hideLabels, isInNetworkGroup, sortOrder, detailedExtension }) => {
  const phoneNumbers = phones.sortPhoneNumbers(phone_numbers, sortOrder);
  return (
    phoneNumbers.map((phoneNumber) => {
      const {
        extension = '',
        phone_type = '',
        phone_number = '',
      } = phoneNumber;

      const capitalized_phone_type = phone_type ? phone_type[0].toUpperCase() + phone_type.slice(1) : '';
      let numberText = (!hideLabels && capitalized_phone_type) ? `${capitalized_phone_type}: ` : '';
      numberText += phones.formatPhoneNumber(extension ? phone_number + extension : phone_number, detailedExtension);
      return (
        <div
          key={`phone-${phone_number}`}
          className="ui-contact-information__phone mb-half"
        >
          <a
            href={phones.getTelLink(phoneNumber, detailedExtension)}
            target="_blank"
            tabIndex={0}
            rel="noopener noreferrer"
          >
            <Icon
              className="program-details__icon program-details__icon--phone mr-quarter"
              color={`${isInNetworkGroup ? '#4571BA' : '#2C405A'}`}
              icon="V2Phone"
            />

            <span
              className="ui-provider-card__icon-text--phone ml-half normal-case"
              {...(detailedExtension && { 'data-test-element': 'client_phone_number' })}
            >
              {numberText}
            </span>
          </a>
        </div>
      );
    }));
};

PhoneNumbers.propTypes = {
  hideLabels: PropTypes.bool,
  isInNetworkGroup: PropTypes.bool,
  phone_numbers: PropTypes.array.isRequired,
  sortOrder: PropTypes.array,
  detailedExtension: PropTypes.bool,
};

PhoneNumbers.defaultProps = {
  hideLabels: false,
  isInNetworkGroup: true,
  sortOrder: ['work', 'mobile', 'home', 'phone', 'fax', 'other', 'unknown'],
  detailedExtension: false,
};

export default PhoneNumbers;
