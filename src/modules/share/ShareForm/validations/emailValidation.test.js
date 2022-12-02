import emailValidation from './emailValidation';

describe('emailValidation', () => {
  describe('valid emails', () => {
    const validEmails = [
      undefined, // empty values are valid,
      '', // empty values are valid,
      'a.valid@email.com',
      'anothervalid@email.go',
    ];
    validEmails.map(email => (
      it(`returns undefined for ${email}`, () => {
        expect(emailValidation(email)).toBeUndefined();
      })
    ));
  });

  describe('invalid emails', () => {
    const invalidEmails = [
      'a',
      'not.an.email',
      'justthestart@',
      '@justtheend.com',
      'double@double@email.com',
      'almost@anemail.c',
    ];
    invalidEmails.map(email => (
      it(`returns error message for ${email}`, () => {
        expect(emailValidation(email)).toBe('Should be a valid email');
      })
    ));
  });
});
