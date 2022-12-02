import getInputValidations from './getInputValidations';

jest.mock('../../../utils/validations/validations', () => ({
  isEmail: () => 'email',
  isNumber: () => 'isNumber',
  isPositiveNumber: () => 'isPositiveNumber',
  isRequired: () => 'isRequired',
}));

describe('getInputValidations', () => {
  it('returns array of validators with email', () => {
    const result = getInputValidations('email', []);
    expect(result[0]()).toBe('email');
  });

  it('returns the array of validators with phone numbers', () => {
    const result = getInputValidations('number', []);
    expect(result[0]()).toBe('isNumber');
    expect(result[1]()).toBe('isPositiveNumber');
  });

  it('returns validations', () => {
    const validators = [
      {
        validation_type: 'presence',
        message: 'is required',
      },
    ];
    const result = getInputValidations('number', validators);
    expect(result[0]()).toBe('isRequired');
  });
});
