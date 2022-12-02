import { uuPick, reduce } from 'lodash';
import validations from 'modules/utils/validations';

export default function getNumericalityValidations(validator) {
  const filteredValidators = uuPick(validator, [
    'only_integer',
    'greater_than',
    'greater_than_or_equal_to',
    'equal_to',
    'not_equal_to',
    'less_than',
    'less_than_or_equal_to',
  ]);

  const result = reduce(filteredValidators, (acc, arg, key) => {
    switch (key) {
      case 'only_integer': {
        if (!arg) {
          return acc;
        }
        return [
          ...acc,
          value => validations.isInteger(value, validator.message),
        ];
      }
      case 'equal_to':
        return [
          ...acc,
          value => validations.isEqual(parseFloat(value, 10), validator.message, arg),
        ];
      case 'not_equal_to':
        return [
          ...acc,
          value => validations.isDifferent(parseFloat(value, 10), validator.message, arg),
        ];
      case 'greater_than':
        return [
          ...acc,
          value => validations.isGreaterThan(parseFloat(value, 10), validator.message, arg),
        ];
      case 'less_than':
        return [
          ...acc,
          value => validations.isLessThan(parseFloat(value, 10), validator.message, arg),
        ];
      case 'greater_than_or_equal_to':
        return [
          ...acc,
          value => validations.isGreaterOrEqualThan(parseFloat(value, 10), validator.message, arg),
        ];
      case 'less_than_or_equal_to':
        return [
          ...acc,
          value => validations.isLessOrEqualThan(parseFloat(value, 10), validator.message, arg),
        ];
      default:
        return acc;
    }
  }, []);

  return result;
}
