import _ from 'lodash';

const findOptionByValue = ({ option, value, valueKey }) => {
  const optionValue = _.get(option, valueKey);
  return _.isString(optionValue) ?
    // Case insensitive string comparison
    _.toLower(value) === _.toLower(optionValue) :
    // Object comparison
    _.isEqual(value, optionValue);
};

const moveOptionToEnd = ({ options, value = '', valueKey = 'value' }) => (
  _.compact([
    ..._.reject(options, option => findOptionByValue({ option, value, valueKey })),
    _.find(options, option => findOptionByValue({ option, value, valueKey })),
  ])
);

export default moveOptionToEnd;
