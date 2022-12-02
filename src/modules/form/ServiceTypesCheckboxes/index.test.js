import React from 'react';
import { shallow } from 'enzyme';
import serviceTypes from 'testUtils/serviceTypes.json';
import ServiceTypesCheckboxes from './index';

describe('ServiceTypesCheckboxes', () => {
  const field = {
    onChange: jest.fn(),
    value: '',
  };

  const props = {
    field,
    autoSelectChildren: true,
    autoSelectParent: true,
    id: 'program-service-types',
    inline: false,
    label: 'Service Type(s)',
    labelKey: 'name',
    valueKey: 'id',
    options: serviceTypes,
  };

  it('renders', () => {
    const comp = shallow(<ServiceTypesCheckboxes {...props} />);

    expect(comp.find('ServiceTypesCheckbox')).toHaveLength(21);
  });

  it('calls props onChange when onServiceTypeCheckboxChange is called', () => {
    const spy = jest.fn();
    const comp = shallow(<ServiceTypesCheckboxes {...props} onChange={spy} />);
    const checkbox = comp.find('ServiceTypesCheckbox').at(1);

    checkbox.simulate('change', checkbox.prop('item'), 0);

    expect(spy).toHaveBeenCalled();
  });

  it('calls field\'s onChange when onServiceTypeCheckboxChange is called', () => {
    const comp = shallow(<ServiceTypesCheckboxes {...props} />);
    const checkbox = comp.find('ServiceTypesCheckbox').at(1);

    checkbox.simulate('change', checkbox.prop('item'), 0);
    expect(field.onChange).toHaveBeenCalled();
  });
});
