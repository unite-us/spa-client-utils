import { reduce, noop } from 'lodash';
import validations from 'utils/validations';
import getNumericalityValidations from './getNumericalityValidations';

const typeToFunc = (validator) => {
  switch (validator.validation_type) {
    case 'presence':
      return [value => validations.isRequired(value, validator.message)];
    case 'numericality':
      return getNumericalityValidations(validator);
    default:
      return [noop];
  }
};

const getValidations = (validators, question = {}) => {
  let validationList = reduce(validators, (acc, validator) =>
    [
      ...acc,
      ...typeToFunc(validator),
    ], []);

  if (question.input_type === 'select') {
    if (question.min_selections > 0) {
      validationList = [
        ...validationList,
        (value, allValues) => validations.hasAtLeastN(value, null, question.min_selections, allValues),
      ];
    }
    if (question.max_selections > 0) {
      validationList = [
        ...validationList,
        (value, allValues) => validations.hasAtMostN(value, null, question.max_selections, allValues),
      ];
    }
  }

  return validationList;
};

export default getValidations;
