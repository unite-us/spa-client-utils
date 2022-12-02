import matchingServiceTypes from './matchingServiceTypes';

const groupTypes = [
  { id: 'st-1' },
  { id: 'st-2' },
  {
    id: 'st-3',
    children: [
      { id: 'st-4' },
      { id: 'st-5' },
      { id: 'st-6' },
    ],
  },
];

describe('matchingServiceTypes', () => {
  it('sends back an array of one when object is given', () => {
    const selectedServiceType = { id: 'st-1' };
    const result = matchingServiceTypes(selectedServiceType, groupTypes);
    expect(result).toEqual([selectedServiceType]);
  });

  it('sends back an array of one when array of one is given', () => {
    const selectedServiceType = [{ id: 'st-1' }];
    const result = matchingServiceTypes(selectedServiceType, groupTypes);
    expect(result).toEqual(selectedServiceType);
  });

  it('sends back a matching array', () => {
    const selectedServiceType = [{ id: 'st-1' }, { id: 'st-2' }, { id: 'st-not-in-group-types' }];
    const result = matchingServiceTypes(selectedServiceType, groupTypes);
    expect(result).toEqual([{ id: 'st-1' }, { id: 'st-2' }]);
  });

  it('sends back a matching array when a child is provided', () => {
    const selectedServiceType = [{ id: 'st-1' }, { id: 'st-5' }, { id: 'st-not-in-group-types' }];
    const result = matchingServiceTypes(selectedServiceType, groupTypes);
    expect(result).toEqual([{ id: 'st-1' }, { id: 'st-5' }]);
  });
});
