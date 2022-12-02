import { REFERRAL_STATUS_DRAFT } from './constants';

function isDraft(referral = {}) {
  return referral.status === REFERRAL_STATUS_DRAFT;
}

export default isDraft;
