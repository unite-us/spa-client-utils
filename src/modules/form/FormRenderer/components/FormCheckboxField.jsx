import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormSection, Fields } from 'redux-form';
import { sortBy, map, compact, isEmpty, join } from 'lodash';
import FormCheckBoxGroup from './FormCheckBoxGroup';
import { getCheckboxValidations, isFieldRequired } from '../utils';

class FormCheckboxField extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);

    const {
      question,
      section,
    } = props;

    this.state = {
      validations: getCheckboxValidations(question),
      required: isFieldRequired(question.validators),
      options: sortBy(question.input_options, 'display_order', 'asc'),
      validate: [{
        name: `${section.id}.${question.id}.${question.input_options[0].id}`,
        funcs: [this.validate],
      }],
      errors: [undefined],
    };
  }
  validate(value, allValues) {
    const errors = compact(map(this.state.validations, validation => validation(value, allValues)));

    this.setState({ errors });
    return isEmpty(errors) ? undefined : errors;
  }
  render() {
    const { question } = this.props;
    return (
      <div className="ui-form-renderer-checkbox-field">
        <FormSection name={question.id}>
          <Fields
            names={map(this.state.options, 'id')}
            component={FormCheckBoxGroup}
            props={{
              label: question.label_text,
              id: question.id,
              options: this.state.options,
              valueKey: 'id',
              labelKey: 'option_label',
              error: join(this.state.errors, ', '),
              hint: question.help_text,
            }}
            validate={this.state.validate}
          />
        </FormSection>
      </div>
    );
  }
}

FormCheckboxField.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string,
    help_text: PropTypes.string,
    label_text: PropTypes.string,
    input_options: PropTypes.array,
    validators: PropTypes.array,
  }).isRequired,
  section: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default FormCheckboxField;
