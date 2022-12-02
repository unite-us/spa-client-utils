import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CheckBoxField } from '@unite-us/ui';
import classNames from 'classnames';
import { get, isEmpty, reduce, some } from 'lodash';

class FormCheckBoxGroup extends PureComponent {
  render() {
    const {
      checkBoxClassName,
      checkBoxFieldStyle,
      checkBoxLabelPosition,
      className,
      disabled,
      error,
      hint,
      id,
      label,
      labelClassName,
      labelKey,
      options,
      style,
      valueKey,
    } = this.props;

    const fields = reduce(options, (acc, option) => (
      [...acc, get(this.props, option[valueKey])]
    ), []);

    const isTouched = some(fields, field => get(field, 'meta.touched', false));

    const checkboxGroupContainerClass = () => classNames({
      'ui-form-checkbox-group': true,
      'ui-form-field': true,
      'ui-form-field--has-error': !isEmpty(error) && isTouched,
    }, className);

    const labelClass = () => classNames({
      'ui-form-field__label': true,
    }, labelClassName);

    const checkboxes = options.map((opt, index) => {
      const value = get(opt, valueKey, '');
      const field = get(this.props, value);

      return (
        <CheckBoxField
          key={`checkbox-${id}-${value}`}
          id={`${id}-checkbox-${index}`}
          className={checkBoxClassName}
          labelPosition={checkBoxLabelPosition}
          disabled={disabled || get(opt, 'disabled', false)}
          name={value}
          label={get(opt, labelKey, '')}
          style={checkBoxFieldStyle}
          {...field}
        />
      );
    });

    return (
      <div id={id} className={checkboxGroupContainerClass()}>
        <div className={labelClass()}>
          {label}
        </div>
        {checkboxes}
        <div className="ui-form-field__error" style={style.error}>
          {isTouched && error}
        </div>
        <div className="ui-form-field__hint" style={style.hint}>
          {hint}
        </div>
      </div>
    );
  }
}

FormCheckBoxGroup.propTypes = {
  /** className for checkbox */
  checkBoxClassName: PropTypes.string,
  /** Override the inline-styles of the elements || **Not Recommended** */
  checkBoxFieldStyle: PropTypes.shape({
    container: PropTypes.object,
    error: PropTypes.object,
    hint: PropTypes.object,
    input: PropTypes.object,
    label: PropTypes.object,
  }),
  /** Position of the checkbox label */
  checkBoxLabelPosition: PropTypes.oneOf(['right', 'left']),
  /** className for reference, defaults to empty string */
  className: PropTypes.string,
  /** Bool used to determine if FormCheckBoxGroup is disabled as a whole */
  disabled: PropTypes.bool,
  /** Potential error message */
  error: PropTypes.string,
  /** Help text displayed below the input */
  hint: PropTypes.string,
  /** id for reference */
  id: PropTypes.string.isRequired,
  /** label text for checkbox group */
  label: PropTypes.string.isRequired,
  /** className for label, defaults to empty string */
  labelClassName: PropTypes.string,
  /** Key used for the label */
  labelKey: PropTypes.string,
  /** checkbox options */
  options: PropTypes.array,
  /** Override the inline-styles of the elements || **Not Recommended** */
  style: PropTypes.shape({
    container: PropTypes.object,
    label: PropTypes.object,
    hint: PropTypes.object,
    error: PropTypes.object,
  }),
  /** Key used for the value */
  valueKey: PropTypes.string,
};

FormCheckBoxGroup.defaultProps = {
  checkBoxClassName: '',
  checkBoxFieldStyle: {
    container: {},
    error: {},
    hint: {},
    input: {},
    label: {},
  },
  checkBoxLabelPosition: 'right',
  className: '',
  disabled: false,
  error: '',
  hint: '',
  labelClassName: '',
  labelKey: 'label',
  labelPosition: 'right',
  options: [],
  style: {
    container: {},
    label: {},
    hint: {},
    error: {},
  },
  valueKey: 'value',
};

export default FormCheckBoxGroup;
