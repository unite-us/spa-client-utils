import { get, isEmpty } from 'lodash';
import getAddressString from './getAddressString';


function getFormattedLocations(locations) {
  if (isEmpty(locations)) {
    return [];
  }

  return locations.map((location) => {
    const latLng = {
      lat: get(location, 'attributes.latitude', ''),
      lng: get(location, 'attributes.longitude', ''),
    };

    return {
      address: getAddressString(location.attributes),
      id: get(location, 'id', ''),
      latLng,
    };
  });
}

export default getFormattedLocations;
