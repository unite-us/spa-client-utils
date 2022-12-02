import { isFunction } from 'lodash';

const hideRemoveButton = (count, index, customHideRemoveButton = undefined) => {
  if (isFunction(customHideRemoveButton)) {
    return customHideRemoveButton();
  }

  return index === 0 && count <= 1;
};

export default hideRemoveButton;
