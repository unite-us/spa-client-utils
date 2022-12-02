import { autoAddChildren } from '../utils';

describe('autoAddChildren', () => {
  it('returns a new array consisting of the existing values and newly added children', () => {
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


    expect(autoAddChildren([parent], [childThree, childOne])).toEqual([
      parent,
      childThree,
      childOne,
    ]);
  });
});
