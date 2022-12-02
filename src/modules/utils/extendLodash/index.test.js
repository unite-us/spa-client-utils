import _ from 'lodash';
import extendLodash from './index';

extendLodash();

describe('extendLodash', () => {
  const obj = {
    aaa: 1,
    bbb: 2,
    ccc: 3,
  };
  const numberKeys = {
    1: 'bla',
    2: 'blu',
    3: 'blo',
  };
  it('wGet', () => {
    const spy = jest.spyOn(console, 'warn')
      .mockImplementation(() => 42);
    const result = _.wget(obj, 'd', 'not found');
    expect(result).toBe('not found');
    expect(spy).toBeCalledWith('Default Value was used @ path: d');

    spy.mockRestore();
  });
  it('uuOmit', () => {
    const result = _.uuOmit(obj, 'bbb');
    const expected = { aaa: 1, ccc: 3 };
    expect(result).toEqual(expected);
  });
  it('uuOmit numeric keys', () => {
    const result = _.uuOmit(numberKeys, 2);
    const expected = { 1: 'bla', 3: 'blo' };
    expect(result).toEqual(expected);
  });
  it('uuOmitBy', () => {
    const result = _.uuOmitBy(obj, v => v <= 2);
    const expected = { ccc: 3 };
    expect(result).toEqual(expected);
  });
  it('uuPick', () => {
    const result = _.uuPick(obj, 'bbb', 'ccc');
    const expected = { bbb: 2, ccc: 3 };
    expect(result).toEqual(expected);
  });
  it('uuPick numeric keys', () => {
    const result = _.uuPick(numberKeys, 2, 3);
    const expected = { 2: 'blu', 3: 'blo' };
    expect(result).toEqual(expected);
  });
  it('uuPickBy', () => {
    const result = _.uuPickBy(obj, v => v <= 2);
    const expected = { aaa: 1, bbb: 2 };
    expect(result).toEqual(expected);
  });
  it('uuCompactArrayOrObject', () => {
    const intake = {
      care_coordinator_id: '123-4',
      contact: {
        first_name: 'damian',
        last_name: 'ten',
      },
      household_count: '',
    };

    const newIntake = {
      care_coordinator_id: '123-4',
      contact: {
        first_name: 'damian',
        last_name: 'ten',
      },
    };

    expect(_.uuCompactArrayOrObject(intake)).toEqual(newIntake);
  });

  describe('recursiveGet', () => {
    it('returns the first defined value', () => {
      const collection = {
        key1: { value: 'I exist' },
        key2: { other: 'I too exist' },
        parent: {
          child: { value: 'Me too' },
        },
      };
      const result = _.recursiveGet(collection, ['key1.value', 'key2.other', 'parent.child.value'], 'default');

      expect(result).toBe('I exist');
    });

    it('returns the first defined value it finds', () => {
      const collection = {
        key1: {},
        key2: null,
        parent: {
          child: { value: 'Me too' },
        },
      };
      const result = _.recursiveGet(collection, ['key1.value', 'key2.other', 'parent.child.value'], 'default');

      expect(result).toBe('Me too');
    });

    it('returns default value', () => {
      const collection = {
        key1: {},
        key2: null,
        parent: {},
      };
      const result = _.recursiveGet(collection, ['key1.value', 'key2.other', 'parent.child.value'], 'default');

      expect(result).toBe('default');
    });

    it('returns the first defined value matching iterator', () => {
      const collection = {
        key1: { value: {} },
        key2: { other: 'I too exist' },
        parent: {
          child: { value: 'Me too' },
        },
      };
      const result = _.recursiveGet(
        collection,
        ['key1.value', 'key2.other', 'parent.child.value'],
        'default',
        _.isString,
      );

      expect(result).toBe('I too exist');
    });
  });
});
