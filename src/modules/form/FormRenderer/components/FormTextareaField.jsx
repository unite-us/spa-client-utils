import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { TextField } from '@unite-us/ui';
import { getValidations, isFieldRequired } from '../utils';

class FormTextareaField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validations: getValidations(props.question.validators),
      required: isFieldRequired(props.question.validators),
    };
  }
  render() {
    const {
      question,
    } = this.props;
    return (
      <div className="ui-form-renderer-input-field">
        <Field
          name={question.id}
          component={TextField}
          props={{
            id: question.id,
            label: question.label_text,
            labelClassName: 'ui-label-roman ui-label-roman--lowercase',
            placeholder: question.placeholder_text,
            hint: question.help_text,
          }}
          validate={this.state.validations}
          required={this.state.required}
        />
      </div>
    );
  }
}

FormTextareaField.propTypes = {
  question: PropTypes.shape({
    help_text: PropTypes.string,
    id: PropTypes.string,
    label_text: PropTypes.string,
    placeholder_text: PropTypes.string,
    validators: PropTypes.array,
  }).isRequired,
};

export default FormTextareaField;
