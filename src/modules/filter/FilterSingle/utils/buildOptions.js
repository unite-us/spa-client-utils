import _ from 'lodash';

function buildOptions({ options = [], disableParent = true, level = 0 } = {}) {
  return _.reduce(options, (acc, opt) => {
    if (_.has(opt, 'children') && !_.isEmpty(opt.children)) {
      const newOpt = _.merge(opt, { hasChildren: true, level, disabled: disableParent });

      return _.concat(acc, newOpt, buildOptions({ options: opt.children, disableParent, level: level + 1 }));
    }

    return _.concat(acc, _.merge(opt, { hasChildren: false, level }));
  }, []);
}

export default buildOptions;
