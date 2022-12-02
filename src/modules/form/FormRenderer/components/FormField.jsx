import React from 'react';
import PropTypes from 'prop-types';
import { indexOf } from 'lodash';
import FieldDisplay from './FieldDisplay';
import FormCheckboxField from './FormCheckboxField';
import FormDateField from './FormDateField';
import FormDurationField from './FormDurationField';
import FormInputField from './FormInputField';
import FormRadioField from './FormRadioField';
import FormSelectField from './FormSelectField';
import FormTextareaField from './FormTextareaField';

const field = (type, props) => {
  switch (type) {
    case 'select':
      return <FormSelectField {...props} />;
    case 'checkbox':
      return <FormCheckboxField {...props} />;
    case 'radio':
      return <FormRadioField {...props} />;
    case 'textarea':
      return <FormTextareaField {...props} />;
    case 'date':
      return <FormDateField {...props} />;
    case 'duration':
      return <FormDurationField {...props} />;
    case 'block':
      return <FieldDisplay {...props} />;
    default:
      return <FormInputField {...props} />;
  }
};

const FormField = (props) => {
  const {
    question,
    hiddenFields,
    section,
  } = props;
  if (indexOf(hiddenFields, question.id) >= 0) {
    return null;
  }
  return (
    <div className="ui-form-renderer-question">
      {field(question.input_type, { question, section })}
    </div>
  );
};

FormField.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string,
    input_type: PropTypes.string,
  }).isRequired,
  hiddenFields: PropTypes.array.isRequired,
  section: PropTypes.object.isRequired,
};

export default FormField;
