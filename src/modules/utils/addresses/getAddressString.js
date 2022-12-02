import {
  get,
  isEmpty,
  join,
  trim,
  compact,
} from 'lodash';

const getAddressString = (address) => {
  if (isEmpty(address)) {
    return '';
  }

  const street = trim(`${get(address, 'line_1') || ''} ${get(address, 'line_2') || ''}`);
  const city = trim(get(address, 'city') || '');
  const stateAndZip = trim(`${get(address, 'state') || ''} ${get(address, 'postal_code') || ''}`);

  const addressParts = compact([street, city, stateAndZip]);
  return isEmpty(addressParts) ? '' : join(addressParts, ', ');
};

export default getAddressString;
