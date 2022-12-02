import { has, every, findIndex } from 'lodash';

function allChildrenInValue(parent, value, valueKey) {
  return has(parent, 'children') ?
    every(parent.children, child => findIndex(value, v => v[valueKey] === child[valueKey]) >= 0) :
    false;
}

export default allChildrenInValue;
