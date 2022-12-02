import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import highlightTerm from './highlightTerm';

const FilterOption = ({ option, onChange, selected, searchTerm, uniqIdPrefix }) => {
  const label = searchTerm ? highlightTerm(option.label, searchTerm) : option.label;

  const filterOptionClass = () => classNames({
    'ui-filter-option': !selected,
    [`level-${option.level}`]: _.has(option, 'hasChildren'),
    'has-children': option.hasChildren,
  });

  if (_.get(option, 'hasChildren', false)) {
    if (_.get(option, 'allChildrenSelected', false)) {
      return null;
    }

    return (
      <div className={filterOptionClass()}>
        <span>{label}</span>
      </div>
    );
  }

  const id = `${uniqIdPrefix}${option.value}`;

  return (
    <div className={filterOptionClass()}>
      <input
        id={id}
        type="checkbox"
        value={selected}
        onChange={e => onChange(option, e.target.value)}
      />
      <label
        className="ui-label-roman"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

FilterOption.propTypes = {
  option: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string,
  uniqIdPrefix: PropTypes.string,
};

FilterOption.defaultProps = {
  searchTerm: '',
  uniqIdPrefix: '',
};

export default FilterOption;
