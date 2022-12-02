import getValidations from './getValidations';

describe('getValidations', () => {
  it('returns nothing when no validations', () => {
    expect(getValidations()).toEqual([]);
  });

  it('returns validations', () => {
    const validators = [
      {
        validation_type: 'presence',
        message: 'is required',
      },
      {
        validation_type: 'numericality',
        message: 'must be numeric',
        only_integer: true,
      },
      {
        validation_type: 'unhandeled validation',
      },
    ];

    expect(getValidations(validators)).toHaveLength(3);
  });

  it('returns validations for selects', () => {
    const question = {
      id: 'question1',
      input_type: 'select',
      min_selections: 2,
      max_selections: 10,
    };

    expect(getValidations([], question)).toHaveLength(2);
  });
});
