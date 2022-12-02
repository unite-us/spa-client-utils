import { allChildrenInValue } from '../utils';

describe('allChildrenInValue', () => {
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
      childTwo,
      childThree,
    ],
    parent_service_type: null,
    facet: null,
  };

  const value = [
    parent,
    childOne,
    childTwo,
    childThree,
  ];

  const valueKey = 'id';

  it('returns false if nothing is passed in', () => {
    expect(allChildrenInValue()).toBeFalsy();
  });

  it('returns false if not all of the parent\'s children are selected and in the top level of the value array', () => {
    const newValue = [
      parent,
      childOne,
    ];

    expect(allChildrenInValue(parent, newValue, valueKey)).toBeFalsy();
  });

  it('returns true if all of the parent\'s children are also in the top level of the value array', () => {
    expect(allChildrenInValue(parent, value, valueKey)).toBeTruthy();
  });
});
