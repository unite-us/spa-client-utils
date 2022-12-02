import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { SelectField } from '@unite-us/ui';
import { sortBy } from 'lodash';
import { getValidations, isFieldRequired } from '../utils';

class FormSelectField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validations: getValidations(props.question.validators, props.question),
      required: isFieldRequired(props.question.validators) || props.question.min_selections >= 1,
    };
  }
  render() {
    const {
      question,
    } = this.props;
    return (
      <div className="ui-form-renderer-select-field">
        <Field
          name={question.id}
          component={SelectField}
          props={{
            id: question.id,
            labelClassName: 'ui-label-roman ui-label-roman--lowercase',
            label: question.label_text,
            placeholder: question.placeholder_text,
            hint: question.help_text,
            options: sortBy(question.input_options, 'display_order', 'asc'),
            valueKey: 'id',
            labelKey: 'option_label',
            shouldSort: false,
            multiple: question.max_selections > 1 || question.min_selections > 1,
          }}
          validate={this.state.validations}
          required={this.state.required}
        />
      </div>
    );
  }
}

FormSelectField.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string,
    label_text: PropTypes.string,
    min_selections: PropTypes.number,
    max_selections: PropTypes.number,
    validators: PropTypes.array,
    placeholder_text: PropTypes.string,
    input_options: PropTypes.array,
    help_text: PropTypes.string,
  }).isRequired,
};

export default FormSelectField;
