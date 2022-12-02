import isFieldRequired from './isFieldRequired';

describe('isFieldRequired', () => {
  it('returns false if no presence validation', () => {
    expect(isFieldRequired()).toBeFalsy();
    expect(isFieldRequired([{ validation_type: 'some other type' }])).toBeFalsy();
  });
  it('returns true if presence validation', () => {
    expect(isFieldRequired([
      { validation_type: 'some other type' },
      { validation_type: 'presence' },
    ])).toBeTruthy();
  });
});
