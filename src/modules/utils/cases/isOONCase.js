import { get } from 'lodash';

function isOONCase(serviceCase = {}) {
  return get(serviceCase, 'program.out_of_network', false);
}

export default isOONCase;
