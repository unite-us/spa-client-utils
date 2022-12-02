import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { DateField } from '@unite-us/ui';
import { getValidations, isFieldRequired } from '../utils';

class FormDateField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validations: getValidations(props.question.validators),
      required: isFieldRequired(props.question.validators),
    };
    this.fieldInstance = null;
  }
  render() {
    const {
      question,
    } = this.props;
    const dateValidation = this.fieldInstance ? this.fieldInstance.getRenderedComponent().validate : () => (undefined);
    return (
      <div className="ui-form-renderer-input-field">
        <Field
          ref={(c) => { this.fieldInstance = c; }}
          name={question.id}
          component={DateField}
          props={{
            id: question.id,
            label: question.label_text,
            labelClassName: 'ui-label-roman ui-label-roman--lowercase',
            placeholder: question.placeholder_text,
            hint: question.help_text,
          }}
          validate={[...this.state.validations, dateValidation]}
          required={this.state.required}
          withRef
        />
      </div>
    );
  }
}

FormDateField.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string,
    label_text: PropTypes.string,
    placeholder_text: PropTypes.string,
    help_text: PropTypes.string,
    validators: PropTypes.array,
  }).isRequired,
};

export default FormDateField;
