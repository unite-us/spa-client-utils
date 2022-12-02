import { isAutoAdded } from '../utils';

describe('isAutoAdded', () => {
  const opt = {
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
  const childFour = {
    id: '2-1',
    code: 'UU-CLOTHING-APPLIANCES',
    name: 'Appliances',
  };

  const parent = {
    id: '1',
    code: 'UU-BENEFITS',
    name: 'Benefits',
    children: [
      opt,
      childTwo,
      childThree,
    ],
    parent_service_type: null,
    facet: null,
  };
  const parentTwo = {
    id: '2',
    code: 'UU-CLOTHING',
    name: 'Clothing & Household Goods',
    children: [],
    parent_service_type: null,
    facet: null,
  };

  const level = 0;
  const autoSelectParent = true;
  const autoSelectChildren = true;

  const allOptions = [
    parent,
    parentTwo,
  ];

  const value = [
    parent,
    opt,
    childTwo,
    childThree,
  ];

  const valueKey = 'id';

  describe('returns false', () => {
    it('if nothing is passed in', () => {
      expect(isAutoAdded()).toBeFalsy();
    });

    it('if option is not selected', () => {
      expect(isAutoAdded({ opt: childFour, value, allOptions, valueKey, level, autoSelectParent, autoSelectChildren })).toBeFalsy();
    });

    it('if autoSelectParent is false', () => {
      expect(isAutoAdded({ opt: childFour, value: [...value, childFour], allOptions, valueKey, level, autoSelectParent: false, autoSelectChildren })).toBeFalsy();
    });

    it('if autoSelectParent and autoSelectChildren are true, and the parent is selected, but none of the children are', () => {
      expect(isAutoAdded({ opt: parent, value: [parent, childFour], allOptions, valueKey, level, autoSelectParent, autoSelectChildren })).toBeFalsy();
    });

    it('if autoSelectParent, not autoSelectChildren, and option selected has no children', () => {
      expect(isAutoAdded({ opt: parentTwo, value: [parentTwo, opt, childFour], allOptions, valueKey, level, autoSelectParent, autoSelectChildren: false })).toBeFalsy();
    });
  });

  describe('returns true if option is selected and', () => {
    it('autoSelectParent is true and the option has a parent', () => {
      expect(isAutoAdded({ opt, value: [...value, opt], allOptions, valueKey, level, autoSelectParent, autoSelectChildren })).toBeTruthy();
    });

    it('if autoSelectParent, not autoSelectChildren, and a child is selected, and the parent is selected', () => {
      expect(isAutoAdded({ opt: parent, value: [parent, opt, childFour], allOptions, valueKey, level, autoSelectParent, autoSelectChildren: false })).toBeTruthy();
    });

    it('if autoSelectParent and autoSelectChildren are true, and a child is selected, and the parent is selected', () => {
      expect(isAutoAdded({ opt: parent, value: [parent, opt, childFour], allOptions, valueKey, level, autoSelectParent, autoSelectChildren })).toBeTruthy();
    });
  });
});

