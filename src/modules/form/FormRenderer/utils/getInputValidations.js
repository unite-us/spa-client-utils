import {
  isNumber,
  isPositiveNumber,
  isEmail,
} from 'utils/validations/validations';
import { getValidations } from '../utils';

const amountValidations = [
  value => isNumber(value),
  value => isPositiveNumber(value),
];

function getInputValidations(type, validators) {
  if (type === 'number') {
    return [...getValidations(validators), ...amountValidations];
  }

  if (type === 'email') {
    return [...getValidations(validators), val => isEmail(val)];
  }

  return getValidations(validators);
}

export default getInputValidations;
