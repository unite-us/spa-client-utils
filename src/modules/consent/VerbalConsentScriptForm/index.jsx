// Library Imports
import 'react-signature-pad/style.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import SignaturePad from 'react-signature-pad';
import { BaseCard, BaseCardBody, BaseCardHeader, Button, Divider } from '@unite-us/ui';

// Component Imports
import VerbalConsentScript from '../VerbalConsentScript';
import {
  ConsentResponseRecorded,
  ConsentDeclinedResponseRecorded,
} from '../components';

class VerbalConsentScriptForm extends Component {
  static propTypes = {
    /** function MUST be async */
    acceptConsent: PropTypes.func.isRequired,
    /** function MUST be async */
    declineConsent: PropTypes.func.isRequired,
    /** function via parent component if additional actions need to be taken after completion */
    onComplete: PropTypes.func,
    onSignatureEnd: PropTypes.func,
    onSignatureClear: PropTypes.func,
    openLink: PropTypes.func,
    title: PropTypes.string.isRequired,
    /** Basecard adds outline around the consent screen */
    showBaseCard: PropTypes.bool,
    /** Verbal Consent Script Form requires a client name */
    fullName: PropTypes.string.isRequired,
    /** Verbal Consent Script Form requires a user name for helper text */
    userName: PropTypes.string,
    /** Boolean to determine if confirmation is required to decline consent (Controlled) */
    declineConsentConfirm: PropTypes.bool,
    /** Boolean set to true when declined from parent component (Controlled) */
    declined: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.state = {
      accepted: false,
      base64SignatureImage: null,
      error: false,
      responseIsComplete: false,
      submitting: false,
    };

    this.onSignatureEnd = this.onSignatureEnd.bind(this);
    this.acceptConsent = _.debounce(this.acceptConsent.bind(this), 500, {
      leading: true,
      trailing: false,
    });
    this.declineConsent = _.debounce(this.declineConsent.bind(this), 500, {
      leading: true,
      trailing: false,
    });
    this.clearSignature = this.clearSignature.bind(this);
  }

  componentDidUpdate(prevProps) {
    // If confirmation text/modal is necessary from parent, component is listening for parent state of 'declined' to update (Controlled)
    if (this.props.declineConsentConfirm && this.props.declined && !prevProps.declined) {
      this.setResponseComplete(false);
      this.props.onComplete();
    }
  }

  onSignatureEnd() {
    const base64Image = this.signaturePadRef.toDataURL();
    this.setState({ base64SignatureImage: base64Image });

    if (_.isFunction(this.props.onSignatureEnd)) {
      this.props.onSignatureEnd(base64Image);
    }
  }

  setResponseComplete(accepted) {
    this.setState({
      responseIsComplete: true,
      accepted,
    });
  }

  setError(value = true) {
    this.setState({ error: value });
  }

  acceptConsent() {
    this.setState({ submitting: true }, () => {
      this.props.acceptConsent().then((data) => {
        if (data.status === 200) {
          this.setResponseComplete(true);
          this.props.onComplete();
          this.setState({ submitting: false });
        } else {
          this.setError();
          this.setState({ submitting: false });
        }
      });
    });
  }

  // If uncontrolled, will show declinedResponseRecorded component after complete
  declineConsent() {
    const { declineConsentConfirm } = this.props;
    this.props.declineConsent();

    if (!declineConsentConfirm) {
      this.setState({ submitting: true }, () => {
        this.setResponseComplete(false);
        this.props.onComplete();
      });
    }
  }

  clearSignature() {
    this.signaturePadRef.clear();
    this.setState({ base64SignatureImage: null });
    if (_.isFunction(this.props.onSignatureClear)) {
      this.props.onSignatureClear();
    }
  }

  consentText(fullname) {
    return (
      <div>{`
          I attest that ${fullname}, or their personal representative, was read the consent, was given the 
          opportunity to ask questions and had their questions answered to their satisfaction. I affirm that 
          ${fullname}, or their personal representative, provided consent for their information to be shared 
          via the Unite Us platform.
          `}
      </div>);
  }

  render() {
    const {
      accepted,
      base64SignatureImage,
      responseIsComplete,
      error,
      submitting,
    } = this.state;

    const {
      fullName,
      openLink,
      showBaseCard,
      title,
      userName,
    } = this.props;

    if (error) {
      return null;
    }

    if (responseIsComplete && accepted) {
      return <ConsentResponseRecorded />;
    }

    if (responseIsComplete) {
      return <ConsentDeclinedResponseRecorded />;
    }

    if (showBaseCard) {
      return (
        <div className="verbal-consent-script-form global-consent-container">
          <BaseCard>
            <BaseCardHeader
              className="verbal-consent-script-form__title"
              title={title}
            />
            <BaseCardBody>
              <VerbalConsentScript
                openLink={openLink}
                title={title}
                showBaseCard={!showBaseCard}
              />
              <div className="container">
                <div style={{ position: 'relative' }}>
                  <p className="mt-one">
                    {this.consentText(fullName)}
                  </p>
                  <br />
                  <p> {`${userName}, please sign your name in the box below.`} </p>
                  <SignaturePad
                    ref={(c) => { this.signaturePadRef = c; }}
                    onEnd={this.onSignatureEnd}
                    onBegin={this.onDrawBegin}
                  >
                    Sign Here To Attest
                  </SignaturePad>
                </div>
                <div>
                  <a
                    onClick={this.clearSignature}
                    role="button"
                    tabIndex={0}
                  >
                    Clear Signature
                  </a>
                </div>
                <div className="verbal-consent-script-form__button-submit mt-half mb-half">
                  <Button
                    onClick={this.declineConsent}
                    label="Decline"
                    disabled={submitting}
                  >
                    Decline
                  </Button>
                  <Button
                    onClick={this.acceptConsent}
                    disabled={!base64SignatureImage || submitting}
                    label="Attest"
                    primary
                  />
                </div>
              </div>
            </BaseCardBody>
          </BaseCard>
        </div>
      );
    }

    return (
      <div className="verbal-consent-script-form global-consent-container">
        <VerbalConsentScript
          title={title}
          openLink={openLink}
          showBaseCard={!!showBaseCard}
        />
        <div className="container">
          <div>
            <Divider
              style={{
                border: '0.5px solid #E5EEF5',
                margin: '10px 0 20px 0',
              }}
            />
            <p className="mt-one">
              {this.consentText(fullName)}
            </p>
            <br />
            <p>
              {userName ?
                `${userName}, please sign your name in the box below.` :
                'Client or Personal Representative/ Guardian (if applicable), please sign your name in the box below.'
              }
            </p>
            <SignaturePad
              ref={(c) => { this.signaturePadRef = c; }}
              onEnd={this.onSignatureEnd}
              onBegin={this.onDrawBegin}
            >
              Sign Here To Attest
            </SignaturePad>
          </div>

          <div className="mb-one">
            <a
              onClick={this.clearSignature}
              role="button"
              tabIndex={0}
            >
              Clear Signature
            </a>
          </div>

          <div className="verbal-consent-script-form__button-submit mt-half mb-half">
            <Button
              onClick={this.declineConsent}
              label="Decline"
              disabled={submitting}
            >
              Decline
            </Button>
            <Button
              onClick={this.acceptConsent}
              disabled={!base64SignatureImage || submitting}
              label="Attest"
              primary
            />
          </div>
        </div>
      </div>
    );
  }
}

VerbalConsentScriptForm.defaultProps = {
  declineConsentConfirm: false,
  declined: false,
  onComplete: _.noop,
  onSignatureClear: _.noop,
  onSignatureEnd: _.noop,
  openLink: undefined,
  showBaseCard: false,
  userName: '',
};

export default VerbalConsentScriptForm;
