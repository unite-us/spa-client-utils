import phoneNumberValidation from './phoneNumberValidation';

describe('phoneNumberValidation', () => {
  describe('valid phone numbers', () => {
    const validPhones = [
      undefined, // empty values are valid,
      '', // empty values are valid,
      '(617)321-1234',
      '123.123.1233',
      '7876667777x2345',
      '1234567890',
      // Should we set a max phone number length?
      '1234567890123456789012345678901234567890',
    ];
    validPhones.map(phone => (
      it(`returns undefined for ${phone}`, () => {
        expect(phoneNumberValidation(phone)).toBeUndefined();
      })
    ));
  });

  describe('invalid phone numbers', () => {
    const invalidPhones = [
      'a',
      'not a phone number',
      '12345',
      '1234567',
      '123456789',
    ];
    invalidPhones.map(phone => (
      it(`returns error message for ${phone}`, () => {
        expect(phoneNumberValidation(phone)).toBe('Must be at least 10 digits');
      })
    ));
  });
});
