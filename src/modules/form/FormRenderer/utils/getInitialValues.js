import { reduce, isEmpty, find } from 'lodash';

const getSelectInitialValues = (question) => {
  const selectedOptions = reduce(question.response.response_value,
    (acc, optionId) =>
      [...acc, find(question.input_options, { id: optionId })]
    , []);
  if (question.min_selections <= 1 && question.max_selections <= 1) {
    return selectedOptions[0];
  }
  return selectedOptions;
};

const getCheckboxInitialValues = (question) => {
  const values = reduce(question.response.response_value,
    (acc, value) => ({ ...acc, [value]: true })
    , {});
  return values;
};

const getResponse = (question) => {
  switch (question.input_type) {
    case 'select':
      return getSelectInitialValues(question);
    case 'checkbox':
      return getCheckboxInitialValues(question);
    default:
      return question.response.response_value;
  }
};

const getInitialValues = (form = {}) => {
  const values = reduce(form.sections, (acc, section) => {
    const questionValues = reduce(section.questions, (accu, question) => {
      if (isEmpty(question.response)) {
        return accu;
      }
      const response = getResponse(question);

      return {
        ...accu,
        ...{ [question.id]: response },
      };
    }, {});
    return {
      ...acc,
      ...{ [section.id]: questionValues },
    };
  }, {});

  return values;
};

export default getInitialValues;
