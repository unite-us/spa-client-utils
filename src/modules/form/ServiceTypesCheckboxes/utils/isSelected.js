import { findIndex, get } from 'lodash';

function isSelected(opt, value, valueKey) {
  return findIndex(value, v => get(v, valueKey, '') === get(opt, valueKey, undefined)) >= 0;
}

export default isSelected;
