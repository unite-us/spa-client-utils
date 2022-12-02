import { find, findIndex } from 'lodash';
import { hasChildren } from '../utils';

function getParent(item, allOptions, valueKey) {
  return find(allOptions, o => (
    hasChildren(o) &&
    findIndex(o.children, child => child[valueKey] === item[valueKey]) >= 0
  ));
}

export default getParent;
