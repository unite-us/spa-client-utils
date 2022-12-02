import React from 'react';
import { shallow } from 'enzyme';
import LocationAddressField from './index';

describe('LocationAddressField', () => {
  const props = {
    id: 'field1',
    label: 'Address Field',
    fieldNamePath: 'address',
    google: {
      maps: {},
    },
    address: {},
    required: true,
  };

  beforeEach(() => {
    [
      'line_1',
      'city',
      'county',
      'state',
      'postal_code',
      'country',
      'latitude',
      'longitude',
    ].forEach((fieldName) => {
      props.address[fieldName] = { input: { value: '' } };
    });
  });

  it('renders', () => {
    const comp = shallow(<LocationAddressField {...props} />);
    expect(comp.find('InputField')).toHaveLength(1);
    expect(comp.find('#field1-address-field')).toHaveLength(1);
  });

  it('input is valid if neither city nor state are set', () => {
    const comp = shallow(<LocationAddressField {...props} />);
    const input = comp.find('InputField').at(0);
    expect(input.prop('valid')).toEqual(true);
    expect(input.prop('invalid')).toEqual(false);
  });

  it('input is valid if city and state are set', () => {
    props.address.city.input.value = 'valid';
    props.address.state.input.value = 'valid';
    const comp = shallow(<LocationAddressField {...props} />);
    const input = comp.find('InputField').at(0);
    expect(input.prop('valid')).toEqual(true);
    expect(input.prop('invalid')).toEqual(false);
  });
});
