import { get, isEmpty, keys, uuOmit, uuCompactArrayOrObject } from 'lodash';

function keyForInvalidAddressTypeOmission(type) {
  return ![type, get(type, 'value')].includes('ours') ? null : 'addressType';
}

function keyForInvalidDistanceOmission(distance) {
  return (['', 'any'].includes(distance) || isEmpty(distance)) ? 'distance' : null;
}

const createFilterTrackingObject = (filters) => {
  if (isEmpty(filters)) {
    return [];
  }

  const trackingFilters = uuOmit(filters,
    [
      'address',
      keyForInvalidDistanceOmission(filters.distance),
      keyForInvalidAddressTypeOmission(filters.addressType),
      'includeHomeGroups',
      'networks',
      'contextAction',
    ]);

  return keys(uuCompactArrayOrObject(trackingFilters));
};

export default createFilterTrackingObject;
