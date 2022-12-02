import { removeChildren } from '../utils';

describe('removeChildren', () => {
  const parent = {
    id: '1',
    code: 'UU-FOOD',
    name: 'Food Assistance',
    children: [],
    restrict_to_parent: true,
  };
  const childOne = {
    id: '1-child',
    code: 'UU-BENEFITS-BENEFITS-ELIGIBILITY-SCREENING',
    name: 'Benefits Eligibility Screening',
  };
  const childTwo = {
    id: '2-child',
    code: 'UU-BENEFITS-DISABILITY-BENEFITS',
    name: 'Disability Benefits',
  };
  const childThree = {
    id: '3-child',
    code: 'UU-BENEFITS-HEALTH-INSURANCE-BENEFITS',
    name: 'Health Insurance/Benefits',
  };
  const values = [parent, childOne, childTwo, childThree];
  const children = [childOne, childTwo, childThree];
  const valueKey = 'id';

  it('returns an empty array if nothing is passed in', () => {
    expect(removeChildren()).toHaveLength(0);
  });

  it('returns an array if no children are in the values array', () => {
    expect(removeChildren([parent], children, valueKey)).toEqual([
      parent,
    ]);
  });

  it('returns an values array with the found children removed', () => {
    expect(removeChildren(values, children, valueKey)).toEqual([
      parent,
    ]);
  });
});
