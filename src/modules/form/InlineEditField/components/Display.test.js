import React from 'react';
import { shallow } from 'enzyme';
import Display from './Display';

describe('Display', () => {
  it('renders', () => {
    const props = {
      disabled: false,
      label: 'label 1',
      value: 'value 1',
      id: 'id1',
      onEditClick: jest.fn(),
    };

    const comp = shallow(<Display {...props} />);

    expect(comp.find('.ui-inline-display__container')).toHaveLength(1);
    expect(comp.find('h5').text()).toBe(props.label);
    expect(comp.find('Icon')).toHaveLength(1);
  });

  it('calls the onEditClick callback', () => {
    const onEditClick = jest.fn();
    const props = {
      disabled: false,
      label: 'label 1',
      value: 'value 1',
      id: 'id1',
      onEditClick,
    };

    const comp = shallow(<Display {...props} />);
    comp.find('Icon').simulate('click');

    expect(onEditClick).toHaveBeenCalled();
  });

  it('does not show the edit button if disabled', () => {
    const props = {
      disabled: true,
      label: 'label 1',
      value: 'value 1',
      id: 'id1',
      onEditClick: jest.fn(),
    };

    const comp = shallow(<Display {...props} />);

    expect(comp.find('.ui-inline-display__container')).toHaveLength(1);
    expect(comp.find('h5').text()).toBe(props.label);
    expect(comp.find('Icon')).toHaveLength(0);
  });
});
