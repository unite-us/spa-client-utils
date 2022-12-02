import flattenServiceTypes from './flattenServiceTypes';

const groupTypes = [
  { id: 'st-1' },
  {
    id: 'st-2',
    children: [
      { id: 'st-3' },
      { id: 'st-4' },
    ],
  },
];

describe('flattenServiceTypes', () => {
  describe('with parents', () => {
    const expectedResult = [
      { id: 'st-1' },
      { id: 'st-2' },
      { id: 'st-3' },
      { id: 'st-4' },
    ];

    it('flattens children', () => {
      const result = flattenServiceTypes(groupTypes, true);
      expect(result).toEqual(expectedResult);
    });

    it('flattens array of arrays', () => {
      const result = flattenServiceTypes([groupTypes], true);
      expect(result).toEqual(expectedResult);
    });

    it('flattens array of arrays into unique array', () => {
      const result = flattenServiceTypes([groupTypes, groupTypes], true);
      expect(result).toEqual(expectedResult);
    });
  });
  describe('without parents', () => {
    const expectedResult = [
      { id: 'st-1' },
      { id: 'st-3' },
      { id: 'st-4' },
    ];

    it('flattens children', () => {
      const result = flattenServiceTypes(groupTypes, false);
      expect(result).toEqual(expectedResult);
    });

    it('flattens array of arrays', () => {
      const result = flattenServiceTypes([groupTypes], false);
      expect(result).toEqual(expectedResult);
    });

    it('flattens array of arrays into unique array', () => {
      const result = flattenServiceTypes([groupTypes, groupTypes], false);
      expect(result).toEqual(expectedResult);
    });
  });
});
