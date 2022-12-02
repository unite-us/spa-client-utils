import generateEnumsObject from './generateEnumsObject';

describe('generateEnumsObject', () => {
  it('returns undefined if nothing is passed in', () => {
    const actual = generateEnumsObject();

    expect(actual).toEqual({});
  });

  it('returns enums display_name and value for a referral', () => {
    const referral = {
      contact: {
        consent: {
          status: 'accepted',
        },
      },
      status: 'recalled',
    };
    const key = 'referrals';
    const session = {
      enums: {
        referrals: {
          dashboard_statuses: [
            {
              display_name: 'Pending Consent',
              value: 'pending_consent',
            },
          ],
          statuses: [
            {
              display_name: 'Rejected',
              value: 'declined',
            },
            {
              display_name: 'Recalled',
              value: 'recalled',
            },
          ],
        },
      },
    };

    const actual = generateEnumsObject(referral, key, session);

    expect(actual).toEqual({
      display_name: 'Recalled',
      value: 'recalled',
    });
  });

  it('returns enums display_name and value for a case', () => {
    const serviceCase = {
      contact: {
        consent: {
          status: 'accepted',
        },
      },
      closing: null,
      closed_at: null,
    };
    const key = 'service_cases';
    const session = {
      enums: {
        service_cases: {
          statuses: [
            {
              display_name: 'Open',
              value: 'open',
            },
            {
              display_name: 'Closed',
              value: 'closed',
            },
          ],
        },
      },
    };

    const actual = generateEnumsObject(serviceCase, key, session);

    expect(actual).toEqual({
      display_name: 'Open',
      value: 'open',
    });
  });
});
