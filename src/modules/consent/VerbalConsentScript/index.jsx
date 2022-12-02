import React from 'react';
import PropTypes from 'prop-types';
import { BaseCard, BaseCardBody, BaseCardHeader } from '@unite-us/ui';

const CONSENT_EMAIL_URL = 'mailto:consent@uniteus.com';
const PRIVACY_URL = 'https://www.uniteus.com/privacy';

const ConsentTextScript = ({ openLink, title }) => (
  <div className="consent-text-script">
    <h3 className="consent-text-script__title mb-one">{title}</h3>
    <p className="mb-one">
      By consenting, you agree to share information with a Network of health and social service partners powered by
      Unite Us software. This Network is made up of entities and individuals who are directly involved in your care or payment of care.
      Your personal information may be shared securely on the Network in accordance with privacy laws
      to connect you with services.
    </p>

    <p className="mb-one">
      This consent covers all information shared by you or by anyone that has the right to share information on your
      behalf and is relevant to the recipient&#39;s involvement in your care or payment for your care. You can always limit the information you provide on the Network by requesting to have it removed.
    </p>

    <p className="mb-one">
      To understand how your information may be used and kept safe on the Network, please see
      <a
        className="ml-quarter"
        onClick={() => openLink(PRIVACY_URL)}
        rel="noopener noreferrer"
        role="link"
        tabIndex={0}
        target="_blank"
      >uniteus.com/privacy</a>.
    </p>

    <p className="mb-one">
      If you no longer want your information shared on the Network, you can email
      <a
        className="ml-quarter mr-quarter"
        onClick={() => openLink(CONSENT_EMAIL_URL)}
        rel="noopener noreferrer"
        role="link"
        tabIndex={0}
        target="_blank"
      >
        consent@uniteus.com
      </a>
      or ask any Network partner.
    </p>

    <p className="verbal-consent-script__heavy mb-one">
      Please answer the following questions with a Yes or a No:
    </p>

    <ul>
      <li>
        Do you provide your consent? [Client or Personal Representative / Guardian (if applicable) must say: Yes]
      </li>
      <li>
        Do you understand and agree with what I have just read? [Yes]
      </li>
      <li>
        Did I give you a chance to ask any questions that you had? [Yes]
      </li>
      <li>
        Do you have any other questions? [No]
      </li>
    </ul>
  </div>
);

ConsentTextScript.propTypes = {
  openLink: PropTypes.func.isRequired,
  title: PropTypes.string,
};

ConsentTextScript.defaultProps = {
  title: '',
};

const VerbalConsentScript = ({ openLink, showBaseCard, title }) => {
  if (showBaseCard) {
    return (
      <div className="verbal-consent-script container">
        <BaseCard>
          <BaseCardHeader
            className="verbal-consent-script__title"
            title={title}
          />
          <BaseCardBody
            className="verbal-consent-script__body"
            withPadding
          >
            <ConsentTextScript openLink={openLink} />
          </BaseCardBody>
        </BaseCard>
      </div>
    );
  }

  return (
    <div className="verbal-consent-script container">
      <ConsentTextScript openLink={openLink} title={title} />
    </div>
  );
};

VerbalConsentScript.propTypes = {
  openLink: PropTypes.func,
  showBaseCard: PropTypes.bool,
  title: PropTypes.string,
};

VerbalConsentScript.defaultProps = {
  openLink: url => window.open(url, '_blank'),
  showBaseCard: false,
  title: 'Script for Consent to Participate in the Unite Us Network',
};

export default VerbalConsentScript;
