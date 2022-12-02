import { has, some, findIndex } from 'lodash';

function anyChildInValue(parent, value, valueKey) {
  return has(parent, 'children') ?
    some(parent.children, child => findIndex(value, v => v[valueKey] === child[valueKey]) >= 0) :
    false;
}

export default anyChildInValue;
