import _ from 'lodash';

export function isRequired(value, message = 'Required') {
  if (_.isUndefined(value) ||
    _.isNull(value) ||
    value === '' ||
    (_.isArray(value) && _.isEmpty(value)) ||
    (_.isObject(value) && value instanceof FileList && value.length <= 0) ||
    (_.isObject(value) && !(value instanceof FileList) && !_.some(_.values(value), v => v))
  ) {
    return message;
  }
  return null;
}

export function isEmail(value, message = 'Should be a valid email address') {
  /* eslint-disable */
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  /* eslint-enable */
  if (value && !re.test(value)) {
    return message;
  }
  return null;
}

export function isUrl(value, message = 'Should be a valid url') {
  const re = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

  if (value && !re.test(value)) {
    return message;
  }
  return null;
}

export function containsUppercase(value, message = 'Should contain at least one uppercase letter') {
  const regex = /[A-Z]/g;
  if (value && !regex.test(value)) {
    return message;
  }
  return null;
}

export function containsLowercase(value, message = 'Should contain at least one lowercase letter') {
  const regex = /[a-z]/g;
  if (value && !regex.test(value)) {
    return message;
  }
  return null;
}

export function containsDigit(value, message = 'Should contain at least one digit') {
  const regex = /\d/g;
  if (value && !regex.test(value)) {
    return message;
  }
  return null;
}

export function containsSpecialChars(value, message = 'Should contain at least one special character') {
  const regex = /[^a-zA-Z\d\s:]+/g;
  if (value && !regex.test(value)) {
    return message;
  }
  return null;
}

export function isEqual(value, message, args) {
  if (value !== args) {
    return message || 'This should be '.concat(args);
  }
  return null;
}

export function isDifferent(value, message, args) {
  if (value && value === args) {
    return message || 'This should not be '.concat(args);
  }
  return null;
}

export function isLongerThan(value, message, args) {
  if (value && value.length < args) {
    return message || `Should be longer than ${args} chars.`;
  }
  return null;
}

export function isShorterThan(value, message, args) {
  if (value && value.length > args) {
    return message || `Should be shorter than ${args} chars.`;
  }
  return null;
}

export function isNumber(value, message = 'Should be a number') {
  const reg = /^[+-]?\d+(\.\d+)?$/;
  if (value && !reg.test(value)) {
    return message;
  }
  return null;
}

export function isInteger(value, message) {
  if (value && !_.isInteger(parseFloat(value, 10))) {
    return message || 'Should be an integer number';
  }
  return null;
}

export function includes(value, message, args) {
  let collection = args;
  if (_.isString(args)) {
    collection = _.map(args.split(','), item => _.trim(item));
  }
  collection = _.map(collection, item => _.toLower(item));
  if (_.indexOf(collection, _.toLower(value)) < 0) {
    return message || `Should be one of: ${collection.join(', ')}`;
  }
  return null;
}

export function excludes(value, message, args) {
  let collection = args;
  if (_.isString(args)) {
    collection = _.map(args.split(','), item => _.trim(item));
  }
  collection = _.map(collection, item => _.toLower(item));
  if (_.indexOf(collection, _.toLower(value)) >= 0) {
    return message || `Should not be one of: ${collection.join(', ')}`;
  }
  return null;
}

export function hasAtLeastOne(value, message = 'At least one must be selected') {
  if (!value || value.length < 1) {
    return message;
  }
  return null;
}

export function hasAtLeastN(value, message, number) {
  if (!value || value.length < number) {
    return message || `At least ${number} must be selected`;
  }
  return null;
}

export function hasAtMostN(value, message, number) {
  if (value && value.length > number) {
    return message || `At most ${number} must be selected`;
  }
  return null;
}

export function isPhoneNumber(value, message = 'Must be at least 10 digits') {
  if (!value) {
    return null;
  }
  const filtered = _.replace(value, /[^\d]/g, '');
  // If value is ONLY non-digits, it should fail validation.
  return !filtered ? message : isLongerThan(filtered, message, 10);
}

export function isGreaterThan(value, message, args) {
  if ((value || value === 0) && value <= args) {
    return message || `Should be greater than ${args}`;
  }
  return null;
}

export function isLessThan(value, message, args) {
  if ((value || value === 0) && value >= args) {
    return message || `Should be less than ${args}`;
  }
  return null;
}

export function isGreaterOrEqualThan(value, message, args) {
  if ((value || value === 0) && value < args) {
    return message || `Should be greater than or equal to ${args}`;
  }
  return null;
}

export function isLessOrEqualThan(value, message, args) {
  if ((value || value === 0) && value > args) {
    return message || `Should be less than or equal to ${args}`;
  }
  return null;
}

export function isPositiveNumber(value, message) {
  return isGreaterOrEqualThan(value, message, 0);
}

export function isFieldRequired(validations) {
  if (_.isFunction(validations) && _.isEqual(validations, isRequired)) {
    return true;
  }
  if (_.isObject(validations) && _.isEqual(_.get(validations, 'func', null), isRequired)) {
    return true;
  }
  if (_.isArray(validations)) {
    return _.reduce(validations, (acc, v) => {
      if (_.isEqual(_.get(v, 'func', null), isRequired)) {
        return true;
      }
      return acc;
    }, false);
  }
  return false;
}

export function isValidUUID(value) {
  const regexValidUUID = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexValidUUID.test(value) ? false : 'Should be a valid UUID';
}
