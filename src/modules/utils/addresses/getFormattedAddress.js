import { first, get, isEmpty, last } from 'lodash';
import getAddressString from './getAddressString';

function getFormattedAddress(address) {
  if (isEmpty(address)) {
    return '';
  }

  const latLngArray = get(address, 'lat_lng', []);

  const latLng = !isEmpty(latLngArray) ? {
    latLng: {
      lat: first(latLngArray),
      lng: last(latLngArray),
    },
  } : {};

  return {
    address: getAddressString(address),
    id: address.id,
    ...latLng,
  };
}

export default getFormattedAddress;
