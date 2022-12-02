import stringifyAddress from './stringifyAddress';

describe('stringifyAddress', () => {
  it('returns an empty string for an empty address', () => {
    expect(stringifyAddress()).toBe('');
  });

  it('returns a formatted string for an incomplete address', () => {
    const address = {
      line_1: { input: { value: 'street' } },
      city: { input: { value: 'city' } },
      state: { input: { value: '' } },
      postal_code: { input: { value: 'CP' } },
    };
    expect(stringifyAddress(address)).toBe('street, city, CP');
  });

  it('returns a formatted string for a complete address', () => {
    const address = {
      line_1: { input: { value: 'street' } },
      city: { input: { value: 'city' } },
      state: { input: { value: 'state' } },
      postal_code: { input: { value: 'CP' } },
    };
    expect(stringifyAddress(address)).toBe('street, city, state CP');
  });
});
