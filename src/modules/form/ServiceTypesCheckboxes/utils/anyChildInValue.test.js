import { anyChildInValue } from '../utils';

describe('anyChildInValue', () => {
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

  const valueKey = 'id';

  it('returns false if nothing is passed in', () => {
    expect(anyChildInValue()).toBeFalsy();
  });

  it('returns false if none of the parent\'s children is in the top level of the value array', () => {
    expect(anyChildInValue(parent, [parent], valueKey)).toBeFalsy();
  });

  it('returns true if at least one of the parent\'s children are in the top level of the value array]', () => {
    expect(anyChildInValue(parent, [childOne], valueKey)).toBeTruthy();
  });
});
