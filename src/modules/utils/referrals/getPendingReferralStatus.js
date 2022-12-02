import { get } from 'lodash';

export const statusMessages = {
  rejected: 'declined consent',
  pending: 'pending consent',
};

function getPendingReferralStatus(referral) {
  const status = get(referral, 'contact.consent.status');

  switch (status) {
    case 'rejected':
      return statusMessages.rejected;

    case 'pending':
      return statusMessages.pending;

    default:
      return get(referral, 'status', '');
  }
}


export default getPendingReferralStatus;
