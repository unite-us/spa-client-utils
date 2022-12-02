import React from 'react';
import { shallow } from 'enzyme';
import StyleButton from './StyleButton';

describe('StyleButton', () => {
  it('renders', () => {
    const props = {
      active: false,
      label: 'bold',
      onToggle: jest.fn(),
      style: 'BOLD',
    };

    const comp = shallow(<StyleButton {...props} />);

    expect(comp.text()).toBe(props.label);
    expect(comp.find('.bold')).toHaveLength(1);
  });

  it('calls the toggle callback', () => {
    const onToggle = jest.fn();
    const props = {
      active: false,
      label: 'bold',
      onToggle,
      style: 'BOLD',
    };
    const mockEvent = { preventDefault: jest.fn() };

    const comp = shallow(<StyleButton {...props} />);

    comp.simulate('mouseDown', mockEvent);
    expect(onToggle).toHaveBeenCalledWith(props.style);
  });
});
