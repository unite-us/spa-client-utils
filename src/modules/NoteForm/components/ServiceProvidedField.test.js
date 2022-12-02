import React from 'react';
import { shallow } from 'enzyme';
import ServiceProvidedField from './ServiceProvidedField';

const props = {
  change: jest.fn(),
  note: '',
  unitOptions: [],
  validations: [],
};

describe('ServiceProvidedField', () => {
  afterEach(() => {
    props.change.mockClear();
  });

  it('renders', () => {
    const wrapper = shallow(<ServiceProvidedField {...props} />);
    const section = wrapper.find('FormSection');

    expect(wrapper.find('.ui-service-provided-field')).toHaveLength(1);
    expect(section.find('FormSection')).toHaveLength(1);
    expect(section.prop('name')).toEqual('provided_service');
  });

  it('renders Service Provided fields', () => {
    const wrapper = shallow(<ServiceProvidedField {...props} />);
    const formFields = wrapper.find('Field');

    expect(formFields).toHaveLength(3);
    expect(formFields.at(0).prop('name')).toEqual('type');
    expect(formFields.at(1).prop('name')).toEqual('amount');
    expect(formFields.at(2).prop('name')).toEqual('unit');
  });
});
