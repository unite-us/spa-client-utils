import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Icon,
} from '@unite-us/ui';

const EditField = (props) => {
  const {
    FieldComponent,
    fieldMeta,
    fieldProps,
    id,
    isSaving,
    label,
    onBlur,
    onCancelEdit,
    onChange,
    onSaveEdit,
    setFieldRef,
    value,
    afterLabelContent,
  } = props;

  const controlsClass = () => classNames({
    'ui-inline-edit__label__controls': true,
    'ui-inline-edit__label__controls--saving': isSaving,
  });

  const labelWIthControls = () => (
    <div>
      <div className="ui-inline-edit__label">
        <div className="ui-inline-edit__label__container">
          {label}
        </div>
        <div className={controlsClass()}>
          <Icon
            icon="IconCross"
            className="ui-inline-edit__label__controls__cancel"
            onClick={onCancelEdit}
            id={`${id}-cancel-btn`}
            color="white"
            ariaLabel="Cancel"
            size={18}
            disabled={isSaving}
          />
          <Icon
            icon="IconCheck"
            className="ui-inline-edit__label__controls__save"
            onClick={onSaveEdit}
            id={`${id}-save-btn`}
            color="white"
            ariaLabel="Save"
            size={18}
            disabled={isSaving}
          />
        </div>
      </div>
      <div className="ui-inline-edit__after-label-content">{afterLabelContent}</div>
    </div>
  );

  return (
    <div className="ui-inline-edit-field__edit ui-inline-edit">
      <FieldComponent
        ref={setFieldRef}
        id={`${id}-field`}
        label={labelWIthControls()}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...fieldProps}
        {...fieldMeta}
      />
    </div>
  );
};

EditField.propTypes = {
  afterLabelContent: PropTypes.node,
  FieldComponent: PropTypes.func.isRequired,
  fieldMeta: PropTypes.object.isRequired,
  fieldProps: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  isSaving: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSaveEdit: PropTypes.func.isRequired,
  setFieldRef: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
};

EditField.defaultProps = {
  afterLabelContent: null,
};

export default EditField;
