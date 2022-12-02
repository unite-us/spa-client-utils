import getQuestionDisplay from './getQuestionDisplay';

describe('getQuestionDisplay', () => {
  it('returns an empty string if to response', () => {
    const questionWithoutResponse = {
      response: null,
    };

    expect(getQuestionDisplay()).toBe('');
    expect(getQuestionDisplay(questionWithoutResponse)).toBe('');
  });

  it('return the response_value string', () => {
    const question = {
      response: { response_value: 'hello' },
    };
    expect(getQuestionDisplay(question)).toBe('hello');
  });

  it('return the response_value string for a select', () => {
    const question = {
      input_type: 'select',
      response: { response_value: ['opt1'] },
      input_options: [
        { id: 'opt1', option_label: 'Option 1' },
        { id: 'opt2', option_label: 'Option 2' },
        { id: 'opt3', option_label: 'Option 3' },
      ],
    };
    expect(getQuestionDisplay(question)).toBe('Option 1');
  });

  it('return the response string for a select multi', () => {
    const question = {
      input_type: 'select',
      response: { response_value: ['opt1', 'opt3'] },
      input_options: [
        { id: 'opt1', option_label: 'Option 1' },
        { id: 'opt2', option_label: 'Option 2' },
        { id: 'opt3', option_label: 'Option 3' },
      ],
    };
    expect(getQuestionDisplay(question)).toBe('Option 1, Option 3');
  });

  it('return the response string for a checkbox', () => {
    const question = {
      input_type: 'checkbox',
      response: { response_value: ['opt1', 'opt3'] },
      input_options: [
        { id: 'opt1', option_label: 'Option 1' },
        { id: 'opt2', option_label: 'Option 2' },
        { id: 'opt3', option_label: 'Option 3' },
      ],
    };
    expect(getQuestionDisplay(question)).toBe('Option 1, Option 3');
  });

  it('return the response string for a radio', () => {
    const question = {
      input_type: 'radio',
      response: { response_value: 'opt1' },
      input_options: [
        { id: 'opt1', option_label: 'Option 1' },
        { id: 'opt2', option_label: 'Option 2' },
        { id: 'opt3', option_label: 'Option 3' },
      ],
    };
    expect(getQuestionDisplay(question)).toBe('Option 1');
  });

  it('return the response string for a date', () => {
    const question = {
      input_type: 'date',
      response: { response_value: '1527638400' },
    };
    expect(getQuestionDisplay(question)).toBe('5/30/2018');
  });

  it('return the response string for a duration', () => {
    const question = {
      input_type: 'duration',
      response: { response_value: {
        start: '1527638400',
        end: '1527724800',
      } },
    };
    expect(getQuestionDisplay(question)).toBe('5/30/2018 to 5/31/2018');
  });
});
