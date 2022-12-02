import getNumericalityValidations from './getNumericalityValidations';

describe('getNumericalityValidations', () => {
  it('return an array of validations', () => {
    const validator = {
      validation_type: 'numericality',
      only_integer: true,
      greater_than: 10,
      greater_than_or_equal_to: 11,
      equal_to: 15,
      not_equal_to: 16,
      less_than: 20,
      less_than_or_equal_to: 19,
    };

    expect(getNumericalityValidations(validator)).toHaveLength(7);
  });
  it('return an array of validations with not everything defined', () => {
    const validator = {
      validation_type: 'numericality',
      only_integer: false,
      message: 'numbers',
    };

    expect(getNumericalityValidations(validator)).toHaveLength(0);
  });
});
