import { isArray } from 'lodash';

const serviceTypeBanner = (serviceTypes) => {
  if (!isArray(serviceTypes)) {
    return serviceTypes.name;
  }

  const firstSTName = serviceTypes[0] && serviceTypes[0].name;

  return serviceTypes.length > 1 ? `
    ${firstSTName} and ${serviceTypes.length - 1} more
  ` : firstSTName;
};

export default serviceTypeBanner;
