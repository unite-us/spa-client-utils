function maskValidation(value, message, args) {
  if (!args) {
    return null;
  }
  const reg = new RegExp(args);
  if (value && !reg.test(value)) {
    return message || `Should match the format /${args}/`;
  }
  return null;
}

export default maskValidation;
