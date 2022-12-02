import maskValidation from './maskValidation';

describe('maskValidation', () => {
  it('returns null for empty value', () => {
    expect(maskValidation('', undefined, '\\d*')).toBeNull();
  });

  it('validates medicare format', () => {
    const medicareFormat = '^\\d{1}[A-Z]{1}\\w{1}\\d{1}[A-Z]{1}\\w{1}\\d{1}[A-Z]{2}\\d{2}$';
    const message = 'should match';

    expect(maskValidation('1FE3K89HK13', undefined, medicareFormat)).toBeNull();
    expect(maskValidation('1F33KK9HD12', undefined, medicareFormat)).toBeNull();

    expect(maskValidation('1F33KK9HD123', message, medicareFormat)).toBe(message);
    expect(maskValidation('1F33KK9HD1', message, medicareFormat)).toBe(message);
    expect(maskValidation('1333KK9HD14', message, medicareFormat)).toBe(message);

  });
});
