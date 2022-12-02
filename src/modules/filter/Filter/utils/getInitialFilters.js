import _ from 'lodash';

export default function getInitialFilters(options) {
  return _.flatten(
    _.compact(
      _.map(options, (o) => {
        if (_.has(o, 'children') && !_.isEmpty(o.children)) {
          return _.compact(_.map(o.children, opt => (opt.initial ? opt.value : null)));
        }
        return o.initial ? o.value : null;
      }),
    ),
  );
}

