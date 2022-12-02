import findClosestDistanceAddress from './findClosestDistanceAddress';

describe('findClosestDistanceAddress', () => {
  it('findClosestDistanceAddress', () => {
    const addresses = [
      {
        displayName: '1015 Summit Ave, The Bronx, NY 10452',
        distance: '1,079.56 mi',
        distanceVal: 1079.56,
      },
      {
        displayName: '11344 Maple Tree Ct, Boca Raton, FL 33428',
        distance: '18.09 mi',
        distanceVal: 18.09,
      },
    ];

    const closestDistanceAddress = findClosestDistanceAddress(addresses);
    expect(closestDistanceAddress.displayName).toEqual(addresses[1].displayName);
    expect(closestDistanceAddress.distance).toEqual(addresses[1].distance);
    expect(closestDistanceAddress.distanceVal).toEqual(addresses[1].distanceVal);
  });
});
