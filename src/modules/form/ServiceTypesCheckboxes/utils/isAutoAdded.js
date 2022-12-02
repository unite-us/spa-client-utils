import { find } from 'lodash';
import {
  allChildrenInValue,
  anyChildInValue,
  getParent,
  hasChildren,
  isSelected,
} from '../utils';

export function isAutoAdded({ opt, value, allOptions, valueKey, autoSelectParent, autoSelectChildren } = {}) {
  const selected = isSelected(opt, value, valueKey);
  if (!selected) {
    return false;
  }
  if (autoSelectParent && !autoSelectChildren) {
    if (hasChildren(opt)) {
      return anyChildInValue(opt, value, valueKey);
    }
    return false;
  }
  if (autoSelectParent && autoSelectChildren) {
    if (hasChildren(opt)) {
      const serviceType = find(allOptions, o => o[valueKey] === opt[valueKey]);
      return anyChildInValue(serviceType, value, valueKey) && !allChildrenInValue(serviceType, value, valueKey);
    }
    const parent = getParent(opt, allOptions, valueKey);
    return allChildrenInValue(parent, value, valueKey);
  }
  return false;
}

export default isAutoAdded;
