import React from 'react';
import { shallow } from 'enzyme';
import FilterSingle from './index';

const firstOption = {
  label: 'opt 1',
  value: 'opt1',
};

const options = [
  firstOption,
  {
    label: 'opt 2',
    value: 'opt2',
    children: [{
      label: 'opt 2 1',
      value: 'opt21',
    }],
  },
  {
    label: 'opt 3',
    value: 'opt3',
  },
];
const onFilterChange = jest.fn;

describe('FilterSingle', () => {
  it('renders', () => {
    const props = {
      id: 'test-component',
      name: 'Test Filter',
      onFilterChange,
      options,
      value: firstOption.value,
    };

    const component = shallow(<FilterSingle {...props} />);
    expect(component.find('.ui-filter-single')).toHaveLength(1);
  });
});
