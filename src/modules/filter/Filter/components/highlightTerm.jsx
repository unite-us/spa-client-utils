import React from 'react';
import _ from 'lodash';

const highlightTerm = (text, term) => {
  if (_.isEmpty(term)) {
    return text;
  }

  const pattern = new RegExp(term, 'gi');
  const a = text.split(pattern);
  const r = text.match(pattern);

  if (!r) {
    return text;
  }

  const comp = _.reduce(a, (acc, val, index) =>
    _.concat(acc, _.concat(val, r[index] ? (<b key={index}>{r[index]}</b>) : null))
    , '');
  return _.compact(comp);
};

export default highlightTerm;
