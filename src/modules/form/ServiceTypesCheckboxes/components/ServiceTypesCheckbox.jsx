import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CheckBoxField } from '@unite-us/ui';
import { get } from 'lodash';
import {
  isSelected,
  isAutoAdded,
} from '../utils';

const ServiceTypesCheckbox = ({
  onChange,
  id,
  item,
  labelKey,
  valueKey,
  value,
  level,
  autoSelectParent,
  autoSelectChildren,
  allOptions,
}) => {
  const handleChange = () => {
    onChange(item, level);
  };


  const containerClass = () => classNames({
    'service-types-checkbox': true,
    'service-types-checkbox__child': level > 0,
  });
  const checkboxClass = () => classNames({
    'service-types-checkbox__parent': level === 0,
    'service-types-checkbox__child': level > 0,
  });

  const itemChildren = get(item, 'children', []);
  const disabled = isAutoAdded({
    opt: item,
    value,
    allOptions,
    valueKey,
    level,
    autoSelectParent,
    autoSelectChildren,
  });

  return (
    <div className={containerClass()}>
      <CheckBoxField
        id={id}
        className={checkboxClass()}
        onChange={handleChange}
        label={get(item, labelKey, '')}
        checked={isSelected(item, value, valueKey)}
        disabled={disabled || item.sensitive}
        showError={false}
        showHint={false}
      />
      {
        itemChildren.map((child, i) => {
          const checkBoxId = `${id}-${i}`;
          return (
            <ServiceTypesCheckbox
              allOptions={allOptions}
              autoSelectChildren={autoSelectChildren}
              autoSelectParent={autoSelectParent}
              id={checkBoxId}
              item={child}
              key={`child-${checkBoxId}`}
              labelKey={labelKey}
              level={level + 1}
              onChange={onChange}
              value={value}
              valueKey={valueKey}
              disabled={disabled || child.sensitive}
            />
          );
        })
      }
    </div>
  );
};

ServiceTypesCheckbox.propTypes = {
  allOptions: PropTypes.array.isRequired,
  autoSelectChildren: PropTypes.bool.isRequired,
  autoSelectParent: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  labelKey: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  valueKey: PropTypes.string.isRequired,
};

ServiceTypesCheckbox.defaultProps = {
  level: 0,
  value: false,
};

export default ServiceTypesCheckbox;
