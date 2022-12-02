import caseStatus from './caseStatus';

describe('caseStatus', () => {
  const serviceCase = {
    description: 'some case',
    service_type: {},
    closing: null,
    closed_at: null,
  };

  it('is open', () => {
    expect(caseStatus({ ...serviceCase })).toEqual('open');
  });

  it('is closed with closing', () => {
    expect(caseStatus({ ...serviceCase, closing: {} })).toEqual('closed');
  });

  it('is closed with closed_at prop', () => {
    expect(caseStatus({ ...serviceCase, closed_at: 1500000000 })).toEqual('closed');
  });
});
