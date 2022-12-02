import getReferralName from './getReferralName';
import { REFERRAL_STATUS_DRAFT } from './constants';

const serviceTypeName = 'Sample';
const baseReferral = {
  service_type: {
    name: serviceTypeName,
  },
};

describe('getReferralName', () => {
  it('draft', () => {
    const referral = { ...baseReferral, status: REFERRAL_STATUS_DRAFT };
    expect(getReferralName(referral)).toEqual('Sample Draft Referral');
  });

  it('not draft', () => {
    const referral = { ...baseReferral, status: 'accepted' };
    expect(getReferralName(referral)).toEqual('Sample Referral');
  });

  it('no type', () => {
    const referral = { status: 'accepted' };
    expect(getReferralName(referral)).toEqual('Referral');
  });
});
