import React from 'react';
import { shallow } from 'enzyme';
import FormRadioField from './FormRadioField';

describe('FormRadioField', () => {
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
    };

    const comp = shallow(<FormRadioField {...props} />);
    expect(comp.find('Field')).toHaveLength(1);
    expect(comp.state('options')).toHaveLength(3);
  });
});
