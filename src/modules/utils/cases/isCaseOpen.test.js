import isCaseOpen from './isCaseOpen';

describe('isCaseOpen', () => {
  const serviceCase = {
    description: 'some case',
    service_type: {},
    closing: null,
    closed_at: null,
  };

  it('is open', () => {
    expect(isCaseOpen({ ...serviceCase })).toBeTruthy();
  });

  it('is closed with closing', () => {
    expect(isCaseOpen({ ...serviceCase, closing: {} })).toBeFalsy();
  });

  it('is closed with closed_at prop', () => {
    expect(isCaseOpen({ ...serviceCase, closed_at: 1500000000 })).toBeFalsy();
  });

  it('is closed with outcome', () => {
    expect(isCaseOpen({ ...serviceCase, outcome: { id: '1' } })).toBeFalsy();
  });

  it('is open with empty outcome', () => {
    expect(isCaseOpen({ ...serviceCase, outcome: null })).toBeTruthy();
  });
});
