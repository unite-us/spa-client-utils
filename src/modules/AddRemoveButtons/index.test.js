import React from 'react';
import { shallow } from 'enzyme';
import AddRemoveButtons from './index';

describe('AddRemoveButtons', () => {
  let props;

  beforeEach(() => {
    props = {
      onAddClick: jest.fn(),
      onRemoveClick: jest.fn(),
    };
  });

  afterEach(() => {
    props = null;
  });

  it('renders add and remove buttons', () => {
    const wrapper = shallow(<AddRemoveButtons {...props} index={2} length={3} />);
    expect(wrapper.find('.ui-add-remove-buttons')).toHaveLength(1);
    const icons = wrapper.find('Icon');
    expect(icons).toHaveLength(2);
    expect(icons.at(0).prop('icon')).toBe('IconMinusCircle');
    expect(icons.at(1).prop('icon')).toBe('IconPlusCircle');
  });

  it('renders just the add button', () => {
    const wrapper = shallow(<AddRemoveButtons {...props} index={0} length={1} />);
    expect(wrapper.find('.ui-add-remove-buttons')).toHaveLength(1);
    const icons = wrapper.find('Icon');
    expect(icons).toHaveLength(1);
    expect(icons.at(0).prop('icon')).toBe('IconPlusCircle');
  });

  it('renders just the remove button', () => {
    const wrapper = shallow(<AddRemoveButtons {...props} index={3} length={5} />);
    expect(wrapper.find('.ui-add-remove-buttons')).toHaveLength(1);
    const icons = wrapper.find('Icon');
    expect(icons).toHaveLength(1);
    expect(icons.at(0).prop('icon')).toBe('IconMinusCircle');
  });
});
