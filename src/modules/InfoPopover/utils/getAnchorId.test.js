import getAnchorId from './getAnchorId';

describe('getAnchorId', () => {
  it('returns an anchor id based on the given id', () => {
    expect(getAnchorId('123')).toBe('anchor-id-123');
  });
});
