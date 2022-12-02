import conditionalDisplay from './conditionalDisplay';

const formData = {
  id: 'form1',
  sections: [
    {
      id: 'section1',
      questions: [
        {
          id: 'question1',
          conditional_display: null,
        },
        {
          id: 'question2',
          conditional_display: {
            show_or_hide: 'show',
            and_conditions: [
              {
                operator: 'is',
                operator_value: 'show q1 and q4',
                question_id: 'question1',
              },
            ],
            or_conditions: [],
          },
        },
        {
          id: 'question3',
          input_type: 'select',
          conditional_display: {
            show_or_hide: 'hide',
            and_conditions: [
              {
                operator: 'is',
                operator_value: 'hide q3',
                question_id: 'question1',
              },
            ],
            or_conditions: [],
          },
        },
        {
          id: 'question4',
          conditional_display: {
            show_or_hide: 'show',
            and_conditions: [],
            or_conditions: [
              {
                operator: '=',
                operator_value: 'show q1 and q4',
                question_id: 'question1',
              },
              {
                operator: 'is_not_blank',
                operator_value: 'show q4',
                question_id: 'question3',
              },
            ],
          },
        },
      ],
    },
  ],
};

describe('conditionalDisplay', () => {
  it('returns an empty array if no form', () => {
    expect(conditionalDisplay()).toEqual([]);
  });
  it('returns hidden questions for empty value', () => {
    const values = {
      section1: {
        question1: '',
      },
    };
    const expected = ['question2', 'question4'];
    expect(conditionalDisplay(formData, values)).toEqual(expected);
  });

  it('returns hidden questions for empty value and include empty and boolean conditional_display', () => {
    const values = {
      section1: {
        question1: '',
      },
    };

    const newFormData = {
      ...formData,
      id: 'form1',
      sections: [...formData.sections, { id: 'question4', conditional_display: {} }],
    };

    const expected = ['question2', 'question4'];
    expect(conditionalDisplay(newFormData, values)).toEqual(expected);
  });

  it('returns hidden questions for value show q1 and q4', () => {
    const values = {
      section1: {
        question1: 'show q1 and q4',
      },
    };
    const expected = [];
    expect(conditionalDisplay(formData, values)).toEqual(expected);
  });
  it('returns hidden questions for value hide q3', () => {
    const values = {
      section1: {
        question1: 'hide q3',
      },
    };
    const expected = ['question2', 'question3', 'question4'];
    expect(conditionalDisplay(formData, values)).toEqual(expected);
  });
  it('returns hidden questions for value show q4', () => {
    const values = {
      section1: {
        question3: {
          id: '1',
          option_label: 'show q4',
        },
      },
    };
    const expected = ['question2'];
    expect(conditionalDisplay(formData, values)).toEqual(expected);
  });
});
