import React from 'react';
import { shallow } from 'enzyme';
import FormCheckboxField from './FormCheckboxField';

describe('FormCheckboxField', () => {
  it('renders', () => {
    const props = {
      question: {
        id: 'question1',
        label_text: 'Question 1',
        help_text: '',
        placeholder_text: '',
        validators: null,
        input_options: [
          { id: 'opt1', option_label: 'Option 1' },
          { id: 'opt2', option_label: 'Option 2' },
          { id: 'opt3', option_label: 'Option 3' },
        ],
      },
      section: {
        id: 'section1',
      },
    };

    const comp = shallow(<FormCheckboxField {...props} />);
    comp.instance().validate();
    expect(comp.find('Fields')).toHaveLength(1);
  });
});
