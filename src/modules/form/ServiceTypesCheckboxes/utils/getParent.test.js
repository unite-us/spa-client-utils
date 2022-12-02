import { getParent } from '../utils';

describe('getParent', () => {
  const childOne = {
    id: '1-1',
    code: 'UU-BENEFITS-BENEFITS-ELIGIBILITY-SCREENING',
    name: 'Benefits Eligibility Screening',
  };

  const childTwo = {
    id: '1-2',
    code: 'UU-BENEFITS-DISABILITY-BENEFITS',
    name: 'Disability Benefits',
  };

  const childThree = {
    id: '1-3',
    code: 'UU-BENEFITS-HEALTH-INSURANCE-BENEFITS',
    name: 'Health Insurance/Benefits',
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

  const allOptions = [
    parent,
    childOne,
    childTwo,
    childThree,
  ];

  const valueKey = 'id';

  it('returns undefined if a parent is not found', () => {
    expect(getParent(parent, allOptions, valueKey)).toBeUndefined();
  });

  it('returns the parent of a selected child', () => {
    expect(getParent(childOne, allOptions, valueKey)).toEqual(parent);
  });
});
