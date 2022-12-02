import sortPhoneNumbers from './sortPhoneNumbers';

const phone_numbers = [
  {
    phone_type: 'fax',
    country_code: '1',
    phone_number: '2128922020',
  },
  {
    phone_type: 'phone',
    country_code: '1',
    phone_number: '2128921010',
    is_default: true,
  },
  {
    phone_type: 'phone',
    country_code: '1',
    phone_number: '2128921310',
  },
  {
    phone_type: 'other',
    country_code: '1',
    phone_number: '2128923030',
  },
];

describe('sortPhoneNumbers', () => {
  it('sorts the phone numbers by phone type in order of "phone", "fax", "other"', () => {
    expect(sortPhoneNumbers(phone_numbers)).toEqual([
      {
        phone_type: 'phone',
        country_code: '1',
        phone_number: '2128921010',
        is_default: true,
      },
      {
        phone_type: 'phone',
        country_code: '1',
        phone_number: '2128921310',
      },
      {
        phone_type: 'fax',
        country_code: '1',
        phone_number: '2128922020',
      },
      {
        phone_type: 'other',
        country_code: '1',
        phone_number: '2128923030',
      },
    ]);
  });
});
