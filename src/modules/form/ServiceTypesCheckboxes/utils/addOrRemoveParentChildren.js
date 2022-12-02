import { compact, filter, get } from 'lodash';
import {
  anyChildInValue,
  autoAddChildren,
  getParent,
  isSelected,
  removeChildren,
} from '../utils';

function addOrRemoveParentChildren(item, oldValue, valueKey, allOptions, level, autoSelectParent, autoSelectChildren) {
  const initiallySelected = isSelected(item, oldValue, valueKey);
  let newValue = oldValue || [];

  if (level === 0) {
    if (initiallySelected) {
      newValue = filter(newValue, v => v[valueKey] !== item[valueKey]);
      newValue = removeChildren(newValue, get(item, 'children', []), valueKey);
    } else {
      newValue = [...newValue, item];
      newValue = removeChildren(newValue, get(item, 'children', []), valueKey);
      if (autoSelectChildren) {
        newValue = autoAddChildren(newValue, get(item, 'children', []));
      }
    }
  } else {
    const parent = getParent(item, allOptions, valueKey);
    newValue = filter(newValue, v => v[valueKey] !== parent[valueKey]);

    if (initiallySelected) {
      newValue = filter(newValue, v => v[valueKey] !== item[valueKey]);

      if (autoSelectParent && anyChildInValue(parent, newValue, valueKey)) {
        newValue = [...newValue, parent];
      }
    } else {
      newValue = [...newValue, item];
      if (autoSelectParent) {
        newValue = [...newValue, parent];
      }
    }
  }

  return compact(newValue);
}

export default addOrRemoveParentChildren;
