import formatData from './formatData';

const formData = {
  id: 'form1',
  sections: [
    {
      id: 'section1',
      questions: [
        {
          id: 'question1',
          input_type: 'text',
        },
        {
          id: 'question2',
          input_type: 'text',
        },
        {
          id: 'question3',
          input_type: 'select',
        },
        {
          id: 'question4',
          input_type: 'select',
        },
        {
          id: 'question5',
          input_type: 'checkbox',
        },
        {
          id: 'question6',
          input_type: 'duration',
        },
        {
          id: 'question7',
          input_type: 'number',
        },
      ],
    },
  ],
};

const values = {
  section1: {
    question1: 'hello',
    question2: 123123,
    question3: { id: 'option1', option_label: 'Option 1' },
    question4: [
      { id: 'option1', option_label: 'Option 1' },
      { id: 'option2', option_label: 'Option 2' },
    ],
    question5: {
      option1: true,
      option2: true,
      option3: false,
    },
    question6: {
      start: '88888',
      end: '99999',
    },
    question7: 5,
  },
};

const expected = [
  { question_id: 'question1', response_value: 'hello' },
  { question_id: 'question2', response_value: '123123' },
  { question_id: 'question3', response_value: 'option1' },
  { question_id: 'question4', response_value: ['option1', 'option2'] },
  { question_id: 'question5', response_value: ['option1', 'option2'] },
  { question_id: 'question6', response_value: ['88888', '99999'] },
  { question_id: 'question7', response_value: '5' },
];

describe('formatData', () => {
  it('works with empty values', () => {
    expect(formatData()).toEqual([]);
  });
  it('returns the right responses', () => {
    expect(formatData(formData, values)).toEqual(expected);
  });
  it('handles individual undefined values of each type (without errors)', () => {
    // Pass question values as undefined
    const section1 = {
      question3: {},
    };
    expect(formatData(formData, { section1 })).toEqual([]);
  });
});
