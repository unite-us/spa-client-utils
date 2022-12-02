import { get } from 'lodash';
import { REFERRAL_STATUS_PENDING } from './constants';

function isPendingReferral(referral) {
  return get(referral, 'status') === REFERRAL_STATUS_PENDING;
}
export default isPendingReferral;
