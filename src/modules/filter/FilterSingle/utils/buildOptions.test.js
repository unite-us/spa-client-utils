import buildOptions from './buildOptions';

describe('buildOptions', () => {
  it('builds options', () => {
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
      hasChildren: false,
      label: 'opt 1',
      level: 0,
      value: 'opt1',
    }, {
      children: [{
        hasChildren: false,
        label: 'opt 2-1',
        level: 1,
        value: 'opt21',
      }, {
        children: [{
          hasChildren: false,
          label: 'opt 2-2-1',
          level: 2,
          value: 'opt221',
        }],
        disabled: true,
        hasChildren: true,
        label: 'opt 2-2',
        level: 1,
        value: 'opt22',
      }],
      disabled: true,
      hasChildren: true,
      label: 'opt 2',
      level: 0,
      value: 'opt2',
    }, {
      hasChildren: false,
      label: 'opt 2-1',
      level: 1,
      value: 'opt21',
    }, {
      children: [{
        hasChildren: false,
        label: 'opt 2-2-1',
        level: 2,
        value: 'opt221',
      }],
      disabled: true,
      hasChildren: true,
      label: 'opt 2-2',
      level: 1,
      value: 'opt22',
    }, {
      hasChildren: false,
      label: 'opt 2-2-1',
      level: 2,
      value: 'opt221',
    }, {
      hasChildren: false,
      label: 'opt 3',
      level: 0,
      value: 'opt3',
    }];

    expect(buildOptions({ options })).toEqual(expected);
  });
});
