import { isSelected } from '../utils';

describe('isSelected', () => {
  const childOne = {
    id: '1-1',
    code: 'UU-BENEFITS-BENEFITS-ELIGIBILITY-SCREENING',
    name: 'Benefits Eligibility Screening',
  };

  const parent = {
    id: '1',
    code: 'UU-BENEFITS',
    name: 'Benefits',
    children: [
      childOne,
    ],
    parent_service_type: null,
    facet: null,
  };

  const valueKey = 'id';

  it('returns false if the option is not found in the values array', () => {
    expect(isSelected(childOne, [parent], valueKey)).toBeFalsy();
  });

  it('returns true if the option is found in the values array', () => {
    expect(isSelected(childOne, [parent, childOne], valueKey)).toBeTruthy();
  });
});

