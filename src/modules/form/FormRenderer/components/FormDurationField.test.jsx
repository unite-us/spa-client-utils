import React from 'react';
import { shallow } from 'enzyme';
import FormDurationField from './FormDurationField';

describe('FormDurationField', () => {
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

    const comp = shallow(<FormDurationField {...props} />);
    comp.instance().validate();
    expect(comp.find('Fields')).toHaveLength(1);
  });
});
