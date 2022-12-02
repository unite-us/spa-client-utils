import React from 'react';
import { shallow } from 'enzyme';
import UULogoWithText from './index';

describe('UULogoWithText', () => {
  const props = {
    id: 'id-1234',
    className: 'class-1234',
    height: 300,
  };

  const component = shallow(<UULogoWithText {...props} />);
  it('renders', () => {
    expect(component.find('.ui-logo-with-text')).toHaveLength(1);
  });
});
