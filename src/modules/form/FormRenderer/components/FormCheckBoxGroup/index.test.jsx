import React from 'react';
import { shallow } from 'enzyme';
import FormCheckBoxGroup from './index';

describe('FormCheckBoxGroup', () => {
  it('renders redux-form 7 Checkboxes', () => {
    const onChange = jest.fn();
    const onBlur = jest.fn();
    const props = {
      id: 'test-1',
      className: 'checkbox-group-class',
      checkBoxClassName: 'sugar',
      hint: 'sugar this',
      checkBoxFieldHint: 'sugar that',
      names: ['word.one', 'word.two'],
      options: [
        {
          label: 'One',
          value: 'word.one',
        },
        {
          label: 'Two',
          value: 'word.two',
          disabled: true,
        },
      ],
      word: {
        one: {
          input: {
            name: 'one',
            checked: true,
            onChange,
            onBlur,
          },
          meta: {
            error: undefined,
            invalid: false,
            valid: true,
            touched: true,
          },
        },
        two: {
          input: {
            name: 'two',
            checked: false,
            onChange,
            onBlur,
          },
          meta: {
            error: undefined,
            invalid: false,
            valid: true,
            touched: true,
          },
        },
      },
      label: 'Test 1',
    };

    const comp = shallow(<FormCheckBoxGroup {...props} />);

    expect(comp.find('.ui-form-checkbox-group')).toHaveLength(1);
    expect(comp.find('CheckBoxField')).toHaveLength(2);
  });

  it('renders redux-form 5 Checkboxes', () => {
    const onChange = jest.fn();
    const onBlur = jest.fn();
    const props = {
      id: 'test-2',
      className: 'checkbox-group-class',
      names: ['word.one', 'word.two'],
      options: [
        {
          label: 'One',
          value: 'word.one',
        },
        {
          label: 'Two',
          value: 'word.two',
        },
      ],
      fields: {
        one: {
          name: 'one',
          checked: true,
          onChange,
          onBlur,
        },

        two: {
          name: 'two',
          checked: true,
          onChange,
          onBlur,
        },
      },
      label: 'Test 2',
    };

    const comp = shallow(<FormCheckBoxGroup {...props} />);

    expect(comp.find('.ui-form-checkbox-group')).toHaveLength(1);
    expect(comp.find('CheckBoxField')).toHaveLength(2);
  });
});
