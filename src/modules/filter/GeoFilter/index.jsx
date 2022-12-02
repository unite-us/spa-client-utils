import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';
import { SelectField } from '@unite-us/ui';
import addresses from 'modules/utils/addresses';
import { DISTANCE_OPTIONS, ADDRESS_TYPES } from './constants';

export const addressOptions = contact => [
  ...(contact && _.get(contact, 'addresses[0]', null) ? [{ label: 'Client Address', value: 'client' }] : []),
  { label: 'Our Address', value: 'ours' },
  { label: 'Other', value: 'other' },
];

const getAddressOptions = (results) => {
  const options = _.map(results, result => ({
    address: result.formatted_address,
    id: result.place_id,
    latLng: {
      lat: result.geometry.location.lat(),
      lng: result.geometry.location.lng(),
    },
  }));

  return options;
};

const getAddressFromType = (type, groupAddress, contactAddress) => {
  switch (type) {
    case ADDRESS_TYPES.ours:
      return addresses.getFormattedAddress(groupAddress);
    case ADDRESS_TYPES.client:
      return addresses.getFormattedAddress(contactAddress);
    default:
      return '';
  }
};

class GeoFilter extends Component {
  constructor(props) {
    super(props);

    this.applyFilters = this.applyFilters.bind(this);
    this.setAddress = this.setAddress.bind(this);
    this.setAddressSelect = this.setAddressSelect.bind(this);
    this.setAddressType = this.setAddressType.bind(this);
    this.setDistance = this.setDistance.bind(this);
    this.geoCode = this.geoCode.bind(this);
    this.getGeoCodeOptions = this.getGeoCodeOptions.bind(this);
    this.getDebouncedGeoCodeOptions = _.debounce(this.getGeoCodeOptions, 400);
    this.setOptions = this.setOptions.bind(this);

    const {
      filters,
      currentUserGroup,
      contact,
      multipleLocationsEnabled,
      providerFilterLocations,
    } = props;

    const contactAddress = addresses.findHomeOrFirstAddress(_.get(contact, 'addresses', []));
    const groupAddress = _.get(currentUserGroup, 'addresses[0]');

    const address = !_.isEmpty(filters.address) ?
      filters.address :
      getAddressFromType(filters.addressType, groupAddress, contactAddress);

    let locationOptions = [addresses.getFormattedAddress(groupAddress)];
    if (multipleLocationsEnabled) {
      const formattedLocations = [...locationOptions, ...addresses.getFormattedLocations(providerFilterLocations)];
      locationOptions = _.uniqBy(formattedLocations, 'address');
    }

    this.state = {
      address,
      addressType: filters.addressType || '',
      distance: filters.distance || 'any',
      locationOptions,
    };
  }

  componentDidMount() {
    const { address, addressType } = this.state;
    // Force a geocode if we're dealing with a client address. Sometimes
    // client addresses do not have a lat/long already associated w/ the data.
    if (addressType === ADDRESS_TYPES.client || ADDRESS_TYPES.ours) {
      this.geoCode({ address, addressType });
    }
    this.setAddressSelect(address);
    this.applyFilters();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const incomingFilters = {
      address: nextProps.filters.address,
      addressType: nextProps.filters.addressType,
      distance: nextProps.filters.distance || 'any',
    };

    if (!_.isEqual(this.state.address, nextProps.filters.address)) {
      const newAddress = nextProps.filters.address;

      this.setAddressSelect(newAddress);
    }

    if (!_.isEqual(this.props, nextProps)
      && !_.isEqual(incomingFilters, this.state)
      && !_.isEmpty(incomingFilters)) {
      this.setState({
        ...incomingFilters,
      }, () => this.applyFilters());
    }
  }

  setAddressSelect(address) {
    const { multipleLocationsEnabled, contact } = this.props;
    const { addressType, locationOptions } = this.state;

    if (this.addressSelectField) {
      const clientAddressData = addresses.findHomeOrFirstAddress(_.get(contact, 'addresses', []));
      const clientAddress = addresses.getFormattedAddress(clientAddressData);
      const type = addressType.value ? addressType.value : addressType;

      let options;
      if (type === ADDRESS_TYPES.client) {
        options = [clientAddress];
      } else if (type === ADDRESS_TYPES.ours) {
        options = locationOptions;
      } else {
        options = [address];
      }

      this.addressSelectField.setOptions({ options: multipleLocationsEnabled ? options : [address], replace: true });
      this.addressSelectField.setValue(address);
    }
  }

  setDistance(value) {
    this.setState({
      distance: value,
    }, () => this.applyFilters());
  }

  setAddressType(addressType) {
    const { currentUserGroup, contact } = this.props;
    const contactAddress = addresses.findHomeOrFirstAddress(_.get(contact, 'addresses', []));
    const groupAddress = _.get(currentUserGroup, 'addresses[0]');
    const type = addressType.value;

    const address = getAddressFromType(type, groupAddress, contactAddress);

    if (this.addressSelectField) {
      this.setAddressSelect(address);
    }

    if ((type === ADDRESS_TYPES.client && contactAddress && !_.isEmpty(address)) ||
    (type === ADDRESS_TYPES.ours && !_.isEmpty(address))) {
      this.geoCode({ address, addressType });
    } else {
      this.setState({
        address,
        addressType,
      }, () => this.applyFilters());
    }
  }

  setAddress(address = {}) {
    const { currentUserGroup, contact, multipleLocationsEnabled } = this.props;
    const clientAddress = addresses.findHomeOrFirstAddress(_.get(contact, 'addresses', []));
    const groupAddress = _.get(currentUserGroup, 'addresses[0]');
    const groupClientLocations = _.without([addresses.getFormattedAddress(clientAddress), ...this.state.locationOptions], '');
    const notGroupOrClientAddress = multipleLocationsEnabled ? !groupClientLocations.map(l => l.latLng).includes(address.latLng) :
      (address.address !== addresses.getAddressString(groupAddress) || address !== addresses.getAddressString(clientAddress));

    this.setState({
      address,
      addressType: notGroupOrClientAddress ? { label: 'Other', value: 'other' } : this.state.addressType,
    }, () => this.applyFilters());
  }

  getGeoCodeOptions(address, callback) {
    if (address.length > 3) {
      const { google } = this.props;
      const geoCoder = new google.maps.Geocoder();
      geoCoder.geocode({ address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const options = getAddressOptions(results);
          callback({ options });
        } else {
          /* eslint-disable-next-line no-console */
          console.warn(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    } else {
      callback({ options: [] });
    }
  }

  setOptions() {
    const { address, addressType, contact, locationOptions } = this.state;
    const contactAddress = addresses.findHomeOrFirstAddress(_.get(contact, 'addresses', []));
    const type = addressType.value ? addressType.value : addressType;
    let options;

    if (type === ADDRESS_TYPES.client) {
      options = [contactAddress];
    } else if (type === ADDRESS_TYPES.ours) {
      options = locationOptions;
    } else {
      options = [address];
    }
    return options;
  }

  applyFilters() {
    this.props.onFiltersChange(this.state);
    this.props.setGeoFilters(this.state);
  }

  geoCode({ address = {}, addressType = '' }) {
    if (!_.isEmpty(address)) {
      const { google } = this.props;
      const geoCoder = new google.maps.Geocoder();

      geoCoder.geocode({ address: address.address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && !_.isEmpty(results)) {
          const addressWithUSA = results[0].formatted_address;
          const geoCodedAddress = {
            address: addressWithUSA.slice(0, addressWithUSA.length - 5),
            id: !_.isEmpty(address.id) ? address.id : results[0].place_id,
            latLng: {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            },
          };
          this.setState({
            address: geoCodedAddress,
            addressType,
          }, () => this.applyFilters());
        } else {
          this.setState({
            address: '',
            addressType,
          }, () => this.applyFilters());
          /* eslint-disable-next-line no-console */
          console.warn(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    }
  }

  render() {
    const {
      contact,
      label,
    } = this.props;

    const { distance, addressType, locationOptions } = this.state;
    const type = addressType.value ? addressType.value : addressType;

    return (
      <div className="ui-filter-section ui-geo-filter">
        <h5 className="ui-filter-section__label">{label}</h5>
        <SelectField
          id="ui-distance-filter"
          className="ui-geo-filter__distance-select ui-geo-filter__filter"
          label="Distance Select"
          field={{
            onBlur: _.noop,
            onChange: this.setDistance,
            value: distance,
          }}
          options={DISTANCE_OPTIONS}
          placeholder="Distance"
          searchEnabled={false}
          shouldSort={false}
          hideLabel
        />

        <SelectField
          className="ui-geo-filter__address-type-select ui-geo-filter__filter"
          field={{
            onBlur: _.noop,
            onChange: this.setAddressType,
            value: addressType,
          }}
          forceObjectValue
          hideLabel
          id="uiaddress-type-filter"
          label="Address Type Select"
          placeholder="Address Type"
          options={addressOptions(contact)}
          searchEnabled={false}
          shouldSort={false}
        />

        <SelectField
          className="ui-geo-filter__address-select ui-geo-filter__filter"
          field={{
            onBlur: _.noop,
            onChange: this.setAddress,
          }}
          filterOptions={options => options}
          options={type === ADDRESS_TYPES.ours ? locationOptions : this.setOptions}
          hideLabel
          id="ui-searched-addresses-filter"
          label="Address"
          labelKey="address"
          loadOptions={type === ADDRESS_TYPES.other ? this.getDebouncedGeoCodeOptions : null}
          name="search-addresses"
          placeholder="Search for an Address"
          ref={(c) => { this.addressSelectField = c; }}
          valueKey="id"
        />

      </div>
    );
  }
}

GeoFilter.propTypes = {
  /** optional contact object */
  contact: PropTypes.object,
  /** current group from the session */
  currentUserGroup: PropTypes.object.isRequired,
  /** current filters */
  filters: PropTypes.shape({
    address: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    addressType: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    distance: PropTypes.string,
  }).isRequired,
  /** label for the filter section */
  label: PropTypes.string.isRequired,
  /**
   * @param {object} activeFilters object of selected filters
   * @public
  */
  multipleLocationsEnabled: PropTypes.bool,
  onFiltersChange: PropTypes.func.isRequired,
  /**
   * @param {object} activeFilters object of selected filters
   * @public
  */
  providerFilterLocations: PropTypes.array,
  setGeoFilters: PropTypes.func,
  /** the google maps api object */
  google: PropTypes.object.isRequired,
};

GeoFilter.defaultProps = {
  contact: {},
  multipleLocationsEnabled: false,
  providerFilterLocations: [],
  setGeoFilters: _.noop,
};

export default GeoFilter;
