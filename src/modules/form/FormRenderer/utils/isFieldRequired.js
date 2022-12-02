import { some } from 'lodash';

const isFieldRequired = validators =>
  some(validators, { validation_type: 'presence' });

export default isFieldRequired;
