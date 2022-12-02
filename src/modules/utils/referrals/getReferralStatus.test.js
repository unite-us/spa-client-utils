import { statusMessages } from './getPendingReferralStatus';
import getReferralStatus from './getReferralStatus';

describe('getReferralStatus', () => {
  const contactRejectedConsent = {
    consent: {
      status: 'rejected',
    },
  };

  const contactAcceptedConsent = {
    consent: {
      status: 'accepted',
    },
  };

  const contactPendingConsent = {
    consent: {
      status: 'pending',
    },
  };

  it('rejected', () => {
    const referral = { contact: contactRejectedConsent, status: 'pending' };
    expect(getReferralStatus(referral)).toEqual(statusMessages.rejected);
  });

  it('pending', () => {
    const referral = { contact: contactPendingConsent, status: 'pending' };
    expect(getReferralStatus(referral)).toEqual(statusMessages.pending);
  });

  it('accepted', () => {
    const status = 'other value';
    const referral = { contact: contactAcceptedConsent, status };
    expect(getReferralStatus(referral)).toEqual(status);
  });
});
