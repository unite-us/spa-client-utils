import { addOrRemoveParentChildren } from '../utils';

describe('addOrRemoveParentChildren', () => {
  const item = {
    id: '1',
    code: 'UU-BENEFITS-HEALTH-INSURANCE-BENEFITS-E-G-MEDICARE-MEDICAID-PROGRAMS',
    name: 'Health Insurance/Benefits (e.g. Medicare & Medicaid programs)',
  };

  const childOne = {
    id: '8',
    code: 'UU-FOOD-EMERGENCY-FOOD-FOOD-PANTRIES',
    name: 'Emergency Food (Food Pantries)',
  };
  const childTwo = {
    id: '9',
    code: 'UU-FOOD-FOOD-EXPENSE-ASSISSTANCE',
    name: 'Food Expense Assisstance',
  };

  const childThree = {
    id: '4',
    code: 'UU-BENEFITS-BENEFITS-ELIGIBILITY-SCREENING',
    name: 'Benefits Eligibility Screening',
  };


  const childFour = {
    id: '10',
    code: 'UU-FOOD-FOOD-FOOD-FOOD',
    name: 'Food Food Food',
  };

  const parent = {
    id: '2',
    code: 'UU-FOOD',
    name: 'Food Assistance',
    children: [
      childOne,
      childTwo,
      childFour,
    ],
    restrict_to_parent: true,
  };

  const parentTwo = {
    id: '3',
    code: 'UU-BENEFITS',
    name: 'Benefits',
    children: [
      childThree,
      item,
    ],
    parent_service_type: null,
    facet: null,
  };

  const oldValue = [];

  const valueKey = 'id';
  const allOptions = [
    parentTwo,
    parent,
  ];
  const level = 1;
  const autoSelectParent = true;
  const autoSelectChildren = true;

  it('returns an empty array if nothing is passed in', () => {
    expect(addOrRemoveParentChildren()).toEqual([]);
  });

  describe('when a selected item is a parent, the level will be 0', () => {
    it('if it is not in the old value, it will add the selected parent and all children to the new value', () => {
      const params = [
        parent,
        [],
        valueKey,
        allOptions,
        0,
        autoSelectParent,
        autoSelectChildren,
      ];
      expect(addOrRemoveParentChildren(...params)).toEqual([parent, childOne, childTwo, childFour]);
    });

    it('if autoSelectChildren is false and it is not in the old value, it will add the selected parent only to the new value', () => {
      const params = [
        parent,
        [],
        valueKey,
        allOptions,
        0,
        autoSelectParent,
        false,
      ];
      expect(addOrRemoveParentChildren(...params)).toEqual([parent]);
    });

    it('if it is in the old value, it will remove the selected parent and all children from the new value', () => {
      const params = [
        parent,
        [parent],
        valueKey,
        allOptions,
        0,
        autoSelectParent,
        autoSelectChildren,
      ];
      expect(addOrRemoveParentChildren(...params)).toEqual([]);
    });
  });


  describe('when a selected item is a child, the level will be 1', () => {
    it('if not in the old value, it adds the selected child and the parent to the new value', () => {
      const params = [
        childTwo,
        oldValue,
        valueKey,
        allOptions,
        level,
        autoSelectParent,
        autoSelectChildren,
      ];
      expect(addOrRemoveParentChildren(...params)).toEqual([childTwo, parent]);
    });
    it('if already in the value, it removes the selected child and parent from the new value', () => {
      const params = [
        childTwo,
        [childTwo, parent],
        valueKey,
        allOptions,
        level,
        autoSelectParent,
        autoSelectChildren,
      ];
      expect(addOrRemoveParentChildren(...params)).toEqual([]);
    });
    it('if a selected child has a sibling in the old value, it will only remove the selected child', () => {
      const params = [
        childOne,
        [childOne, childTwo, parent],
        valueKey,
        allOptions,
        level,
        autoSelectParent,
        autoSelectChildren,
      ];
      expect(addOrRemoveParentChildren(...params)).toEqual([childTwo, parent]);
    });
  });
});
