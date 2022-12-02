import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { map, sortBy } from 'lodash';
import { RadioField } from '@unite-us/ui';
import { getValidations, isFieldRequired } from '../utils';

class FormRadioField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validations: getValidations(props.question.validators),
      required: isFieldRequired(props.question.validators),
      options: map(sortBy(props.question.input_options, 'display_order, asc'), opt => (
        {
          label: opt.option_label,
          value: opt.id,
        }
      )),
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
          component={RadioField}
          props={{
            id: question.id,
            labelClassName: 'ui-label-roman ui-label-roman--lowercase',
            label: question.label_text,
            placeholder: question.placeholder_text,
            hint: question.help_text,
            options: this.state.options,
          }}
          validate={this.state.validations}
          required={this.state.required}
        />
      </div>
    );
  }
}

FormRadioField.propTypes = {
  question: PropTypes.shape({
    help_text: PropTypes.string,
    id: PropTypes.string,
    input_options: PropTypes.array,
    label_text: PropTypes.string,
    placeholder_text: PropTypes.string,
    validators: PropTypes.array,
  }).isRequired,
};

export default FormRadioField;
