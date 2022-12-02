import React from 'react';
import { shallow } from 'enzyme';
import InfoPopover from './index';

const props = {
  id: 'test-popover',
};

describe('InfoPopover', () => {
  it('renders icon and popover', () => {
    const wrapper = shallow(<InfoPopover {...props} />);
    expect(wrapper.find('.info-popover')).toHaveLength(1);
    expect(wrapper.find('Icon')).toHaveLength(1);
    expect(wrapper.find('Popover')).toHaveLength(1);
  });
});
