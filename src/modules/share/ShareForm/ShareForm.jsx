import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  formValueSelector,
  reduxForm,
  Field,
} from 'redux-form';
import PropTypes from 'prop-types';
import {
  Button,
  InputField,
  RadioField,
} from '@unite-us/ui';
import classNames from 'classnames';
import { isError, map, noop, isFunction } from 'lodash';
import {
  emailValidation,
  phoneNumberValidation,
  requiredValidation,
} from './validations';

import InfoPopover from '../../InfoPopover';
import { SHARE_FORM_POPOVER_CONTENT } from './constants';
import { SHARE_FORM } from '../ShareForm';

const MESSAGE_TYPE_VALUES = {
  PHONE: 'sms',
  EMAIL: 'email',
  PRINT: 'print',
};

export class ShareForm extends Component {
  constructor() {
    super();
    this.onCancel = this.onCancel.bind(this);
    this.onPrint = this.onPrint.bind(this);
    this.onSend = this.onSend.bind(this);
    this.onChangeOrReset = this.onChangeOrReset.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { open, reset } = this.props;
    if (open && nextProps.open === false) {
      reset();
    }
  }

  onCancel() {
    this.props.reset();
    this.props.onCancel();
  }

  onSend(values) {
    const { email, messageType, phone } = values;
    const to = { email, sms: phone };

    return Promise.resolve(
      this.props.onSend({
        messageType,
        to: to[messageType],
      }),
    ).then((response) => {
      if (!isError(response)) {
        this.props.onTrackShare({ messageType, to: to[messageType] });
        this.onCancel();
      }
    });
  }

  onPrint(event) {
    // Prevent submission of the form.
    event.preventDefault();

    const { handlePrint, sharedGroups, sharesUrl } = this.props;
    const sharedGroupIds = map(sharedGroups, 'id').join(',');
    const url = `${sharesUrl}/?groupId=${sharedGroupIds}&print=true`;
    const win = handlePrint(url, '_blank');

    this.props.onTrackShare({ messageType: MESSAGE_TYPE_VALUES.PRINT });

    if (isFunction(this.props.onPrint)) {
      this.props.onPrint();
    }

    if (win && isFunction(win.focus)) {
      win.focus();
    }

    return win;
  }

  onChangeOrReset() {
    if (this.props.onChangeMessageType === noop) {
      this.props.reset();
    }

    this.props.onChangeMessageType();
  }

  messageTypeOptions(id) {
    return [
      {
        label: (
          <span className="sms-cont">
            Text
            <InfoPopover id={`${id}-sms-info`} placement="right" >
              <div className="share-form__popover-content">
                {SHARE_FORM_POPOVER_CONTENT}
              </div>
            </InfoPopover>
          </span>
        ),
        value: MESSAGE_TYPE_VALUES.PHONE,
      },
      { label: 'Email', value: MESSAGE_TYPE_VALUES.EMAIL },
      { label: 'Print', value: MESSAGE_TYPE_VALUES.PRINT },
    ];
  }

  render() {
    const {
      className,
      handleSubmit,
      hideCancelButton,
      id,
      messageType,
    } = this.props;
    const { EMAIL, PHONE, PRINT } = MESSAGE_TYPE_VALUES;

    return (
      <form
        className={classNames('share-form', className)}
        id={id}
        onSubmit={handleSubmit(this.onSend)}
      >
        <Field
          className="share-form__message-type-field"
          component={RadioField}
          id="share-message-type"
          inline
          label="Share Method"
          name="messageType"
          onChange={this.onChangeOrReset}
          options={this.messageTypeOptions(id)}
        />

        {messageType === PHONE &&
          <Field
            component={InputField}
            id="share-phone-field"
            label="Phone Number"
            name="phone"
            required
            validate={[requiredValidation, phoneNumberValidation]}
          />
        }

        {messageType === EMAIL &&
          <Field
            component={InputField}
            id="share-email-field"
            label="Email"
            name="email"
            required
            validate={[requiredValidation, emailValidation]}
          />
        }

        <div className="share-form__buttons">
          {!hideCancelButton &&
            <Button
              className="mr-half"
              id="share-cancel-button"
              label="Cancel"
              onClick={this.onCancel}
              secondary
            />
          }

          {messageType === PRINT ?
            <Button
              id="share-print-button"
              label="Print"
              onClick={this.onPrint}
              primary
            /> :
            <Button
              id="share-send-button"
              label="Send"
              primary
              type="submit"
            />
          }
        </div>
      </form>
    );
  }
}


export const shareFormProps = {
  /** class name */
  className: PropTypes.string,
  /** indicates location to store form in redux state, defaults to 'form' */
  formStore: PropTypes.oneOf(['form','form7']), // eslint-disable-line
  /** redux form method to connect to redux state, defaults to state => state.form */
  getFormState: PropTypes.func, // eslint-disable-line
  /** handlePrint the function used to spawn a new window with the share information, defaults to `window.open` */
  handlePrint: PropTypes.func,
  /** redux form handleSubmit function */
  handleSubmit: PropTypes.func.isRequired,
  /** hides cancel button, defaults to false */
  hideCancelButton: PropTypes.bool,
  /** id required for generating and reading unique popover id */
  id: PropTypes.string.isRequired,
  /** message type field, defaults to 'sms' */
  messageType: PropTypes.oneOf(['sms', 'email', 'print']),
  /** called on cancel */
  onCancel: PropTypes.func,
  /** called on print */
  onPrint: PropTypes.func,
  /** onChange function for message type radio field */
  onChangeMessageType: PropTypes.func,
  /** called on sending email or sms */
  onSend: PropTypes.func,
  /** tracking function called when printing/sending message */
  onTrackShare: PropTypes.func,
  /** open/closed state of drawer */
  open: PropTypes.bool,
  /** redux form reset function */
  reset: PropTypes.func.isRequired,
  /** shared groups with ids to construct complete shares url */
  sharedGroups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  /** base shares url to go to on print */
  sharesUrl: PropTypes.string.isRequired,
};

ShareForm.propTypes = shareFormProps;

ShareForm.defaultProps = {
  className: '',
  email: undefined,
  formStore: 'form',
  // getFormState: state => state.form, This is the default, but adding the defaultProp here does nothing
  handlePrint: window.open,
  hideCancelButton: false,
  messageType: 'sms',
  onCancel: noop,
  onPrint: noop,
  onChangeMessageType: noop,
  onSend: noop,
  onTrackShare: noop,
  open: false,
  phone: undefined,
};

function mapStateToProps(state, ownProps) {
  // Default formState value to 'form' because default prop isn't set yet at
  // this point.
  const { formStore = 'form' } = ownProps;
  const selector = formValueSelector(
    SHARE_FORM,
    reduxState => reduxState[formStore],
  );
  const messageType = selector(state, 'messageType');

  return {
    initialValues: {
      messageType: 'sms',
    },
    messageType,
  };
}

export default connect(
  mapStateToProps,
)(reduxForm({
  form: 'share',
  destroyOnUnmount: false,
})(ShareForm));
