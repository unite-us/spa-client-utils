import _ from 'lodash';

function filterOptions(opts, term) {
  const options = _.cloneDeep(opts);

  return _.filter(options, (opt) => {
    if (_.has(opt, 'children') && !_.isEmpty(opt.children)) {
      const filteredChildren = filterOptions(opt.children, term);

      _.set(opt, 'children', filteredChildren);
      if (filteredChildren.length <= 0) {
        return false;
      }
      return true;
    }

    return _.includes(_.toLower(opt.label), _.toLower(term));
  });
}

export default filterOptions;
