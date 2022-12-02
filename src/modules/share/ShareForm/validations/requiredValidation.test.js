import requiredValidation from './requiredValidation';

describe('requiredValidation', () => {
  describe('value is empty', () => {
    it('returns error message for undefined value', () => {
      expect(requiredValidation()).toBe('Required');
    });
    it('returns error message for empty string value', () => {
      expect(requiredValidation('')).toBe('Required');
    });
  });

  describe('non-empty values', () => {
    const nonEmptyValues = [
      'a',
      'a looooooooooong string value',
      123,
      -1,
      0,
      ' ',
    ];
    nonEmptyValues.map(value => (
      it(`returns undefined for '${value}'`, () => {
        expect(requiredValidation(value)).toBeUndefined();
      })
    ));
  });
});
