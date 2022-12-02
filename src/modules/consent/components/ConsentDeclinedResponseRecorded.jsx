import React from 'react';
import { Icon } from '@unite-us/ui';

export default function ConsentDeclinedResponseRecorded() {
  return (
    <div className="consent-decline-response-recorded">
      <h3 className="consent-decline-response-recorded__text">
        Consent Declined
        <div className="consent-decline-response-recorded__icon-container">
          <Icon icon="IconTimesCircle" size={32} color="red" />
        </div>
      </h3>
      <p>
        Your consent has been recorded as Declined.
      </p>
    </div>);
}
