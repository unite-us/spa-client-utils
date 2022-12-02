import { minBy } from 'lodash';

export default function findClosestDistanceAddress(addresses) {
  return minBy(addresses, address => address.distanceVal) || {};
}
