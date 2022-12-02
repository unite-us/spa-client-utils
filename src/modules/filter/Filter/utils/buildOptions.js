import _ from 'lodash';

function buildOptions({ options = [], selected = [], disableParent = true, level = 0 } = {}) {
  return _.reduce(options, (acc, opt) => {
    if (_.has(opt, 'children') && !_.isEmpty(opt.children)) {
      const allChildrenSelected = _.every(
        _.reduce(opt.children, (arr, child) => {
          if (selected.includes(child.value)) {
            return [...arr, true];
          }
          return [...arr, false];
        }, []),
      );

      const newOpt = _.merge(opt, { hasChildren: true, level, disabled: disableParent, allChildrenSelected });

      return _.concat(acc, newOpt, buildOptions({ options: opt.children, selected, disableParent, level: level + 1 }));
    }

    return _.concat(acc, _.merge(opt, { hasChildren: false, level }));
  }, []);
}

export default buildOptions;
