import { filter, includes, map } from 'lodash';

function removeChildren(values, children, valueKey) {
  const childrenValues = map(children, c => c[valueKey]);

  return filter(values, v => !includes(childrenValues, v[valueKey]));
}

export default removeChildren;
