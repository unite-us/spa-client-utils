import { has, isEmpty } from 'lodash';

function hasChildren(item) {
  return has(item, 'children') && !isEmpty(item.children);
}

export default hasChildren;
