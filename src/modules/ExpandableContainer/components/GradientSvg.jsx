import React from 'react';
import PropTypes from 'prop-types';

const GradientSvg = ({ color, open, id }) => (
  <svg className={`gradient-svg ${open ? 'open' : ''}`.trim()} version="1.1" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id={`${id}Gradient`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0" />
        <stop offset="100%" stopColor={color} stopOpacity="100" />
      </linearGradient>
    </defs>
    <rect fill={`url(#${id}Gradient)`} />
  </svg>
);

GradientSvg.propTypes = {
  color: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default GradientSvg;
