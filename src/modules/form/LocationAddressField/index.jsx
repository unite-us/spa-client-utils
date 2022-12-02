import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { InputField, Icon } from '@unite-us/ui';
import { debounce } from 'lodash';
import {
  stringifyAddress,
  updateFieldsValues,
  getAutoCompleteOptions,
} from './utils';
import isAddressValid from './utils/isAddressValid';

const debouncedGetAutoCompleteOptions = debounce(getAutoCompleteOptions, 200);

const LocationAddressField = (props) => {
  const {
    className,
    id,
    label,
    fieldNamePath,
    google,
    required,
  } = props;
  const addressData = fieldNamePath ? props[fieldNamePath] : props;
  const invalidAddressMsg = 'City is required';

  const isValid = isAddressValid(addressData);

  const [address, setAddress] = useState({
    value: stringifyAddress(addressData),
    valid: isValid,
    invalid: !isValid,
    visited: false,
    active: false,
    touched: false,
    dirty: false,
    pristine: true,
    error: isValid ? undefined : invalidAddressMsg,
  });

  useEffect(
    () => {
      setAddress({
        ...address,
        value: stringifyAddress(addressData),
        valid: isValid,
        invalid: !isValid,
      });
    },
    [
      addressData.line_1,
      addressData.city,
      addressData.county,
      addressData.country,
      addressData.postal_code,
      addressData.state,
    ],
  );

  const [dropdown, setDropdown] = useState({
    open: false,
    results: [],
  });

  const onAddressChange = (event) => {
    updateFieldsValues(null, addressData);
    const value = event.target.value;
    setAddress({
      ...address,
      value,
      valid: false,
      invalid: true,
      pristine: false,
      dirty: true,
      touched: true,
      error: invalidAddressMsg,
    });

    return debouncedGetAutoCompleteOptions(value, results => setDropdown({
      open: true,
      results,
    }), google);
  };

  const onAddressFocus = () => {
    setAddress({
      ...address,
      active: true,
      touched: address.dirty,
    });

    if (dropdown.results.length !== 0) {
      setDropdown({
        ...dropdown,
        open: true,
      });
    }
  };

  const onAddressBlur = (event) => {
    setAddress({
      ...address,
      ...(!event.target.value ? {
        error: (required) ? 'Required' : undefined,
        valid: !required,
        invalid: required,
      } : {}),
      active: false,
      visited: true,
      touched: true,
      pristine: false,
    });
  };

  const onResultClick = result => () => {
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails({
      placeId: result.place_id,
      fields: ['address_components', 'geometry.location'],
    }, (PlaceResult, PlacesServiceStatus) => {
      if (PlacesServiceStatus === google.maps.places.PlacesServiceStatus.OK) {
        const resultObj = {
          ...result,
          result: {
            ...PlaceResult,
          },
          latLng: {
            lat: PlaceResult.geometry.location.lat(),
            lng: PlaceResult.geometry.location.lng(),
          },
        };
        updateFieldsValues(resultObj, addressData);
        setDropdown({
          ...dropdown,
          open: false,
        });
      }
    });
  };

  const onResultKeyDown = result => (event) => {
    // Capture Enter and Space keys
    if (['Enter', ' '].includes(event.key)) {
      event.preventDefault();
      onResultClick(result)();
    }
  };

  const onCloseDropDown = () => {
    setDropdown({
      ...dropdown,
      open: false,
    });
  };

  return (
    <div className={`location-address-field ${className}`}>
      <div
        id={`${id}-address`}
        className="location-address-field__address-field"
      >
        <InputField
          id={`${id}-address-field`}
          label={label}
          {...address}
          onChange={onAddressChange}
          onFocus={onAddressFocus}
          onBlur={onAddressBlur}
          required={required}
        />
        {
          dropdown.open && (
            <div className="location-address-field__dropdown-close-btn">
              <Icon
                id="address-dropdown-close-btn"
                icon="IconTimes"
                onClick={onCloseDropDown}
              />
            </div>
          )
        }
        {
          dropdown.open && (
            <div className="location-address-field__dropdown">
              {
                dropdown.results.map(result => (
                  <div
                    key={result.id}
                    className="location-address-field__dropdown-item"
                    role="button"
                    onClick={onResultClick(result)}
                    onKeyDown={onResultKeyDown(result)}
                    tabIndex="0"
                  >
                    <Icon icon="V2MapPin" color="#4467AB" />
                    {result.address}
                  </div>
                ))
              }
              {
                dropdown.results.length === 0 && (
                  <div className="location-address-field__dropdown-item location-address-field__dropdown-item--no-matches">
                    No matches found
                  </div>
                )
              }
            </div>
          )
        }
      </div>
    </div>
  );
};

LocationAddressField.propTypes = {
  /** id for reference */
  id: PropTypes.string.isRequired,
  /** className for reference */
  className: PropTypes.string,
  /** label text for button */
  label: PropTypes.string.isRequired,
  /** path to the address object from the Fields names */
  fieldNamePath: PropTypes.string,
  /** the google maps object */
  google: PropTypes.object.isRequired,
  /** pass required to InputField for address */
  required: PropTypes.bool,
  // Make zip code a required field.
};

LocationAddressField.defaultProps = {
  className: '',
  fieldNamePath: 'address',
  required: true,
};

export default LocationAddressField;
