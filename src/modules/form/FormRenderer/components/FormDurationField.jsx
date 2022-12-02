import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Fields } from 'redux-form';
import { map, reduce, find, get, compact, isEmpty } from 'lodash';
import { DurationField } from '@unite-us/ui';
import { getValidations, isFieldRequired } from '../utils';

class FormDurationField extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    const validations = getValidations(props.question.validators, props.question);
    this.state = {
      validations,
      validatiors: [
        { name: `${props.question.id}.start`, funcs: [this.validate] },
      ],
      required: isFieldRequired(props.question.validators),
      errors: [undefined],
    };
  }
  validate(value, allValues) {
    const startValue = reduce(allValues, (acc, section) => {
      const question = find(section, (v, key) => key === this.props.question.id);
      if (question) {
        return get(question, 'start', '');
      }
      return acc;
    }, '');
    const errors = compact(map(this.state.validations, validator => validator(startValue, allValues)));
    this.setState({ errors });
    return isEmpty(errors) ? undefined : errors;
  }
  render() {
    const {
      question,
    } = this.props;
    return (
      <div className="ui-form-renderer-input-field">
        <Fields
          names={[
            `${question.id}.start`,
            `${question.id}.end`,
          ]}
          component={DurationField}
          props={{
            id: question.id,
            label: question.label_text,
            labelClassName: 'ui-label-roman ui-label-roman--lowercase',
            placeholder: question.placeholder_text,
            hint: question.help_text,
            startFieldPath: `${question.id}.start`,
            endFieldPath: `${question.id}.end`,
          }}
          validate={this.state.validatiors}
          required={this.state.required}
        />
      </div>
    );
  }
}

FormDurationField.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string,
    help_text: PropTypes.string,
    label_text: PropTypes.string,
    placeholder_text: PropTypes.string,
    validators: PropTypes.array,
  }).isRequired,
};

export default FormDurationField;
