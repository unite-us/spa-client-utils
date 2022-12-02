import _ from 'lodash';

export default function getEventPath(e) {
  if (_.isArray(e.path)) {
    return e.path;
  }
  let path = [];
  let target = e.target;

  while (target) {
    path = _.concat(path, target);
    target = target.parentNode;
  }
  return _.concat(path, document, window);
}
