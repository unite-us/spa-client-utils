import getDetailObj from './getDetailObj';

describe('getDetailObj', () => {
  it('defaults to the referal object', () => {
    const detailObj = {
      _meta: {
        _type: 'blah-blah',
      },
    };

    const keyCheck = Object.keys(getDetailObj(detailObj))[0];
    expect(keyCheck).toEqual('referral');
  });

  it('returns the assistance request object', () => {
    const detailObj = {
      _meta: {
        _type: 'assistancerequest',
      },
    };
    const keyCheck = Object.keys(getDetailObj(detailObj))[0];
    expect(keyCheck).toEqual('assistanceRequest');
  });

  it('returns the service case object', () => {
    const detailObj = {
      _meta: {
        _type: 'cases_servicecase',
      },
    };
    const keyCheck = Object.keys(getDetailObj(detailObj))[0];
    expect(keyCheck).toEqual('serviceCase');
  });
});
