import getStaticMapScheme from './getStaticMapScheme';

describe('getStaticMapScheme', () => {
  const scheme = [{
    featureType: 'landscape.man_made',
    elementType: 'geometry.fill',
    stylers: [
      { visibility: 'off' },
    ],
  }];

  it('creates an encoded URI string from a google map styles JSON object', () => {
    expect(getStaticMapScheme(scheme))
      .toEqual('style=feature:landscape.man_made%7Celement:geometry.fill%7Cvisibility:off');
  });
});
