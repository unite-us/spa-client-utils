import _ from 'lodash';
import buildOptions from './buildOptions';
import isMultiLevel from './isMultiLevel';

function countOptions(options) {
  let availableOptions = [];

  if (isMultiLevel(options)) {
    availableOptions = buildOptions({ options, selected: [] });

    return _.filter(_.flattenDeep(availableOptions),
      o => !o.hasChildren).length;
  }

  return options.length;
}

export default countOptions;
