import { hideAddButton } from '../utils';

describe('hideAddButton', () => {
  it('returns true when index is not last element in list', () => {
    expect(hideAddButton(2, 0)).toBeTruthy();
    expect(hideAddButton(5, 2)).toBeTruthy();
  });
  it('returns false when index is last element in list', () => {
    expect(hideAddButton(1, 0)).toBeFalsy();
    expect(hideAddButton(2, 1)).toBeFalsy();
    expect(hideAddButton(4, 3)).toBeFalsy();
  });
});
