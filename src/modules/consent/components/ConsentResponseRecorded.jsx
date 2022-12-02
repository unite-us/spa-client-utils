import React from 'react';
import { Icon } from '@unite-us/ui';

export default function ConsentResponseRecorded() {
  return (
    <div className="consent-response-recorded">
      <h3 className="consent-response-recorded__text">
        Consent Recorded
        <div className="consent-response-recorded__icon-container">
          <Icon icon="IconCheckCircle" size={32} color="green" />
        </div>
      </h3>
      <p>
        Thank you for submitting your consent.
      </p>
    </div>);
}
