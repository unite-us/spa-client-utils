const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const emailValidation = (value) => {
  if (!value) {
    return undefined;
  }
  return !EMAIL_REGEX.test(value) ?
    'Should be a valid email' :
    undefined;
};

export default emailValidation;
