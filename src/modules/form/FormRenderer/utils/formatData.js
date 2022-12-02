import {
  reduce,
  find,
  isArray,
  map,
  compact,
  isEmpty,
} from 'lodash';

function getValue(question, value = '') {
  // Values for hidden questions may be undefined. The default value given to
  // the input parameter (value = '') should cover that, but we'll check isEmpty
  // in case it comes in as null or an empty object.
  if (isEmpty(value) && typeof value !== 'number') {
    return '';
  }
  switch (question.input_type) {
    case 'select':
      if (isArray(value)) {
        return map(value, 'id');
      }
      return value.id;
    case 'checkbox':
      return compact(map(value, (val, id) => (val === true ? id : null)));
    case 'duration':
      return [value.start, value.end];
    default:
      return value.toString();
  }
}

function formatData(formData, values) {
  const formatedData = reduce(values, (accu, section, sectionId) => {
    const formSection = find(formData.sections, { id: sectionId });
    const sectionResponses = reduce(section, (acc, response, questionId) => {
      const formQuestion = find(formSection.questions, { id: questionId });
      if (!formQuestion) {
        return acc;
      }
      const value = getValue(formQuestion, response);
      if (isEmpty(value)) {
        return acc;
      }

      return [
        ...acc,
        {
          question_id: formQuestion.id,
          response_value: value,
        },
      ];
    }, []);
    return [
      ...accu,
      ...sectionResponses,
    ];
  }, []);

  return formatedData;
}

export default formatData;
