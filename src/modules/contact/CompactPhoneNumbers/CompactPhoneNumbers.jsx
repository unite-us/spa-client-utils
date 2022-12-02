import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Icon } from '@unite-us/ui';
import phones from 'modules/utils/phones';

const MAX_NUMBERS_COLLAPSED = 3;

const Caret = (
  <Icon
    icon="IconChevronDown"
    style={{
      svg: {
        display: 'inline-block',
        verticalAlign: 'bottom',
      },
    }}
  />
);

const CompactPhoneNumbers = ({
  phone_numbers = [],
}) => {
  if (!phone_numbers.length) {
    return null;
  }

  const [expanded, setExpanded] = useState(false);

  const rootClasses = classNames('ui-contact-information__compact-phone', {
    expanded,
  });

  const phoneNumbers = phones
    .sortPhoneNumbers(phone_numbers, [
      'mobile',
      'home',
      'work',
      'fax',
      'unknown',
    ])
    .filter(number => Boolean(number.phone_number));

  return (
    <div className={rootClasses}>
      <div className="ui-provider-card__icon-text--phone">
        <Icon icon="IconPhone" />
      </div>

      {phoneNumbers.map((phoneNumber, index) => {
        const {
          extension = '',
          phone_type = '',
          phone_number = '',
          is_primary = false,
        } = phoneNumber;

        if ((!expanded && (index + 1) > MAX_NUMBERS_COLLAPSED) || !phone_number) {
          return null;
        }

        return (
          <div className="phone-number" key={`phone-${phone_number}`}>
            {phone_type && (
              <span
                className="phone-number__phone-type"
                data-test-element={`phone-numbers_type_${index}`}
              >
                {phone_type}:{' '}
              </span>
            )}

            <a
              href={phones.getTelLink(phoneNumber)}
              target="_blank"
              tabIndex={0}
              rel="noopener noreferrer"
              data-test-element={`phone-numbers_link_${index}`}
            >
              <span
                data-test-element={`phone-numbers_number_${index}`}
              >
                {`${phones.formatPhoneNumber(phone_number)}${extension ? ` ${extension}` : ''}`}
              </span>
            </a>

            {is_primary && (
              <span
                className="phone-number__is-primary"
                data-test-element={`phone-numbers_primary_${index}`}
              >
                {' '}Primary
              </span>
            )}
          </div>
        );
      })}
      {phoneNumbers.length > MAX_NUMBERS_COLLAPSED && (
        <div
          className="phone-number__toggle"
          data-test-element="phone-numbers_toggle"
        >
          <Button
            iconRight={Caret}
            label={`See ${!expanded ? 'more' : 'less'}`}
            link
            onClick={() => setExpanded(!expanded)}
          />
        </div>
      )}
    </div>
  );
};

CompactPhoneNumbers.propTypes = {
  phone_numbers: PropTypes.arrayOf(PropTypes.shape({
    phone_type: PropTypes.string,
    phone_number: PropTypes.string,
    country_code: PropTypes.string,
    is_primary: PropTypes.bool,
    extension: PropTypes.string,
  })),
};

CompactPhoneNumbers.defaultProps = {
  phone_numbers: [],
};

export default CompactPhoneNumbers;
