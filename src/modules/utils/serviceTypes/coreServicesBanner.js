import { isArray, get, isEmpty, map, reject, sortBy } from 'lodash';

const coreServicesBanner = (providerServices) => {
  if (!isArray(providerServices)) {
    return providerServices.name;
  }

  const slimServices = reject(providerServices, service => isEmpty(get(service, 'relationships.parent', {}))); // remove parent service types

  const sortedServicesNames = map(sortBy(slimServices, 'attributes.name'), 'attributes.name'); // create an array of service names (strings)

  return sortedServicesNames.length > 1 ? `
    ${sortedServicesNames[0]} and ${sortedServicesNames.length - 1} more
  ` : sortedServicesNames[0];
};

export default coreServicesBanner;
