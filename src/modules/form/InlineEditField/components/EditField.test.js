import React from 'react';
import { mount } from 'enzyme';
import { InputField } from '@unite-us/ui';
import EditField from './EditField';

describe('EditField', () => {
  it('renders', () => {
    const props = {
      FieldComponent: InputField,
      fieldProps: {},
      isSaving: false,
      label: 'label 1',
      value: 'value 1',
      id: 'id1',
      onCancelEdit: jest.fn(),
      onChange: jest.fn(),
      onBlur: jest.fn(),
      onSaveEdit: jest.fn(),
      fieldMeta: {},
      setFieldRef: jest.fn(),
    };

    const comp = mount(<EditField {...props} />);

    expect(comp.find('InputField')).toHaveLength(1);
    expect(comp.find('Icon')).toHaveLength(2);
  });
});
