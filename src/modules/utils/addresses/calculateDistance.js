import addresses from 'modules/utils/addresses';
import getLatLng from './getLatLng';

export default function calculateDistance(locationObj = {}, origin = {}) {
  const location = locationObj.attributes ? locationObj.attributes : locationObj;
  const latLng = getLatLng(location);
  const distance = addresses.getDistanceInMiles(origin, latLng) || '0 miles';
  const addressString = addresses.getAddressString(location);
  const distanceVal = distance.split(' ')[0];
  const name = location.name || '';

  return {
    displayName: addressString,
    distance,
    distanceVal: parseFloat(distanceVal.replace(/,/g, '')),
    name,
    ...location,
  };
}
