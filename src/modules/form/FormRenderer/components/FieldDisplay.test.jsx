import React from 'react';
import { shallow } from 'enzyme';
import FieldDisplay from './FieldDisplay';

describe('FieldDisplay', () => {
  it('renders', () => {
    const props = {
      question: {
        id: 'q1',
        input_type: 'text',
        label_text: 'Question 1',
        response: { response_value: 'hello' },
      },
      hiddenFields: [],
    };
    const comp = shallow(<FieldDisplay {...props} />);

    expect(comp.find('.ui-form-renderer-question-display__label').text()).toBe('Question 1');
    expect(comp.find('.ui-form-renderer-question-display__value').text()).toBe('hello');
  });

  it('returns null for hidden fields', () => {
    const props = {
      question: {
        id: 'q1',
        input_type: 'text',
        label_text: 'Question 1',
        response: { response_value: 'hello' },
      },
      hiddenFields: ['q1'],
    };
    const comp = shallow(<FieldDisplay {...props} />);

    expect(comp.text()).toBe('');
  });
});
