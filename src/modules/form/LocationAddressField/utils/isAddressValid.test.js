import isAddressValid from './isAddressValid';

describe('isAddressValid', () => {
  it('returns true if all address fields are empty', () => {
    expect(isAddressValid({
      city: { input: { value: '' } },
      postal_code: { input: { value: '' } },
      state: { input: { value: '' } },
    })).toBe(true);
  });

  it('returns true if city and state are set', () => {
    expect(isAddressValid({
      city: { input: { value: 'valid' } },
      postal_code: { input: { value: 'valid' } },
      state: { input: { value: 'valid' } },
    })).toBe(true);
  });

  it('returns false if state is set without a city', () => {
    expect(isAddressValid({
      city: { input: { value: '' } },
      postal_code: { input: { value: '' } },
      state: { input: { value: 'valid' } },
    })).toBe(false);
  });
});
