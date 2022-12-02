import React from 'react';
import { shallow } from 'enzyme';
import GradientSvg from './GradientSvg';

describe('GradientSvg', () => {
  it('renders with a defined color gradient', () => {
    const props = {
      open: false,
      color: 'red',
      id: 'test-1',
    };
    const comp = shallow(<GradientSvg {...props} />);

    expect(comp.find('stop').at(1).prop('stopColor')).toBe('red');
  });
});
