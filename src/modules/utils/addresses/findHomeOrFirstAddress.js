import { find, first } from 'lodash';

function findHomeOrFirstAddress(addresses) {
  return find(addresses, { address_type: 'home' }) || first(addresses) || '';
}

export default findHomeOrFirstAddress;
