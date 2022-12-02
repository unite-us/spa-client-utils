import { kebabCase } from 'lodash';

function createFilterId(name = '') {
  return `${kebabCase(name)}-filter`;
}

export default createFilterId;
