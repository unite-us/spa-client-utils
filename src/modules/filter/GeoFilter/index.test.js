import React from 'react';
import { shallow } from 'enzyme';
import group from 'testUtils/group.json';
import GeoFilter, { addressOptions } from './index';

describe('GeoFilter', () => {
  it('renders', () => {
    const props = {
      currentUserGroup: group,
      filters: {
        address: {},
        setAddressType: {},
        distance: 'any',
      },
      label: 'Distance',
      onFiltersChange: jest.fn(),
      setGeoFilters: jest.fn(),
      google: {},
    };

    const comp = shallow(<GeoFilter {...props} />);

    expect(comp.find('.ui-filter-section__label').text()).toBe('Distance');
    expect(comp.find('SelectField')).toHaveLength(3);
  });

  it('calls the callbacks when distance changes', () => {
    const onFiltersChange = jest.fn();
    const setGeoFilters = jest.fn();
    const props = {
      currentUserGroup: group,
      filters: {
        address: '',
        setAddressType: '',
        distance: 'any',
      },
      label: 'Distance',
      onFiltersChange,
      setGeoFilters,
      google: {},
    };

    const address = {
      address: '10 Columbus Circle, New York, NY 10019',
      id: 'b3f5eb9d-4468-48a1-a572-c5a7306e6d3e',
      latLng: {
        lat: 40.7684141, lng: -73.9827037,
      },
    };

    const comp = shallow(<GeoFilter {...props} />);

    comp.instance().setDistance('10');
    const expected = { address: '', addressType: '', distance: '10', locationOptions: [address] };
    expect(onFiltersChange).toHaveBeenCalledWith(expected);
    expect(setGeoFilters).toHaveBeenCalledWith(expected);
  });

  it('calls the callbacks when address type changes', () => {
    const onFiltersChange = jest.fn();
    const setGeoFilters = jest.fn();
    const props = {
      currentUserGroup: group,
      filters: {
        address: {},
        setAddressType: {},
        distance: 'any',
      },
      label: 'Distance',
      onFiltersChange,
      setGeoFilters,
      google: {},
    };

    const comp = shallow(<GeoFilter {...props} />);
    const expectedAddress = {
      address: {
        address: '10 Columbus Circle, New York, NY 10019',
        id: 'b3f5eb9d-4468-48a1-a572-c5a7306e6d3e',
        latLng: {
          lat: 40.7684141, lng: -73.9827037,
        },
      },
      addressType: { value: 'ours' },
      distance: 'any',
    };

    const newExpectedAddress = {
      address: '',
      addressType: '',
      distance: 'any',
      locationOptions: [expectedAddress.address],
    };

    comp.instance().geoCode = jest.fn().mockImplementation(() => (expectedAddress));
    comp.update();
    comp.instance().setAddressType({ value: 'ours' });

    expect(onFiltersChange).toHaveBeenCalledWith(newExpectedAddress);
    expect(setGeoFilters).toHaveBeenCalledWith(newExpectedAddress);
  });

  it('sets Other in State if address is not ours or clients', () => {
    const onFiltersChange = jest.fn();
    const setGeoFilters = jest.fn();
    const address = {
      address: '10 Columbus Circle, New York, NY 10019',
      id: 'b3f5eb9d-4468-48a1-a572-c5a7306e6d3e',
      latLng: {
        lat: 40.7684141, lng: -73.9827037,
      },
    };

    const props = {
      currentUserGroup: group,
      filters: {
        address: {},
        setAddressType: {},
        distance: 'any',
      },
      label: 'Distance',
      onFiltersChange,
      setGeoFilters,
      google: {},
    };

    const comp = shallow(<GeoFilter {...props} />);
    comp.setState({
      address: { address: '65 north moore' },
      addressType: { label: 'Our Address', value: 'ours' },
      distance: '5',
    });

    comp.update();
    // make sure we are starting with our address Type in state.
    expect(comp.state('addressType')).toEqual({ label: 'Our Address', value: 'ours' });

    comp.instance().setAddress(address);

    const expectedAddress = {
      address,
      addressType: { label: 'Other', value: 'other' },
      distance: '5',
      locationOptions: [address],
    };
    expect(onFiltersChange).toHaveBeenCalledWith(expectedAddress);
    expect(setGeoFilters).toHaveBeenCalledWith(expectedAddress);
    expect(comp.state('addressType')).toEqual({ label: 'Other', value: 'other' });
  });

  it('sets State when multipleLocationsEnabled feature flag is true', () => {
    const providerLocations = [{
      attributes: {
        city: 'New York',
        country: 'United States',
        county: 'New York County',
        email_addresses: [],
        latitude: 40.7117094,
        line_1: '217 Broadway',
        longitude: -74.0086978,
        name: null,
        phone_numbers: [],
        postal_code: '10007',
        state: 'NY',
        id: 'location-id',
        relationships: {
          programs: { data: [{ id: 'program-id', type: 'program' }] },
          provider: { id: 'provider-id', type: 'provider' },
        },
      },
    }];

    const newProps = {
      currentUserGroup: group,
      filters: {
        address: {},
        setAddressType: {},
        distance: 'any',
      },
      label: 'Distance',
      onFiltersChange: jest.fn(),
      setGeoFilters: jest.fn(),
      providerFilterLocations: providerLocations,
      google: {},
      multipleLocationsEnabled: true,
    };

    const formattedLocations = [
      {
        address: '10 Columbus Circle, New York, NY 10019',
        id: 'b3f5eb9d-4468-48a1-a572-c5a7306e6d3e',
        latLng: { lat: 40.7684141, lng: -73.9827037 },
      },
      {
        address: '217 Broadway, New York, NY 10007',
        id: 'location-id',
        latLng: { lat: 40.7117094, lng: -74.0086978 },
      },
    ];

    const comp = shallow(<GeoFilter {...newProps} />);
    setTimeout(() => {
      expect(comp.state('locationOptions')).toEqual(formattedLocations);
    }, 50);
  });

  describe('addressOptions', () => {
    it('does not render client as an option when contact addresses dont exist', () => {
      const contact = { addresses: [] };
      const expected = [
        { label: 'Our Address', value: 'ours' },
        { label: 'Other', value: 'other' },
      ];
      expect(addressOptions(contact)).toEqual(expected);
    });

    it('does not render client as an option when contact addresses dont exist', () => {
      const contact = { addresses: [{ address: 'cool address' }] };
      const expected = [
        { label: 'Client Address', value: 'client' },
        { label: 'Our Address', value: 'ours' },
        { label: 'Other', value: 'other' },
      ];
      expect(addressOptions(contact)).toEqual(expected);
    });
  });
});
