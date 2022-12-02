import { replace } from 'lodash';

const isLongerThan = (value = '', minLength) => (minLength <= value.length);

const phoneNumberValidation = (value) => {
  if (!value) {
    return undefined;
  }
  // If value is ONLY non-digits, it should fail validation.
  const digitsOnly = replace(value, /[^\d]/g, '');
  return !digitsOnly || !isLongerThan(digitsOnly, 10) ?
    'Must be at least 10 digits' :
    undefined;
};

export default phoneNumberValidation;
