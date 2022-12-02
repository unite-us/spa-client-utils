import { filter } from 'lodash';

const filterServiceTypeOptions = (options = [], search = '') => {
  if (!search) {
    return options;
  }

  const lowerSearch = search.toLowerCase();

  const filtered = options.reduce((acc, curr = {}) => {
    const currentValue = curr.label || curr.name;
    if (currentValue.toLowerCase().includes(lowerSearch)) {
      return [...acc, curr];
    }
    const children = filter(curr.children, (child = {}) => {
      const currentchildValue = child.label || child.name;
      return currentchildValue.toLowerCase().includes(lowerSearch);
    });
    if (children.length > 0) {
      return [...acc, { ...curr, children }];
    }
    return acc;
  }, []);

  return filtered;
};

export default filterServiceTypeOptions;
