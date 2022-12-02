const requiredValidation = value =>
  (value || typeof value === 'number' ? undefined : 'Required');

export default requiredValidation;
