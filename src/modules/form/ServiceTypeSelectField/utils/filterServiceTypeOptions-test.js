import filterServiceTypeOptions from './filterServiceTypeOptions';

const options = [
  {
    name: 'Category 1',
    children: [
      { name: 'benefits for category 1' },
      { name: 'education for category 2' },
    ],
  },
  {
    name: 'Category 2',
    children: [
      { name: 'disability for category 2' },
      { name: 'housing for category 1' },
    ],
  },
  {
    name: 'Category 3',
    children: [
      { name: 'Moving assistance for category 3' },
      { name: 'Taxes for category 3' },
    ],
  },
];

describe('filterServiceTypeOptions', () => {
  it('returns entire category on matching search search', () => {
    const expected = [options[2]];
    expect(filterServiceTypeOptions(options, 'category 3')).toEqual(expected);
  });

  it('returns child and its category when only that child matches search', () => {
    const expected = [
      options[0],
      {
        name: 'Category 2',
        children: [{ name: 'housing for category 1' }],
      },
    ];
    expect(filterServiceTypeOptions(options, 'category 1')).toEqual(expected);
  });

  it('returns an empty array for search entries with no matches', () => {
    expect(filterServiceTypeOptions(options, 'category 4')).toEqual([]);
  });

  it('returns all options when search text is empty', () => {
    expect(filterServiceTypeOptions(options, '')).toEqual(options);
  });

  it('returns child and its category when the child matches the search and when the options structure includes a label instead of a name', () => {
    const networkBrowseOptions = [
      {
        label: 'Category 1',
        children: [
          { label: 'benefits for category 1' },
          { label: 'education for category 2' },
        ],
      },
      {
        label: 'Category 2',
        children: [
          { label: 'disability for category 2' },
          { label: 'housing for category 1' },
        ],
      },
      {
        label: 'Category 3',
        children: [
          { label: 'Moving assistance for category 3' },
          { label: 'Taxes for category 3' },
        ],
      },
    ];
    expect(filterServiceTypeOptions(networkBrowseOptions, '')).toEqual(networkBrowseOptions);
  });
});
