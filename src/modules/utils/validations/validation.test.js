import {
  isRequired,
  isEmail,
  isUrl,
  containsUppercase,
  containsLowercase,
  containsDigit,
  containsSpecialChars,
  isEqual,
  isDifferent,
  isLongerThan,
  isShorterThan,
  isNumber,
  isInteger,
  includes,
  excludes,
  hasAtLeastOne,
  hasAtLeastN,
  hasAtMostN,
  isPhoneNumber,
  isGreaterThan,
  isLessThan,
  isGreaterOrEqualThan,
  isLessOrEqualThan,
  isPositiveNumber,
  isFieldRequired,
  isValidUUID,
} from './validations';

describe('validations', () => {
  it('returns a message for required empty value', () => {
    expect(isRequired('')).toEqual('Required');
  });
  it('returns a message for required empty array value', () => {
    expect(isRequired([])).toEqual('Required');
  });
  it('returns null for required value', () => {
    expect(isRequired('hello')).toEqual(null);
  });
  it('returns a message for invalid email', () => {
    expect(isEmail('hello', 'message')).toEqual('message');
  });
  it('returns a message if no uppercase in value', () => {
    expect(containsUppercase('hello', 'message')).toEqual('message');
  });
  it('returns a message if no lowercase in value', () => {
    expect(containsLowercase('HELLO', 'message')).toEqual('message');
  });
  it('returns a message if no digit in value', () => {
    expect(containsDigit('hello', 'message')).toEqual('message');
  });
  it('returns a message if no special char in value', () => {
    expect(containsSpecialChars('hello', 'message')).toEqual('message');
  });
  it('returns a message if value is not equal to arg', () => {
    expect(isEqual('hello', 'message', 'hi')).toEqual('message');
  });
  it('returns a message if value is equal to arg', () => {
    expect(isDifferent('hi', 'message', 'hi')).toEqual('message');
  });
  it('returns a message if value is not longer than 3', () => {
    expect(isLongerThan('hi', 'message', 3)).toEqual('message');
  });
  it('returns a message if value is not shorter than 3', () => {
    expect(isShorterThan('hello', 'message', 3)).toEqual('message');
  });
  it('returns a message if value is not a number', () => {
    expect(isNumber('hello', 'message')).toEqual('message');
  });
  it('returns a message if value is not an integer', () => {
    expect(isInteger(3.14, 'message')).toEqual('message');
  });
  it('returns a message if value is not included in args', () => {
    expect(includes('hello', 'message', ['hi', 'hey'])).toEqual('message');
  });
  it('returns a message if value is not excluded in args', () => {
    expect(excludes('hello', 'message', ['hello', 'hi', 'hey'])).toEqual('message');
  });
  it('returns a message if value has less than one element', () => {
    expect(hasAtLeastOne([], 'message')).toEqual('message');
  });
  it('returns a message if value is less than number', () => {
    expect(isGreaterThan(-5, 'message', 0)).toEqual('message');
  });
  it('returns a message if value is greater than number', () => {
    expect(isLessThan(5, 'message', 0)).toEqual('message');
  });
  it('returns a message if value is less than number', () => {
    expect(isGreaterOrEqualThan(-5, 'message', 0)).toEqual('message');
    expect(isGreaterOrEqualThan(5, 'message', 5)).toEqual(null);
  });
  it('returns a message if value is greater than number', () => {
    expect(isLessOrEqualThan(5, 'message', 0)).toEqual('message');
    expect(isLessOrEqualThan(5, 'message', 5)).toEqual(null);
  });
  it('returns a message if value is not a positive number', () => {
    expect(isPositiveNumber(-5, 'message', 0)).toEqual('message');
  });
  it('returns a message if value has not at least number', () => {
    expect(hasAtLeastN(['one', 'two'], 'message', 3)).toEqual('message');
  });
  it('returns a message if value has not at most number', () => {
    expect(hasAtMostN(['one', 'two'], 'message', 1)).toEqual('message');
  });
  it('returns no message if value is empty', () => {
    expect(hasAtMostN('', 'message', 1)).toEqual(null);
  });
  it('returns true if one of the validations is isRequired', () => {
    const val = [
      { func: isRequired, message: 'message' },
      { func: value => value, message: 'message' },
    ];
    expect(isFieldRequired(val)).toEqual(true);
  });

  describe('isUrl', () => {
    it('valid and returns null', () => {
      expect(isUrl('http://www.nfl.com')).toBeNull();
      expect(isUrl()).toBeNull();
      expect(isUrl('https:google.com')).toBeNull();
      expect(isUrl('https://google.com')).toBeNull();
      expect(isUrl('http://www.google.com.au')).toBeNull();
      expect(isUrl('http://www.google.com.au/absc')).toBeNull();
      expect(isUrl('http://www.google.com.au/absc?ddd-gdnd@d-1')).toBeNull();
      expect(isUrl('http://www.google.com:8001/index.html')).toBeNull();
      expect(isUrl('http://RefdlFeel.com?3i2sk')).toBeNull();
      expect(isUrl('www.nfl.com')).toBeNull();
    });

    it('invalid and returns message', () => {
      expect(isUrl('this is not a url')).toBe('Should be a valid url');
      expect(isUrl('http://.com')).toBe('Should be a valid url');
      expect(isUrl('http://word.c')).toBe('Should be a valid url');
    });
  });

  describe('isPhoneNumber', () => {
    it('valid and returns null', () => {
      expect(isPhoneNumber('')).toBeNull();
      expect(isPhoneNumber('(999) 888-1234 x 24')).toBeNull();
      expect(isPhoneNumber('99988881234')).toBeNull();
    });
    it('invalid and returns message', () => {
      const message = 'Must be at least 10 digits';
      expect(isPhoneNumber('(999) 888-123')).toBe(message);
      expect(isPhoneNumber('99988881')).toBe(message);
    });
  });

  describe('isValidUUID', () => {
    it('valid and returns null', () => {
      expect(isValidUUID('e3edc63d-4bcc-43a1-9486-f2d53d90ad58')).toBe(false);
    });
    it('invalid and returns message', () => {
      const message = 'Should be a valid UUID';
      expect(isValidUUID('abc-123')).toBe(message);
      expect(isValidUUID('')).toBe(message);
    });
  });
});
