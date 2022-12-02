import React from 'react';
import { shallow } from 'enzyme';
import UULogoLoader from './index';

describe('UULogoLoader', () => {
  const props = {
    id: 'id-1234',
    className: 'class-1234',
    height: 300,
  };

  const component = shallow(<UULogoLoader {...props} />);
  it('renders', () => {
    expect(component.find('.ui-uu-logo-loader')).toHaveLength(1);
  });
});
