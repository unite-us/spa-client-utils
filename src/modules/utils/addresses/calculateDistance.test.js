import calculateDistance from './calculateDistance';

describe('calculateDistance', () => {
  it('formats and calculate address distances', () => {
    const originLatLng = [26.1076663, -80.2711588];
    const addresses = [
      {
        address_type: 'unknown',
        line_1: '1015 Summit Ave',
        line_2: null,
        city: 'The Bronx',
        county: 'Bronx County',
        state: 'NY',
        postal_code: '10452',
        country: 'United States',
        latitude: 40.8337705,
        longitude: -73.9301496,
        is_primary: null,
        lat_lng: [40.8337705, -73.9301496],
      },
      {
        address_type: 'unknown',
        line_1: '11344 Maple Tree Ct',
        line_2: null,
        city: 'Boca Raton',
        county: 'Palm Beach County',
        state: 'FL',
        postal_code: 33428,
        country: 'United States',
        latitude: 26.3629189,
        longitude: -80.2050498,
        is_primary: null,
        lat_lng: [26.3629189, -80.2050498],
      },
      {
        attributes: {
          city: 'New York',
          country: 'United States',
          postal_code: '10019',
          state: 'NY',
          county: 'New York County',
          latitude: 40.7685526,
          line_1: '10 Columbus Cir',
          line_2: null,
          longitude: -73.9831866,
          name: 'Cauliflower',
          phone_numbers: [{ phone_number: '1234567890', phone_type: 'phone', extension: 1 }],
          email_addresses: ['bronx@provider.com'],
        },
      },
    ];

    const calculatedDistances = addresses.map(address => calculateDistance(address, originLatLng));

    const expected = [
      {
        displayName: '1015 Summit Ave, The Bronx, NY 10452',
        distance: '1,079.56 mi',
        distanceVal: 1079.56,
        name: '',
        ...addresses[0],
      },
      {
        displayName: '11344 Maple Tree Ct, Boca Raton, FL 33428',
        distance: '18.09 mi',
        distanceVal: 18.09,
        name: '',
        ...addresses[1],
      },
      {
        displayName: '10 Columbus Cir, New York, NY 10019',
        distance: '1,074.35 mi',
        distanceVal: 1074.35,
        name: 'Cauliflower',
        phone_numbers: [{ phone_number: '1234567890', phone_type: 'phone', extension: 1 }],
        email_addresses: ['bronx@provider.com'],
        ...addresses[2].attributes,
      },
    ];

    expect(calculatedDistances).toEqual(expected);
  });
});

