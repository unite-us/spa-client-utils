import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  get,
  noop,
  isFunction,
  isArray,
  join,
  map,
  compact,
  isEmpty,
  isNil,
} from 'lodash';
import { InputField } from '@unite-us/ui';
import {
  Display,
  EditField,
} from './components';

class InlineEditField extends Component {
  constructor(props) {
    super(props);

    this.onEditClick = this.onEditClick.bind(this);
    this.onCancelEdit = this.onCancelEdit.bind(this);
    this.onSaveEdit = this.onSaveEdit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.setFieldRef = this.setFieldRef.bind(this);
    this.validate = this.validate.bind(this);

    this.componentRef = null;

    this.state = {
      editMode: false,
      localValue: props.value,
      isSaving: false,
      fieldMeta: {
        valid: true,
        invalid: false,
        touched: false,
        pristine: true,
        dirty: false,
        visited: false,
        error: '',
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ localValue: nextProps.value });
    }
  }

  onEditClick() {
    const { onFieldEdit } = this.props;
    this.setState({ editMode: true }, this.validate);
    onFieldEdit();
  }

  onCancelEdit(event) {
    event.preventDefault();
    const { value, onFieldCancel } = this.props;
    this.setState({
      editMode: false,
      localValue: value,
      fieldMeta: {
        ...this.state.fieldMeta,
        dirty: false,
        pristine: true,
        touched: false,
        visited: false,
      },
    }, this.validate);
    onFieldCancel();
  }

  onSaveEdit(event) {
    event.preventDefault();
    const { onFieldSave, onFieldError } = this.props;
    const { localValue, fieldMeta } = this.state;

    this.setState({
      fieldMeta: {
        ...this.state.fieldMeta,
        touched: true,
        visited: true,
      },
    });

    if (fieldMeta.valid) {
      const result = onFieldSave(localValue);
      if (result instanceof Promise) {
        this.setState({ isSaving: true });
        return result.then(() => {
          this.setState({
            isSaving: false,
            editMode: false,
          });
        });
      }
      return this.setState({ editMode: false });
    }

    return onFieldError(fieldMeta.error);
  }

  onChange(event) {
    const { onFieldChange } = this.props;
    const value = get(event, 'target.value', event);

    this.setState({
      localValue: value,
      fieldMeta: {
        ...this.state.fieldMeta,
        dirty: true,
        pristine: false,
      },
    }, this.validate);
    onFieldChange(value);
  }

  onBlur() {
    const { onFieldBlur } = this.props;
    this.setState({
      fieldMeta: {
        ...this.state.fieldMeta,
        touched: true,
        visited: true,
      },
    }, this.validate);
    onFieldBlur();
  }

  setFieldRef(ref) {
    this.componentRef = ref;
  }

  validate() {
    const { fieldValidations } = this.props;
    const { localValue } = this.state;
    let error;

    if (isFunction(fieldValidations)) {
      error = fieldValidations(localValue);
    } else if (isArray(fieldValidations)) {
      const errors = map(fieldValidations, validation => validation(localValue));
      error = join(compact(errors), ', ');
    }

    if (this.componentRef && isFunction(this.componentRef.validate)) {
      const errors = this.componentRef.validate(localValue);
      error = join(compact([error, errors]), ', ');
    }

    this.setState({
      fieldMeta: {
        ...this.state.fieldMeta,
        error,
        valid: isEmpty(error),
        invalid: !isEmpty(error),
      },
    });
    return error;
  }
  render() {
    const {
      afterLabelContent,
      disabled,
      className,
      displayValue,
      fieldComponent,
      fieldProps,
      id,
      label,
      value,
    } = this.props;

    const {
      editMode,
      fieldMeta,
      isSaving,
      localValue,
    } = this.state;

    const containerClass = () => classNames({
      'ui-inline-edit-field': true,
    }, className);

    return (
      <div
        className={containerClass()}
        id={id}
      >
        {
          (!editMode || disabled) &&
            <Display
              afterLabelContent={afterLabelContent}
              id={id}
              label={label}
              onEditClick={this.onEditClick}
              value={!isNil(displayValue) ? displayValue : value}
              disabled={disabled}
            />
        }
        {
          (editMode && !disabled) &&
            <EditField
              afterLabelContent={afterLabelContent}
              FieldComponent={fieldComponent}
              fieldMeta={fieldMeta}
              fieldProps={fieldProps}
              id={id}
              isSaving={isSaving}
              label={label}
              onBlur={this.onBlur}
              onCancelEdit={this.onCancelEdit}
              onChange={this.onChange}
              onSaveEdit={this.onSaveEdit}
              setFieldRef={this.setFieldRef}
              value={localValue}
            />
        }
      </div>
    );
  }
}

InlineEditField.propTypes = {
  /** Content to display after the label in the display/ edit views */
  afterLabelContent: PropTypes.node,
  /** ClassName passed to the wrapper div */
  className: PropTypes.string,
  /** Is edition disabled */
  disabled: PropTypes.bool,
  /** Value string used for display if different from `value` */
  displayValue: PropTypes.string,
  /** ID of the component */
  id: PropTypes.string.isRequired,
  /** Field component to render in the edit mode */
  fieldComponent: PropTypes.func,
  /** Props passed directly to the fieldComponent */
  fieldProps: PropTypes.object,
  /** Validation function(s) to run against the fieldComponent */
  fieldValidations: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array,
  ]),
  /** Label to display */
  label: PropTypes.string.isRequired,
  /** Field blur callback */
  onFieldBlur: PropTypes.func,
  /** Cancel callback */
  onFieldCancel: PropTypes.func,
  /**
   * Field change callback
   * @param value
   */
  onFieldChange: PropTypes.func,
  /** Edit button callback */
  onFieldEdit: PropTypes.func,
  /**
   * Called when the invalid field is saved
   * @param {string} error
   */
  onFieldError: PropTypes.func,
  /**
   * Called when the valid field is saved.
   * If this returns a Promise, the component will wait for the resolve to switch back to display mode
   * @param value
   */
  onFieldSave: PropTypes.func.isRequired,
  /** Value of the field */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
};

InlineEditField.defaultProps = {
  afterLabelContent: null,
  className: '',
  disabled: false,
  displayValue: undefined,
  fieldComponent: InputField,
  fieldProps: {},
  fieldValidations: undefined,
  onFieldBlur: noop,
  onFieldCancel: noop,
  onFieldChange: noop,
  onFieldEdit: noop,
  onFieldError: noop,
  value: '',
};

export default InlineEditField;
