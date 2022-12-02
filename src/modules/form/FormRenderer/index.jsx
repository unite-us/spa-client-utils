import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initialize, submit, reset } from 'redux-form';
import { noop } from 'lodash';
import Form from './components/Form';
import { conditionalDisplay, formatData, getInitialValues } from './utils';

class FormRenderer extends PureComponent {
  constructor(props) {
    super(props);
    this.initialize = this.initialize.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitFail = this.onSubmitFail.bind(this);
    this.conditionalDisplay = this.conditionalDisplay.bind(this);
    this.reset = this.reset.bind(this);
    this.submit = this.submit.bind(this);

    this.submitPromise = null;
    this.state = {
      hiddenFields: [],
    };
  }
  onSubmit(data) {
    const formatedData = formatData(this.props.formData, data);
    this.props.onSubmit(formatedData);
    this.resolveSubmit(formatedData);
  }
  onSubmitFail(errors) {
    this.props.onSubmitFail(errors);
    this.rejectSubmit(errors);
  }

  conditionalDisplay(values) {
    this.setState({
      hiddenFields: conditionalDisplay(this.props.formData, values),
    });
    return undefined;
  }
  /**
   * Calls the intialize action creator of redux-form
   * @public
  */
  initialize() {
    const {
      dispatch,
      formData,
    } = this.props;
    const newValues = getInitialValues(formData);
    dispatch(initialize(formData.id, newValues));
  }
  /**
   * Calls the reset action creator of redux-form
   * @public
  */
  reset() {
    const {
      dispatch,
      formData: {
        id,
      },
    } = this.props;
    dispatch(reset(id));
  }
  /**
   * Calls the submit action creator of redux-form.
   * It return a Promise resolving with the form data or rejecting with the form errors
   * @public
  */
  submit() {
    const {
      dispatch,
      formData: {
        id,
      },
    } = this.props;

    this.submitPromise = new Promise((resolve, reject) => {
      this.resolveSubmit = resolve;
      this.rejectSubmit = reject;
    });

    dispatch(submit(id));
    return this.submitPromise;
  }

  render() {
    const {
      editMode,
      formData,
      getFormState,
    } = this.props;

    return (
      <div className="ui-form-renderer">
        <Form
          formData={formData}
          validate={this.conditionalDisplay}
          hiddenFields={this.state.hiddenFields}
          getFormState={getFormState}
          onSubmit={this.onSubmit}
          onSubmitFail={this.onSubmitFail}
          editMode={editMode}
        />
      </div>
    );
  }
}

FormRenderer.propTypes = {
  /** the redux dispatch passed by connect */
  dispatch: PropTypes.func.isRequired,
  /** is the form in edit mode or display mode? */
  editMode: PropTypes.bool,
  /** the form configuration object */
  formData: PropTypes.object,
  /**
   * function to return the right state part when the form reducer is not mounted on `form`
   * @param {object} state
  */
  getFormState: PropTypes.func,
  /**
   * submit callback being called when the form successfully submits
   * @param {object} data the form data
  */
  onSubmit: PropTypes.func,
  /**
   * submit callback being called when the form fails submit
   * @param {object} errors the form errors
  */
  onSubmitFail: PropTypes.func,
};

FormRenderer.defaultProps = {
  editMode: true,
  formData: {},
  inline: false,
  getFormState: state => state.form,
  onSubmit: noop,
  onSubmitFail: noop,
};

export default connect(null, null, null, { withRef: true })(FormRenderer);
