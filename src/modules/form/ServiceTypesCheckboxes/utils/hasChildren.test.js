import hasChildren from './hasChildren';

describe('hasChildren', () => {
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
  it('returns false if the item does not have a children node', () => {
    expect(hasChildren(childOne)).toBeFalsy();
  });

  it('returns false if the item has an empty children array', () => {
    expect(hasChildren({ ...parent, children: [] })).toBeFalsy();
  });

  it('returns true if the item has a populated children array', () => {
    expect(hasChildren(parent)).toBeTruthy();
  });
});
