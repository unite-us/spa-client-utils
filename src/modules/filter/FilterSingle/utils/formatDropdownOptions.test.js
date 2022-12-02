import formatDropdownOptions from './formatDropdownOptions';

describe('formatDropdownOptions', () => {
  it('formats list options as a flat array of objects so that nested options can appear with headers', () => {
    const options = [
      { label: 'opt 1', value: 'opt1' },
      {
        label: 'opt 2',
        value: 'opt2',
        children: [
          { label: 'opt 2-1', value: 'opt21' },
          {
            label: 'opt 2-2',
            value: 'opt22',
            children: [{ label: 'opt 2-2-1', value: 'opt221' }],
          },
        ],
      },
      { label: 'opt 3', value: 'opt3' },
    ];

    const expected = [{
      label: 'opt 1',
      value: 'opt1',
      hasChildren: false,
      level: 0,
    }, {
      label: 'opt 2',
      value: 'opt2',
      children: [{
        label: 'opt 2-1',
        value: 'opt21',
        hasChildren: false,
        level: 1,
      }, {
        label: 'opt 2-2',
        value: 'opt22',
        children: [{
          label: 'opt 2-2-1',
          value: 'opt221',
          hasChildren: false,
          level: 2,
        }],
        hasChildren: true,
        level: 1,
        disabled: true,
      }],
      hasChildren: true,
      level: 0,
      disabled: true,
    }, {
      label: 'opt 2-1',
      value: 'opt21',
      hasChildren: false,
      level: 1,
    }, {
      label: 'opt 2-2',
      value: 'opt22',
      children: [{
        label: 'opt 2-2-1',
        value: 'opt221',
        hasChildren: false,
        level: 2,
      }],
      hasChildren: true,
      level: 1,
      disabled: true,
    }, {
      label: 'opt 2-2-1',
      value: 'opt221',
      hasChildren: false,
      level: 2,
    }, {
      label: 'opt 3',
      value: 'opt3',
      hasChildren: false,
      level: 0,
    }];

    expect(formatDropdownOptions(options)).toEqual(expected);
  });
});
