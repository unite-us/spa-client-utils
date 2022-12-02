import { get, find } from 'lodash';
import cases from '../cases';
import referrals from '../referrals';

function findStatusObject(enums, statuses, value) {
  const enumStatus = get(enums, statuses, null);
  return find(enumStatus, { value });
}

function pendingReferralStatus(referral) {
  return ['rejected', 'pending', 'unsent'].includes(get(referral, 'contact.consent.status'));
}

function useDashBoardStatuses(type, detailObj) {
  if (type === 'referrals' && referrals.isPendingReferral(detailObj)) {
    return pendingReferralStatus(detailObj);
  }
  return false;
}

function pendingReferralValue(referral) {
  const status = get(referral, 'contact.consent.status');

  switch (status) {
    case 'rejected':
      return 'declined_consent';

    case 'unsent':
    case 'pending':
      return 'pending_consent';

    default:
      return get(referral, 'status');
  }
}

function getReferralValue(referral) {
  if (referrals.isPendingReferral(referral)) {
    return pendingReferralValue(referral);
  }
  return get(referral, 'status');
}

function getDetailObjValue(type, detailObj) {
  switch (type) {
    case 'service_cases':
      return cases.caseStatus(detailObj);

    case 'referrals':
      return getReferralValue(detailObj);

    default:
      return get(detailObj, 'status');
  }
}

/**
 * @param { object } detailObj - examples include referrals, serviceCase, Assistance Request
 * @param { string } enumsKey - enums key to find the proper enums
 * @param { object } session - retrieved via state.session
 * @param { object } options - additional options specific to detailObj type
 * @return { object } - returns enums display_name and value
 */

function generateEnumsObject(detailObj, enumsKey, session) {
  const enumsObj = get(session, `enums[${enumsKey}]`, null);
  const statuses = useDashBoardStatuses(enumsKey, detailObj) ?
    'dashboard_statuses' :
    'statuses';
  const value = getDetailObjValue(enumsKey, detailObj);

  return findStatusObject(enumsObj, statuses, value) || {};
}

export default generateEnumsObject;
