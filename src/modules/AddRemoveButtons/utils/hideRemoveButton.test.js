import { hideRemoveButton } from '../utils';

describe('hideRemoveButton', () => {
  it('returns true when only one element in the list', () => {
    expect(hideRemoveButton(1, 0)).toBeTruthy();
    expect(hideRemoveButton(0, 0)).toBeTruthy();
  });
  it('returns false when more than one element in the list', () => {
    expect(hideRemoveButton(1, 1)).toBeFalsy();
    expect(hideRemoveButton(2, 0)).toBeFalsy();
    expect(hideRemoveButton(4, 0)).toBeFalsy();
  });
  it('returns false if customHideRemoveButton is a function and returns false', () => {
    const customHideRemoveButton = jest.fn();
    expect(hideRemoveButton(1, 0, customHideRemoveButton)).toBeFalsy();
    expect(hideRemoveButton(0, 0, customHideRemoveButton)).not.toBeTruthy();
  });
});
