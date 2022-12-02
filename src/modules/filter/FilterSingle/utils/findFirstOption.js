import _ from 'lodash';

export default function findFirstOption(options) {
  const firstOption = _.first(options);

  return _.has(firstOption, 'children') && !_.isEmpty(firstOption.children) ?
    _.first(firstOption.children) :
    firstOption;
}
