import React from 'react';
import { shallow } from 'enzyme';
import ServiceTypesCheckbox from './ServiceTypesCheckbox';

describe('ServiceTypesCheckbox', () => {
  const item = {
    name: 'stay with me',
    id: '1',
    children: [{
      name: 'don\'t go',
      id: '1-2',
    },
    {
      name: 'beautiful girl',
      id: '1-1',
    }],
  };

  const props = {
    item,
    id: 'one-word',
    valueKey: 'id',
    onChange: jest.fn(),
    labelKey: 'name',
    autoSelectParent: true,
    autoSelectChildren: true,
    allOptions: [item],
  };

  it('renders', () => {
    const comp = shallow(<ServiceTypesCheckbox {...props} />);

    expect(comp.find('CheckBoxField')).toHaveLength(1);
  });

  it('renders nested item children', () => {
    const comp = shallow(<ServiceTypesCheckbox {...props} />);

    expect(comp.find('ServiceTypesCheckbox')).toHaveLength(2);
  });


  it('renders nested item children', () => {
    const comp = shallow(<ServiceTypesCheckbox {...props} />);

    expect(comp.find('ServiceTypesCheckbox')).toHaveLength(2);
  });

  it('renders nested item children', () => {
    const comp = shallow(<ServiceTypesCheckbox {...props} />);
    const checkbox = comp.find('CheckBoxField').at(0);

    checkbox.simulate('change');

    expect(props.onChange).toHaveBeenCalled();
  });
});
