import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { InputField } from '@unite-us/ui';
import {
  isFieldRequired,
  getInputValidations,
} from '../utils';

class FormInputField extends Component {
  constructor(props) {
    super(props);

    const { question } = props;

    const validations = getInputValidations(question.input_type, question.validators);

    this.state = {
      validations,
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
          component={InputField}
          props={{
            id: question.id,
            labelClassName: 'ui-label-roman ui-label-roman--lowercase',
            label: question.label_text,
            placeholder: question.placeholder_text,
            hint: question.help_text,
            type: question.input_type,
            min: 0,
          }}
          validate={this.state.validations}
          required={this.state.required}
        />
      </div>
    );
  }
}

FormInputField.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string,
    label_text: PropTypes.string,
    validators: PropTypes.array,
    placeholder_text: PropTypes.string,
    help_text: PropTypes.string,
    input_type: PropTypes.string,
  }).isRequired,
};

export default FormInputField;
