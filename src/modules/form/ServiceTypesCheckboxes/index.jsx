import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import classNames from 'classnames';
import {
  addOrRemoveParentChildren,
} from './utils';
import ServiceTypesCheckbox from './components/ServiceTypesCheckbox';

class ServiceTypesCheckboxes extends Component {
  constructor(props) {
    super(props);

    this.onServiceTypeCheckboxChange = this.onServiceTypeCheckboxChange.bind(this);
  }

  onServiceTypeCheckboxChange(item, level) {
    const {
      autoSelectChildren,
      autoSelectParent,
      field,
      options,
      valueKey,
    } = this.props;

    const newValue = addOrRemoveParentChildren(item, field.value, valueKey, options, level, autoSelectParent, autoSelectChildren);
    field.onChange(newValue);

    this.props.onChange(newValue);
  }

  render() {
    const {
      options,
      field,
      labelKey,
      valueKey,
      label,
      id,
      hideLabel,
      autoSelectParent,
      autoSelectChildren,
    } = this.props;

    const labelClass = () => classNames({
      'control-label': true,
      'sr-only': hideLabel,
    });

    return (
      <fieldset className="service-types-checkboxes">
        <legend
          className={labelClass()}
          htmlFor={id}
        >
          {label}
        </legend>
        <div className="service-types-checkboxes__container" id={id}>
          {
            options.map((opt, index) => {
              const key = `parent-${index}`;

              return (
                <ServiceTypesCheckbox
                  key={key}
                  index={index}
                  onChange={this.onServiceTypeCheckboxChange}
                  id={`${id}-${index}`}
                  item={opt}
                  labelKey={labelKey}
                  valueKey={valueKey}
                  value={field.value}
                  autoSelectParent={autoSelectParent}
                  autoSelectChildren={autoSelectChildren}
                  allOptions={options}
                />
              );
            })
          }
        </div>
      </fieldset>
    );
  }
}

ServiceTypesCheckboxes.propTypes = {
  /** boolean used to determine if all children of a service type should be selected when parent is selected */
  autoSelectChildren: PropTypes.bool.isRequired,
  /** boolean used to determine if the child service type parent should be selected when the child is selected */
  autoSelectParent: PropTypes.bool.isRequired,
  /** form field */
  field: PropTypes.object.isRequired,
  /** boolean used to determine if the individual checkbox label should be hidden */
  hideLabel: PropTypes.bool.isRequired,
  /** id for reference */
  id: PropTypes.string.isRequired,
  /** label used in legend */
  label: PropTypes.string.isRequired,
  /** Key used for the label of the checkboxes */
  labelKey: PropTypes.string,
  /** function to be called when Component onServiceTypeCheckboxChange is called */
  onChange: PropTypes.func,
  /** service type options */
  options: PropTypes.array,
  /** Key used for the value of the checkboxes */
  valueKey: PropTypes.string,
};

ServiceTypesCheckboxes.defaultProps = {
  autoSelectChildren: false,
  autoSelectParent: false,
  hideLabel: false,
  labelKey: 'name',
  options: [],
  valueKey: 'id',
  onChange: noop,
};

export default ServiceTypesCheckboxes;

