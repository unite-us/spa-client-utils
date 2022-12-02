import { reduce, get, some, find, has, countBy } from 'lodash';

function getQuestionValue(id, allValues) {
  const value = find(allValues, val => has(val, id));
  return get(value, id, {});
}

function getCheckboxValidations(question = {}) {
  let validationList = reduce(question.validators, (acc, validator) => {
    if (get(validator, 'validation_type', '') === 'presence') {
      return [
        ...acc,
        (value, allValues) => {
          const questionValue = getQuestionValue(question.id, allValues);
          if (some(questionValue)) {
            return undefined;
          }
          return get(validator, 'message', 'Required');
        },
      ];
    }
    return acc;
  }, []);

  if (question.min_selections > 0) {
    validationList = [
      ...validationList,
      (value, allValues) => {
        const questionValue = getQuestionValue(question.id, allValues);
        const selections = countBy(questionValue);
        if (get(selections, 'true', 0) < question.min_selections) {
          return `At least ${question.min_selections} must be selected`;
        }
        return undefined;
      },
    ];
  }
  if (question.max_selections > 0) {
    validationList = [
      ...validationList,
      (value, allValues) => {
        const questionValue = getQuestionValue(question.id, allValues);
        const selections = countBy(questionValue);
        if (get(selections, 'true', 0) > question.max_selections) {
          return `At most ${question.max_selections} must be selected`;
        }
        return undefined;
      },
    ];
  }

  return validationList;
}

export default getCheckboxValidations;
