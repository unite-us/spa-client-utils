import addHttpIfNeeded from './addHttpIfNeeded';

describe('addHttpIfNeeded', () => {
  it('returns the valid url unchanged', () => {
    expect(addHttpIfNeeded('http://bla.com')).toBe('http://bla.com');
    expect(addHttpIfNeeded('https://bla.com')).toBe('https://bla.com');
  });

  it('adds the http protocol', () => {
    expect(addHttpIfNeeded('bla.com')).toBe('http://bla.com');
  });
});
