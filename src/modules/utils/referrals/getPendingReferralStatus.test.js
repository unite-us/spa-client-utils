import getPendingReferralStatus, {
  statusMessages,
} from './getPendingReferralStatus';

describe('getPendingReferralStatus', () => {
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
    const referral = { contact: contactRejectedConsent };
    expect(getPendingReferralStatus(referral)).toEqual(statusMessages.rejected);
  });

  it('pending', () => {
    const referral = { contact: contactPendingConsent };
    expect(getPendingReferralStatus(referral)).toEqual(statusMessages.pending);
  });

  it('accepted', () => {
    const status = 'other value';
    const referral = { contact: contactAcceptedConsent, status };
    expect(getPendingReferralStatus(referral)).toEqual(status);
  });
});
