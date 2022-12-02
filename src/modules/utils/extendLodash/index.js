import _ from 'lodash';

export function wget(obj, path, defaultValue) {
  const defaultValueSingleton = { defaultValue };
  let result = _.get(obj, path, defaultValueSingleton);

  if (_.isEqual(result, defaultValueSingleton)) {
    /* eslint-disable */
    console.warn(`Default Value was used @ path: ${path}`);
    /* eslint-enable */
    result = result.defaultValue;
  }
  return result;
}

export function uuOmit(obj, ...path) {
  return _.reduce(obj, (acc, value, key) => {
    if (_.includes(path.toString().split(','), key)) {
      return acc;
    }
    return _.merge(acc, { [key]: value });
  }, {});
}
export function uuPick(obj, ...path) {
  return _.reduce(obj, (acc, value, key) => {
    if (_.includes(path.toString().split(','), key)) {
      return _.merge(acc, { [key]: value });
    }
    return acc;
  }, {});
}
export function uuOmitBy(obj, predicate) {
  return _.reduce(obj, (acc, value, key) => {
    if (predicate(value, key)) {
      return acc;
    }
    return _.merge(acc, { [key]: value });
  }, {});
}
export function uuPickBy(obj, predicate) {
  return _.reduce(obj, (acc, value, key) => {
    if (predicate(value, key)) {
      return _.merge(acc, { [key]: value });
    }
    return acc;
  }, {});
}

export function uuCompactArrayOrObject(item) {
  if (Array.isArray(item)) {
    return _.compact(item);
  }

  if (typeof item === 'object') {
    return _.uuOmitBy(item, prop => (
      _.isEmpty(prop) && !_.isNumber(prop) && !_.isBoolean(prop)
    ));
  }
  return item;
}

export function recursiveGet(object, pathArray, defaultValue, iterator) {
  if (_.isArray(pathArray)) {
    for (const path of pathArray) {
      const current = _.get(object, path, undefined);
      if (_.isFunction(iterator)) {
        if (iterator(current) && current) {
          return current;
        }
      } else if (current) {
        return current;
      }
    }
  }
  return defaultValue;
}

export default function extendLodash() {
  _.mixin({
    wget,
    uuOmit,
    uuPick,
    uuOmitBy,
    uuPickBy,
    uuCompactArrayOrObject,
    recursiveGet,
  });
}
