import { map, compact } from 'lodash';
import getCheckboxValidations from './getCheckboxValidations';

describe('getCheckboxValidations', () => {
  it('return nothing if no validation', () => {
    const question = {
      id: 'question1',
      input_type: 'checkbox',
      validators: null,
      min_selections: 0,
      max_selections: 0,
    };

    expect(getCheckboxValidations(question)).toHaveLength(0);
    expect(getCheckboxValidations()).toHaveLength(0);
  });

  it('returns the validations', () => {
    const question = {
      id: 'question1',
      input_type: 'checkbox',
      validators: [
        { validation_type: 'presence', message: 'is required' },
      ],
      min_selections: 2,
      max_selections: 10,
    };

    const allValues = {
      section1: {
        question1: {
          option1: true,
        },
      },
    };

    const validations = getCheckboxValidations(question);
    expect(validations).toHaveLength(3);

    const errors = map(validations, validation =>
      validation(null, allValues),
    );
    expect(compact(errors)).toHaveLength(1);
  });
});
