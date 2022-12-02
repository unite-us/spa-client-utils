import isPendingReferral from './isPendingReferral';
import { REFERRAL_STATUS_PENDING } from './constants';

describe('isPendingReferral', () => {
  it('pending', () => {
    const referral = { status: REFERRAL_STATUS_PENDING };
    expect(isPendingReferral(referral)).toBeTruthy();
  });

  it('not pending', () => {
    const referral = { status: 'accepted' };
    expect(isPendingReferral(referral)).toBeFalsy();
  });
});
