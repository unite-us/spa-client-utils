import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, FormSection } from 'redux-form';
import {
  DateField,
  RadioField,
  SelectField,
} from '@unite-us/ui';
import {
  INTERACTION_TYPE_OPTIONS,
  INTERACTION_TYPE_VALUES,
  NOTE_TYPE_VALUES,
  TODAY,
} from '../utils/constants';

const { EMAIL } = INTERACTION_TYPE_VALUES;
const { INTERACTION } = NOTE_TYPE_VALUES;

export class InteractionTypeField extends PureComponent {
  componentDidMount() {
    const { change, duration, interactionType, note } = this.props;

    change(`${INTERACTION}.note`, note);

    if (interactionType !== EMAIL) {
      change(`${INTERACTION}.duration`, duration);
    }
  }

  render() {
    const {
      durationOptions,
      interactionType,
      validations,
    } = this.props;

    const showDurationField = interactionType !== EMAIL;

    return (
      <FormSection
        className="ui-interaction-type-field"
        name={INTERACTION}
      >
        <Field
          className="ui-interaction-type-field__interaction-type-field"
          component={RadioField}
          inline
          label="Interaction Type"
          name="type"
          onChange={this.props.handleInteractionTypeChange}
          options={INTERACTION_TYPE_OPTIONS}
          value={interactionType}
        />

        <div className="ui-interaction-type-field__interaction">
          <Field
            className="ui-interaction-type-field__interaction-date-field"
            component={DateField}
            id="ui-interaction-type-field-interaction-date-field"
            label="Interaction Date"
            maxDate={TODAY}
            name="occurred_on"
            required
            validate={validations}
          />

          { showDurationField &&
          <Field
            className="ui-interaction-type-field__duration-field"
            clearable={false}
            component={SelectField}
            id="ui-interaction-type-field-duration-field"
            label="Duration"
            labelKey="display_name"
            name="duration"
            onChange={this.props.handleDurationChange}
            options={durationOptions}
            required
            searchEnabled={false}
            shouldSort={false}
            validate={validations}
          />
          }
        </div>
      </FormSection>
    );
  }
}

InteractionTypeField.propTypes = {
  change: PropTypes.func.isRequired,
  duration: PropTypes.string,
  durationOptions: PropTypes.array.isRequired,
  handleDurationChange: PropTypes.func.isRequired,
  handleInteractionTypeChange: PropTypes.func.isRequired,
  interactionType: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
  validations: PropTypes.array.isRequired,
};

InteractionTypeField.defaultProps = {
  duration: '',
};

export default InteractionTypeField;
