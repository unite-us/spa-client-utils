import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ header }) => (
  <div className="expandable-container__header">
    <h5>{header}</h5>
  </div>
);


Header.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Header;

