import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CheckBoxField } from '@unite-us/ui';
import classNames from 'classnames';
import { get, map } from 'lodash';

class CheckBoxGroupField extends PureComponent {
  render() {
    const {
      checkBoxClassName,
      className,
      disabled,
      hint,
      id,
      label,
      labelClassName,
      labelKey,
      options,
      valueKey,
    } = this.props;

    const checkboxGroupContainerClass = () => classNames({
      'ui-checkbox-group': true,
      'ui-form-field': true,
    }, className);

    const labelClass = () => classNames({
      'ui-form-field__label': true,
    }, labelClassName);

    const checkboxes = map(options, (checkBox, index) => {
      const fieldKey = get(checkBox, valueKey, '');
      const field = get(this.props, fieldKey) || get(this.props, `field.${fieldKey}`);

      return (
        <CheckBoxField
          key={`checkbox-${id}-${fieldKey}`}
          id={`${id}-checkbox-${index}`}
          className={checkBoxClassName}
          disabled={disabled || get(checkBox, 'disabled', false)}
          name={fieldKey}
          label={get(checkBox, labelKey, '')}
          showHint={false}
          showError={false}
          {...field}
        />
      );
    });

    return (
      <fieldset className={checkboxGroupContainerClass()} id={id}>
        <legend className={labelClass()}>
          {label}
        </legend>

        {checkboxes}
        {
          hint && (
            <div className="ui-form-field__hint">
              {hint}
            </div>
          )
        }
      </fieldset>
    );
  }
}

CheckBoxGroupField.propTypes = {
  /** className for checkbox */
  checkBoxClassName: PropTypes.string,
  /** className for reference, defaults to empty string */
  className: PropTypes.string,
  /** used in the fieldset to disable all of the checkboxes */
  disabled: PropTypes.bool,
  /** Redux Form 5 will need a field prop, Redux Form 7 will not */
  field: PropTypes.object,
  /** Help text displayed below the input */
  hint: PropTypes.string,
  /** id for given to checkbox group */
  id: PropTypes.string.isRequired,
  /** label used in the legend of the fieldset in checkbox group */
  label: PropTypes.string.isRequired,
  /** className for label, defaults to empty string */
  labelClassName: PropTypes.string,
  /** Key used for the label of the checkboxes */
  labelKey: PropTypes.string.isRequired,
  /** checkbox options */
  options: PropTypes.arrayOf(PropTypes.shape({
    display_name: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  /** Key used for the value of the checkboxes */
  valueKey: PropTypes.string.isRequired,
};

CheckBoxGroupField.defaultProps = {
  checkBoxClassName: '',
  className: '',
  disabled: false,
  field: undefined,
  hint: '',
  labelClassName: '',
};

export default CheckBoxGroupField;
