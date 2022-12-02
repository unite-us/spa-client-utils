import { get } from 'lodash';

export default function getLatLng(address = {}) {
  return address.lat_lng !== undefined ?
    get(address, 'lat_lng', []) :
    [get(address, 'latitude', []), get(address, 'longitude', [])];
}
