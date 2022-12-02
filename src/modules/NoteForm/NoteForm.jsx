import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Field,
  FormSection,
  formValueSelector,
  reduxForm,
} from 'redux-form';
import classNames from 'classnames';
import { head, isError, noop, reject } from 'lodash';
import {
  Button,
  RadioField,
  TextField,
} from '@unite-us/ui';
import { isRequired } from 'utils/validations/validations';
import { InteractionTypeField, ServiceProvidedField } from './components';
import getCollectionFromNoteType from './utils/getCollectionFromNoteType';
import {
  DEFAULT_ATTACHED_TO,
  DEFAULT_INTERACTION_TYPE,
  DEFAULT_NOTE_TYPE,
  INTERACTION_TYPE_VALUES,
  NOTE_TYPE_OPTIONS,
  NOTE_TYPE_VALUES,
  PLACEHOLDER_TEXT,
  TODAY,
  UNIT_OPTIONS,
} from './utils/constants';

const { INTERACTION, PROVIDED_SERVICE } = NOTE_TYPE_VALUES;
const DURATION = `${INTERACTION}.duration`;
const NOTE_FORM = 'note';

export class NoteForm extends Component {
  constructor(props) {
    super(props);

    this.clearFields = this.clearFields.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleInteractionTypeChange = this.handleInteractionTypeChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleNoteTypeChange = this.handleNoteTypeChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.validations = [value => isRequired(value)];

    this.initialState = {
      duration: null,
      interactionType: DEFAULT_INTERACTION_TYPE,
      noteType: DEFAULT_NOTE_TYPE,
    };

    this.state = this.initialState;
  }

  onSubmit(values) {
    const { noteType } = this.state;
    const collection = getCollectionFromNoteType(noteType, values);

    return Promise.resolve(
      this.props.onSubmit(collection),
    ).then((result) => {
      if (!isError(result)) {
        this.resetForm();
      }
    });
  }

  onCancel() {
    this.resetForm();
    this.props.onCancel();
  }

  resetForm() {
    this.props.initialize(this.props.initialValues);
    this.setState(this.initialState);
  }

  clearFields(...fields) {
    this.props.clearFields(
      NOTE_FORM, false, false, ...fields,
    );
  }

  handleDurationChange(e, duration) {
    this.setState({ duration });
    this.props.change(DURATION, duration);
  }

  handleInteractionTypeChange(e) {
    const interactionType = e.target.value;
    const email = INTERACTION_TYPE_VALUES.EMAIL;

    this.setState({ interactionType });

    if (interactionType === email) {
      this.clearFields(DURATION);
    } else {
      this.props.change(DURATION, this.state.duration);
    }
  }

  handleNoteChange(e, note) {
    const { noteType } = this.state;
    this.props.change(`${noteType}.note`, note);
  }

  handleNoteTypeChange(e) {
    const { durationOptions } = this.props;
    const noteType = e.target.value;

    this.setState({ noteType });

    if (noteType === INTERACTION) {
      this.setState({
        duration: this.state.duration || head(durationOptions).value,
      });
    }
  }

  render() {
    const {
      change,
      className,
      durationOptions,
      handleSubmit,
      id,
      note,
      style,
      submitting,
      unitOptions,
    } = this.props;

    const { duration, interactionType, noteType } = this.state;
    const noteTypeOptions = this.props.hideServiceProvidedField ?
      reject(NOTE_TYPE_OPTIONS, ['value', PROVIDED_SERVICE]) :
      NOTE_TYPE_OPTIONS;
    const noteFormClass = () => classNames('ui-note-form', className);

    return (
      <form
        className={noteFormClass()}
        id={id}
        onSubmit={handleSubmit(this.onSubmit)}
        style={style}
      >
        <FormSection name="note">
          <Field
            className="ui-note-form__note-field"
            component={TextField}
            hideLabel
            id="ui-note-form-note-field"
            label="Note"
            name="note"
            onChange={this.handleNoteChange}
            placeholder={PLACEHOLDER_TEXT}
            required
            rows={10}
            validate={this.validations}
          />
        </FormSection>

        <RadioField
          className="ui-note-form__note-type-field"
          id="ui-note-form-note-type-field"
          inline
          label="Note Type"
          onChange={this.handleNoteTypeChange}
          options={noteTypeOptions}
          value={noteType}
        />

        { noteType === INTERACTION &&
          <InteractionTypeField
            change={change}
            duration={duration}
            durationOptions={durationOptions}
            handleDurationChange={this.handleDurationChange}
            handleInteractionTypeChange={this.handleInteractionTypeChange}
            interactionType={interactionType}
            note={note}
            validations={this.validations}
          />
        }

        { noteType === PROVIDED_SERVICE &&
          <ServiceProvidedField
            change={change}
            note={note}
            unitOptions={unitOptions}
            validations={this.validations}
          />
        }

        <div className="ui-note-form__action-btns">
          <Button
            className="ui-note-form__cancel-btn mr-one mr-half"
            label="Cancel"
            onClick={this.onCancel}
            secondary
          />
          <Button
            className="ui-note-form__add-note-btn"
            disabled={submitting}
            label="Add Note"
            primary
            type="submit"
          />
        </div>
      </form>
    );
  }
}

NoteForm.propTypes = {
  /** component props */
  /** class name */
  className: PropTypes.string,
  /** id */
  id: PropTypes.string,
  /** array of duration objects (i.e. `[{ display_name: '15m', value: '15' }]`) */
  durationOptions: PropTypes.array.isRequired,
  /** hide the `Service Provided` option */
  hideServiceProvidedField: PropTypes.bool,
  /** called when cancel button is clicked */
  onCancel: PropTypes.func,
  /** called when submitting note form */
  onSubmit: PropTypes.func.isRequired,
  /** override the inline styles of the NoteForm || **Not Recommended** */
  style: PropTypes.object,
  /** list of options to populate `Unit` field in `ServiceProvidedField` */
  unitOptions: PropTypes.array,

  /** redux form props */
  /** @ignore redux form this.props.change function */
  change: PropTypes.func.isRequired,
  /**
   * @ignore
   * redux form clearFields function
   * clears values for all fields passed
   * @param {string} form name of form
   * @param {boolean} keepTouched
   * @param {boolean} persistentSubmitErrors
   * @param {string} fields one or more string fieldNames
  */
  clearFields: PropTypes.func.isRequired,
  /** @ignore redux form handleSubmit function */
  handleSubmit: PropTypes.func.isRequired,
  /** @ignore redux form initialize function */
  initialize: PropTypes.func.isRequired,
  /** @ignore default values for note form */
  initialValues: PropTypes.object.isRequired,
  /** @ignore redux form value for note field */
  note: PropTypes.string,
  /** @ignore redux form submitting bool */
  submitting: PropTypes.bool.isRequired,
};

NoteForm.defaultProps = {
  className: '',
  hideServiceProvidedField: false,
  id: '',
  note: '',
  onCancel: noop,
  style: {},
  unitOptions: UNIT_OPTIONS,
};

const selector = formValueSelector(NOTE_FORM);
const initialValues = {
  note: {
    occurred_on: TODAY,
    type: DEFAULT_NOTE_TYPE,
  },
  interaction: {
    attached_to: DEFAULT_ATTACHED_TO,
    occurred_on: TODAY,
    type: INTERACTION_TYPE_VALUES.PHONE,
  },
};

export default reduxForm({
  form: NOTE_FORM,
  initialValues,
})(connect(
  state => ({ note: selector(state, 'note.note') }),
)(NoteForm));
