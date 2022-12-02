import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FormSection } from 'redux-form';
import { InputField, SelectField } from '@unite-us/ui';
import { isNumber, isPositiveNumber, isRequired } from 'utils/validations/validations';
import { NOTE_TYPE_VALUES } from '../utils/constants';

const { PROVIDED_SERVICE } = NOTE_TYPE_VALUES;

class ServiceProvidedField extends Component {
  constructor(props) {
    super(props);

    this.amountValidations = [
      value => isNumber(value),
      value => isPositiveNumber(value),
      value => isRequired(value),
    ];
  }

  componentDidMount() {
    const { change, note } = this.props;
    change(`${PROVIDED_SERVICE}.note`, note);
  }

  render() {
    const { unitOptions, validations } = this.props;

    return (
      <FormSection
        className="ui-service-provided-field"
        name={PROVIDED_SERVICE}
      >
        <Field
          className="ui-service-provided-field__service-provided-type-field"
          component={InputField}
          id="ui-service-provided-field-service-provided-type-field"
          label="Service Provided"
          name="type"
          required
          validate={validations}
        />

        <Field
          className="ui-service-provided-field__amount-field "
          component={InputField}
          id="ui-service-provided-field-amount-field"
          label="Amount"
          min={0}
          name="amount"
          required
          type="number"
          validate={this.amountValidations}
        />

        <Field
          className="ui-service-provided-field__unit-field"
          component={SelectField}
          id="ui-service-provided-field-unit-field"
          label="Unit"
          name="unit"
          options={unitOptions}
          required
          searchEnabled={false}
          shouldSort={false}
          validate={validations}
        />
      </FormSection>
    );
  }
}

ServiceProvidedField.propTypes = {
  change: PropTypes.func.isRequired,
  note: PropTypes.string.isRequired,
  unitOptions: PropTypes.array.isRequired,
  validations: PropTypes.array.isRequired,
};

export default ServiceProvidedField;
