import React from 'react';
import { shallow } from 'enzyme';
import ShowHide from '../ShowHide';

describe('ShowHide', () => {
  it('renders showing', () => {
    const wrapper = shallow(
      <ShowHide>
        <p className="content">hello</p>
      </ShowHide>,
    );
    expect(wrapper.find('.show-hide')).toHaveLength(1);
    expect(wrapper.find('.content')).toHaveLength(1);
    expect(wrapper.text()).toBe('hello');
  });

  it('renders children as hidden (they render with display: none)', () => {
    const wrapper = shallow(
      <ShowHide hide>
        <p className="content">hello</p>
      </ShowHide>,
    );
    expect(wrapper.find('.show-hide.hidden')).toHaveLength(1);
    expect(wrapper.find('.content')).toHaveLength(1);
  });
});
