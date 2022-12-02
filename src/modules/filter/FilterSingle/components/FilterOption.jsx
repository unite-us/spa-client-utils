import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';

const FilterOption = ({ id, isActive, name, onChange, option }) => {
  const label = option.label;

  const filterOptionClass = () => classNames({
    'ui-filter-single-option': true,
    isActive,
    [`level-${option.level}`]: _.has(option, 'hasChildren'),
    'has-children': option.hasChildren,
  });

  if (_.get(option, 'hasChildren', false)) {
    return (
      <div className={filterOptionClass()}>
        <span>{label}</span>
      </div>
    );
  }

  return (
    <div className={filterOptionClass()}>
      <label
        className="ui-label-roman"
        htmlFor={`${id}`}
      >
        <input
          checked={isActive === option.value}
          id={`${id}`}
          name={name}
          onChange={e => onChange(option, e.target.value)}
          type="radio"
          value={option.value}
        />
        <span id={`${id}-label`}>
          {label}
        </span>
      </label>
    </div>
  );
};

FilterOption.propTypes = {
  id: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  option: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FilterOption;
