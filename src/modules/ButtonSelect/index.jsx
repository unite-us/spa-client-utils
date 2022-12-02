import React, { Component } from 'react';
import { find, isFunction } from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SelectField, Icon } from '@unite-us/ui';

class ButtonSelect extends Component {
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(val) {
    const action = find(this.props.options, act => act.value === val);

    if (isFunction(action.action)) {
      action.action(val);

      // If action.action navigates away from the screen rendering the component, this.selectField will be null
      if (this.selectField && isFunction(this.selectField.setValue)) {
        this.selectField.setValue('');
      }
    }
  }

  render() {
    const {
      id,
      options,
      valueKey,
      labelKey,
      label,
      styles,
      placeholder,
      icon,
      buttonBackgroundColor,
      iconColor,
      className,
    } = this.props;

    const buttonSelectClass = () =>
      classNames({
        'ui-button-select': true,
        'ui-button-select--remove-icon': !icon,
        [`ui-button-select--${buttonBackgroundColor}`]: true,
      });

    return (
      <div className={buttonSelectClass()} style={styles.containerStyle}>
        {
          icon &&
            <Icon
              className="ui-button-select__icon"
              icon={icon}
              color={iconColor}
              style={styles.iconStyle}
            />
        }

        <SelectField
          ref={(selectField) => {
            this.selectField = selectField;
          }}
          className={className}
          id={id}
          options={options}
          searchEnabled={false}
          label={label}
          hideLabel
          valueKey={valueKey}
          labelKey={labelKey}
          onChange={this.handleOnChange}
          placeholder={placeholder}
          style={styles.selectStyle}
          shouldSort={false}
        />
      </div>
    );
  }
}

ButtonSelect.propTypes = {
  /** id for reference */
  id: PropTypes.string.isRequired,
  /** className for reference */
  className: PropTypes.string,
  /** label text for SelectField */
  label: PropTypes.string,
  /** Select options */
  options: PropTypes.array,
  /** Key used for the label */
  labelKey: PropTypes.string,
  /** Key used for the value */
  valueKey: PropTypes.string,
  /** Override the inline-styles of the elements || **Not Recommended** */
  styles: PropTypes.shape({
    containerStyle: PropTypes.object,
    selectStyle: PropTypes.object,
    iconStyle: PropTypes.object,
  }),
  /** placeholder text for the button */
  placeholder: PropTypes.string.isRequired,
  /** icon for the button */
  icon: PropTypes.string,
  /** button background color */
  buttonBackgroundColor: PropTypes.string,
  /** is icon required? */
  iconColor: PropTypes.string,
};

ButtonSelect.defaultProps = {
  className: '',
  options: [],
  label: '',
  valueKey: 'value',
  labelKey: 'label',
  styles: {
    containerStyle: {},
    selectStyle: {},
    iconStyle: {},
  },
  icon: '',
  buttonBackgroundColor: 'black',
  iconColor: 'white',
};

export default ButtonSelect;
