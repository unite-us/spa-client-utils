import { get } from 'lodash';
import isPendingReferral from './isPendingReferral';
import getPendingReferralStatus from './getPendingReferralStatus';

function getReferralStatus(referral) {
  if (isPendingReferral(referral)) {
    return getPendingReferralStatus(referral);
  }
  return get(referral, 'status', '');
}

export default getReferralStatus;
