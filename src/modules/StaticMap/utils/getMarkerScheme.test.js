import getMarkerScheme from './getMarkerScheme';

describe('getMarkerScheme', () => {
  const scheme = {
    icon: 'http://someicon.com/makrer',
    center: '33.812511, -117.918976',
  };

  it('should create an encoded URI string from a google map styles JSON object', () => {
    expect(getMarkerScheme(scheme))
      .toEqual('anchor:center%7Cicon:http://someicon.com/makrer%7C33.812511,%20-117.918976');
  });

  it('should not contain a "center" key for coordinates', () => {
    expect(getMarkerScheme(scheme)).not.toMatch(/center:/);
  });
});
