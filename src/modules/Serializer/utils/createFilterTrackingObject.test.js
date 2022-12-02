import createFilterTrackingObject from './createFilterTrackingObject';

describe('createFilterTrackingObject', () => {
  const filters = {
    accessibility: [],
    addressType: 'client',
    address: {
      address: '2 e. 30th st, New York, NY 10016',
      id: '5d2114a0-9c58-4a8b-8e2e-bbc9e3c384cf',
      latLng: {
        lat: 40.7455198,
        lng: -73.9860217,
      },
    },
    catersTo: [],
    cities: [],
    counties: [],
    distance: '5',
    includeHomeGroups: false,
    languages: [],
    networks: [
      'c88b9628-b76c-434b-ad58-62bb2ca9d6c0',
    ],
    serviceTypes: [
      '3e3aef24-f58d-493e-a604-8fe87019b142',
    ],
    states: [],
    text: '',
  };

  it('returns an array of filter keys', () => {
    expect(createFilterTrackingObject(filters)).toEqual(['addressType', 'distance', 'serviceTypes']);
  });

  it('returns an empty array if no filter has been applied', () => {
    const emptyFilters = {
      ...filters,
      distance: '',
      serviceTypes: [],
      addressType: 'ours',
    };

    expect(createFilterTrackingObject(emptyFilters)).toEqual([]);
  });


  it('returns an empty array if the filter array is empty', () => {
    expect(createFilterTrackingObject([])).toEqual([]);
  });

  describe('returns distance', () => {
    it('if distance is not any', () => {
      expect(createFilterTrackingObject({ distance: '5' })).toEqual(['distance']);
      expect(createFilterTrackingObject({ distance: 'any' })).toEqual([]);
      expect(createFilterTrackingObject({ distance: undefined })).toEqual([]);
      expect(createFilterTrackingObject({ distance: null })).toEqual([]);
    });
    it('if distance is not an empty string', () => {
      expect(createFilterTrackingObject({ distance: '' })).toEqual([]);
    });
  });

  describe('returns addressType', () => {
    it('if addressType is not ours', () => {
      expect(createFilterTrackingObject({ addressType: 'ours' })).toEqual([]);
      expect(createFilterTrackingObject({ addressType: null })).toEqual([]);
      expect(createFilterTrackingObject({ addressType: undefined })).toEqual([]);
      expect(createFilterTrackingObject({ addressType: 'other' })).toEqual(['addressType']);
      expect(createFilterTrackingObject({
        addressType: {
          label: 'Client Address',
          value: 'client',
        } })).toEqual(['addressType']);
      expect(createFilterTrackingObject({
        addressType: {
          label: 'Our Address',
          value: 'ours',
        } })).toEqual([]);
    });
  });
});
