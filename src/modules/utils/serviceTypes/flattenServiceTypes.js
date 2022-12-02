import { flattenDeep, reduce, sortBy, uniqBy, uuOmit } from 'lodash';

const flattenServiceTypes = (structuredServiceTypes = [], keepParent = false) => {
  const flatArrayServiceTypes = flattenDeep(structuredServiceTypes);
  const flatServiceTypes = reduce(flatArrayServiceTypes, (acc, st) => {
    if (st && st.children && st.children.length) {
      if (keepParent) {
        const stNoChildren = uuOmit(st, 'children');
        return [...acc, stNoChildren, ...st.children];
      }
      return [...acc, ...st.children];
    }
    return [...acc, st];
  }, []);
  const uniqueServiceTypes = uniqBy(flatServiceTypes, 'id');
  return sortBy(uniqueServiceTypes, 'name', 'asc');
};

export default flattenServiceTypes;
