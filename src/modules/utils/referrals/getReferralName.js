import { get, isEmpty, trim } from 'lodash';
import isDraft from './isDraft';
import { DRAFT_REFERRAL_DISPLAY, REFERRAL_DISPLAY } from './constants';

function referralType(referral) {
  return isDraft(referral) ? DRAFT_REFERRAL_DISPLAY : REFERRAL_DISPLAY;
}

function getReferralName(referral) {
  const name = get(referral, 'service_type.name', '');
  const serviceTypeName = isEmpty(name) ? '' : name;
  return trim(`${serviceTypeName} ${referralType(referral)}`);
}

export default getReferralName;
