import { findIndex, isArray, reduce } from 'lodash';
import flattenServiceTypes from './flattenServiceTypes';

const matchingServiceTypes = (selectedServiceTypes, providerServiceTypes) => {
  if (!isArray(selectedServiceTypes)) {
    return [selectedServiceTypes];
  }

  if (selectedServiceTypes.length === 1) {
    return selectedServiceTypes;
  }

  const flattenedProviderServiceTypes = flattenServiceTypes(providerServiceTypes, true);
  return reduce(selectedServiceTypes, (acc, st) => {
    if (findIndex(flattenedProviderServiceTypes, { id: st.id }) >= 0) {
      return [...acc, st];
    }
    return acc;
  }, []);
};

export default matchingServiceTypes;
