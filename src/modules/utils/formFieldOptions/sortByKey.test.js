import sortByKey from './sortByKey';

const alpha = { label: 'alpha', reverse: 'ahpla' };
const beta = { label: 'beta', reverse: 'ateb' };
const delta = { label: 'delta', reverse: 'atled' };
const gamma = { label: 'gamma', reverse: 'ammag' };

describe('sortByKey', () => {
  describe('sort by default key (label)', () => {
    it('sorts list of options by label in ascending order', () => {
      const options = [beta, gamma, alpha, delta];
      expect(
        sortByKey({ options }),
      ).toEqual([alpha, beta, delta, gamma]);
    });

    it('sorts list of options by label in descending order', () => {
      const options = [beta, gamma, alpha, delta];
      expect(
        sortByKey({ options, sortDirection: 'desc' }),
      ).toEqual([gamma, delta, beta, alpha]);
    });

    it('maintains list order when already sorted by label ascending', () => {
      const options = [alpha, beta, delta, gamma];
      expect(
        sortByKey({ options }),
      ).toEqual([alpha, beta, delta, gamma]);
    });

    it('maintains list order when already sorted by label descending', () => {
      const options = [gamma, delta, beta, alpha];
      expect(
        sortByKey({ options, sortDirection: 'desc' }),
      ).toEqual([gamma, delta, beta, alpha]);
    });
  });

  describe('sort by custom key (reverse)', () => {
    const sortKey = 'reverse';

    it('sorts list of options by reverse in ascending order', () => {
      const options = [beta, gamma, alpha, delta];
      expect(
        sortByKey({ options, sortKey }),
      ).toEqual([alpha, gamma, beta, delta]);
    });

    it('sorts list of options by reverse in descending order', () => {
      const options = [beta, gamma, alpha, delta];
      expect(
        sortByKey({ options, sortKey, sortDirection: 'desc' }),
      ).toEqual([delta, beta, gamma, alpha]);
    });
  });
});
