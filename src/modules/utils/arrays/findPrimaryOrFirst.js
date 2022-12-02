import { find, first } from 'lodash';

function findPrimaryOrFirst(items = []) {
  return find(items, { is_primary: true }) || first(items) || {};
}

export default findPrimaryOrFirst;
