import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { SelectField } from '@unite-us/ui';
import { filterServiceTypeOptions } from './utils';

class ServiceTypeSelectField extends Component {
  constructor(props) {
    super(props);

    this.loadOptions = this.loadOptions.bind(this);
    this.resetOptions = this.resetOptions.bind(this);
  }

  loadOptions(search) {
    const { options } = this.props;
    const filtered = filterServiceTypeOptions(options, search);
    return new Promise((resolve) => {
      resolve({
        options: filtered,
      });
    });
  }

  resetOptions() {
    const { field, touch } = this.props;
    // Mark the field as touched.
    touch(field.name);
    // Clear search text value.
    this.selectField.choices.input.value = '';
    // Reset options.
    this.selectField.onSearch({ detail: { value: '' } });
  }

  render() {
    const { field, registerField, ...props } = this.props;

    return (
      <SelectField
        {...(_.isEmpty(field) ? {} : {
          field: {
            ...field,
            onBlur: this.resetOptions,
          },
        })}
        loadOptions={this.loadOptions}
        ref={(n) => {
          this.selectField = n;
          registerField(n);
        }}
        {...props}
      />
    );
  }
}

ServiceTypeSelectField.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  field: PropTypes.object.isRequired,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  registerField: PropTypes.func.isRequired,
  searchChoices: PropTypes.bool,
  searchPlaceholderValue: PropTypes.string,
  touch: PropTypes.func.isRequired,
  validations: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

ServiceTypeSelectField.defaultProps = {
  className: '',
  id: '',
  inline: false,
  label: 'Service Type',
  labelKey: 'name',
  onChange: _.noop,
  options: [],
  placeholder: '',
  searchChoices: true,
  searchPlaceholderValue: '',
  valueKey: 'id',
};

export default ServiceTypeSelectField;
