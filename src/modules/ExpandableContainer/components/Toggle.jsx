import React from 'react';
import PropTypes from 'prop-types';
import {
  noop,
} from 'lodash';

const Toggle = ({
  className,
  text,
  id,
  onClick,
  readOnly,
}) => (
  <div
    className={className}
  >
    {
      readOnly ? (
        text
      ) : (
        <a
          id={`${id}-toggle-link`}
          role="button"
          onClick={onClick}
          tabIndex={0}
        >
          {text}
        </a>
      )
    }
  </div>
);


Toggle.propTypes = {
  className: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  readOnly: PropTypes.bool,
};

Toggle.defaultProps = {
  onClick: noop,
  readOnly: false,
};

export default Toggle;
