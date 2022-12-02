import React from 'react';
import { shallow } from 'enzyme';
import CheckBoxGroupField from './index';

describe('CheckBoxGroupField', () => {
  const props = {
    className: 'earhole',
    field: {
      option_1: { value: 'option_1', display_name: 'Option 1' },
      option_2: { value: 'option_2', display_name: 'Option 2' },
      option_3: { value: 'option_3', display_name: 'Option 3' },
    },
    hint: 'It is where you hear from',
    id: 'earhole-choices',
    label: 'Earhole Choices',
    labelKey: 'display_name',
    options: [
      { value: 'option_1', display_name: 'Option 1' },
      { value: 'option_2', display_name: 'Option 2' },
      { value: 'option_3', display_name: 'Option 3' },
    ],
    valueKey: 'value',
  };

  describe('renders', () => {
    it('a group of checkboxes in a fieldset element', () => {
      const comp = shallow(<CheckBoxGroupField {...props} />);

      expect(comp.find('legend'))
        .toHaveLength(1);
    });

    it('a required legend with the label as text', () => {
      const comp = shallow(<CheckBoxGroupField {...props} />);

      expect(comp.find('legend'))
        .toHaveLength(1);
      expect(comp.find('legend')
        .text())
        .toEqual(props.label);
    });

    it('a CheckBoxField for each option', () => {
      const comp = shallow(<CheckBoxGroupField {...props} />);

      expect(comp.find('CheckBoxField'))
        .toHaveLength(3);
    });

    it('a hint if hint is passed in', () => {
      const comp = shallow(<CheckBoxGroupField {...props} />);

      expect(comp.find('.ui-form-field__hint'))
        .toHaveLength(1);
      expect(comp.find('.ui-form-field__hint')
        .text())
        .toEqual(props.hint);
    });
  });

  it('does not render a hint if hint is not passed in', () => {
    const comp = shallow(<CheckBoxGroupField {...props} hint={null} />);

    expect(comp.find('.ui-form-field__hint'))
      .toHaveLength(0);
  });

  it('requires an id to be passed in and used on the fieldset', () => {
    const comp = shallow(<CheckBoxGroupField {...props} />);

    expect(comp.find('fieldset').prop('id')).toEqual('earhole-choices');
  });

  it('allows a class to be passed in and used on the fieldset', () => {
    const comp = shallow(<CheckBoxGroupField {...props} />);

    expect(comp.find('fieldset').prop('className').includes(props.className)).toBeTruthy();
  });

  it('allows a class to be passed into the CheckBoxField with checkBoxClassName', () => {
    const checkBoxClassName = 'earhole';
    const comp = shallow(<CheckBoxGroupField {...props} checkBoxClassName={checkBoxClassName} />);

    expect(comp.find('CheckBoxField').at(0).prop('className')).toEqual(checkBoxClassName);
  });

  it('allows disabled to be passed into the CheckBoxField with disabled prop', () => {
    const comp = shallow(<CheckBoxGroupField {...props} disabled />);

    expect(comp.find('CheckBoxField').at(0).prop('disabled')).toBeTruthy();
  });

  it('requires a valueKey that is used to find the field and send to the CheckBoxField as a value and display name', () => {
    const comp = shallow(<CheckBoxGroupField {...props} disabled />);

    expect(comp.find('CheckBoxField').at(0).prop('value')).toEqual(props.options[0].value);
    expect(comp.find('CheckBoxField').at(0).prop('display_name')).toEqual(props.options[0].display_name);
  });
});
