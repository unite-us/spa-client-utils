import getInitialValues from './getInitialValues';

const formData = {
  id: 'form1',
  sections: [
    {
      id: 'section1',
      questions: [
        {
          id: 'question1',
          input_type: 'text',
          response: null,
        },
        {
          id: 'question2',
          input_type: 'text',
          response: { response_value: 'hello' },
        },
        {
          id: 'question3',
          input_type: 'select',
          response: { response_value: ['option1'] },
          min_selections: 0,
          max_selections: 0,
          input_options: [
            { id: 'option1', display_label: 'Option 1' },
            { id: 'option2', display_label: 'Option 2' },
          ],
        },
        {
          id: 'question4',
          input_type: 'select',
          response: { response_value: ['option1', 'option2'] },
          min_selections: 0,
          max_selections: 10,
          input_options: [
            { id: 'option1', display_label: 'Option 1' },
            { id: 'option2', display_label: 'Option 2' },
          ],
        },
        {
          id: 'question5',
          input_type: 'checkbox',
          response: { response_value: ['option1', 'option2'] },
          min_selections: 0,
          max_selections: 0,
          input_options: [
            { id: 'option1', display_label: 'Option 1' },
            { id: 'option2', display_label: 'Option 2' },
            { id: 'option3', display_label: 'Option 3' },
          ],
        },
      ],
    },
  ],
};

const expected = {
  section1: {
    question2: 'hello',
    question3: { id: 'option1', display_label: 'Option 1' },
    question4: [
      { id: 'option1', display_label: 'Option 1' },
      { id: 'option2', display_label: 'Option 2' },
    ],
    question5: {
      option1: true,
      option2: true,
    },
  },
};

describe('getInitialValues', () => {
  it('returns nothing for empty form', () => {
    expect(getInitialValues()).toEqual({});
  });

  it('returns the initial values', () => {
    expect(getInitialValues(formData)).toEqual(expected);
  });
});
