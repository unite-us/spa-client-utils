import React from 'react';
import { shallow } from 'enzyme';
import FormDateField from './FormDateField';

describe('FormDateField', () => {
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

    const comp = shallow(<FormDateField {...props} />);
    expect(comp.find('Field')).toHaveLength(1);
  });
});
