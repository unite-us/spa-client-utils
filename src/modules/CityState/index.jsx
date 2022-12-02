import PropTypes from 'prop-types';
import React from 'react';
import { isEmpty } from 'lodash';

const CityState = ({ address = {} }) => {
  const hasCity = !isEmpty(address.city);
  const hasState = !isEmpty(address.state);

  if (hasCity && hasState) {
    return <span>{address.city}, <abbr>{address.state} </abbr></span>;
  }

  if (hasCity) {
    return <span>{address.city} </span>;
  }

  if (hasState) {
    return <span>{address.state} </span>;
  }

  return null;
};

CityState.propTypes = {
  address: PropTypes.shape({
    city: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
};

export default CityState;
