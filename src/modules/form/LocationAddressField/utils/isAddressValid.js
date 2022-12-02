export default ({
  state: { input: { value: stateValue } },
  city: { input: { value: cityValue } },
} = {}) => Boolean((!stateValue || cityValue));
