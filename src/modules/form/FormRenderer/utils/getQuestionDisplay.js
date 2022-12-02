import { get, map, find, join, compact } from 'lodash';
import dates from 'modules/utils/dates';

const getValueOptions = (question, value) => {
  const result = map(value, (val) => {
    const option = find(question.input_options, { id: val });
    return get(option, 'option_label', null);
  });
  return join(compact(result), ', ');
};

const getValueSingleOption = (question, value) => {
  const option = find(question.input_options, { id: value });
  return get(option, 'option_label', '');
};

const formatDuration = (value) => {
  const start = dates.formatDate(parseInt(value.start, 10));
  const end = dates.formatDate(parseInt(value.end, 10));
  return `${start} to ${end}`;
};

function getQuestionDisplay(question) {
  const value = get(question, 'response.response_value', null);
  if (!value) {
    return '';
  }
  switch (question.input_type) {
    case 'select':
    case 'checkbox':
      return getValueOptions(question, value);
    case 'radio':
      return getValueSingleOption(question, value);
    case 'date':
      return dates.formatDate(parseInt(value, 10));
    case 'duration':
      return formatDuration(value);
    default:
      return value.toString();
  }
}

export default getQuestionDisplay;
