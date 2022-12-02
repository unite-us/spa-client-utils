import moveOptionToEnd from './moveOptionToEnd';

describe('moveOptionToEnd', () => {
  describe('string value comparisons', () => {
    const bob = { value: 'bob', label: 'Bob Opedic' };
    const miles = { value: 'miles', label: 'Miles Opedic' };
    const tyler = { value: 'tyler', label: 'Tyler Opedic' };
    const options = [miles, bob, tyler];

    describe('default valueKey', () => {
      it('moves option with the given value to the end', () => {
        expect(
          moveOptionToEnd({ options, value: 'Miles' }),
        ).toEqual([bob, tyler, miles]);
      });

      it('keeps option at the end of the list if it is already there', () => {
        expect(
          moveOptionToEnd({ options, value: 'tyler' }),
        ).toEqual([miles, bob, tyler]);
      });

      it('returns the original list if the option is not found by value', () => {
        expect(
          moveOptionToEnd({ options, value: 'other' }),
        ).toEqual([miles, bob, tyler]);
      });
    });
  });

  describe('complex values', () => {
    const bob = { value: { name: 'bob' }, label: 'Bob Opedic' };
    const miles = { value: { name: 'miles' }, label: 'Miles Opedic' };
    const tyler = { value: { name: 'tyler' }, label: 'Tyler Opedic' };
    const options = [miles, bob, tyler];

    describe('object value comparisons', () => {
      it('moves option with the given value to the end', () => {
        expect(
          moveOptionToEnd({ options, value: miles.value }),
        ).toEqual([bob, tyler, miles]);
      });

      it('keeps option at the end of the list if it is already there', () => {
        expect(
          moveOptionToEnd({ options, value: tyler.value }),
        ).toEqual([miles, bob, tyler]);
      });

      it('returns the original list if the option is not found by value', () => {
        expect(
          moveOptionToEnd({ options, value: { name: 'other' } }),
        ).toEqual([miles, bob, tyler]);
      });
    });

    describe('custom valueKey (value.name)', () => {
      const valueKey = 'value.name';
      it('moves option with the given value to the end', () => {
        expect(
          moveOptionToEnd({ options, value: 'Miles', valueKey }),
        ).toEqual([bob, tyler, miles]);
      });

      it('keeps option at the end of the list if it is already there', () => {
        expect(
          moveOptionToEnd({ options, value: 'tyler', valueKey }),
        ).toEqual([miles, bob, tyler]);
      });

      it('returns the original list if the option is not found by value', () => {
        expect(
          moveOptionToEnd({ options, value: 'other', valueKey }),
        ).toEqual([miles, bob, tyler]);
      });
    });
  });
});
