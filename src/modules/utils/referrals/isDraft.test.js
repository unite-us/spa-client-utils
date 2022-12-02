import isDraft from './isDraft';
import { REFERRAL_STATUS_DRAFT } from './constants';

describe('isDraft', () => {
  it('draft', () => {
    const referral = { status: REFERRAL_STATUS_DRAFT };
    expect(isDraft(referral)).toBeTruthy();
  });

  it('not draft', () => {
    const referral = { status: 'accepted' };
    expect(isDraft(referral)).toBeFalsy();
  });
});
