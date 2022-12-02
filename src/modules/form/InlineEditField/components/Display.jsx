import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@unite-us/ui';

const Display = ({
  afterLabelContent,
  disabled,
  id,
  label,
  onEditClick,
  value,
}) => (
  <div className="ui-inline-edit-field__display ui-inline-display">
    <div className="ui-inline-display__container">
      <h5>{label}</h5>
      <div className="ui-inline-display__after-label-content">{afterLabelContent}</div>
      <span>{value}</span>
    </div>
    {
      !disabled &&
        <div className="ui-inline-display__control">
          <Icon
            icon="IconPencil"
            onClick={onEditClick}
            id={`${id}-edit-btn`}
            color="white"
            ariaLabel="Edit"
            size={18}
          />
        </div>
    }
  </div>
);

Display.propTypes = {
  afterLabelContent: PropTypes.node,
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onEditClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

Display.defaultProps = {
  afterLabelContent: null,
};

export default Display;
