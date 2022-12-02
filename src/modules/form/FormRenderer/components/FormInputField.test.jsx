import React from 'react';
import { shallow } from 'enzyme';
import FormInputField from './FormInputField';

describe('FormInputField', () => {
  it('renders', () => {
    const props = {
      question: {
        id: 'question1',
        label_text: 'Question 1',
        help_text: '',
        placeholder_text: '',
        validators: null,
      },
    };

    const comp = shallow(<FormInputField {...props} />);
    expect(comp.find('Field')).toHaveLength(1);
  });
});
