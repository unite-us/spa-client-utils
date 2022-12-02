import React from 'react';
import { shallow } from 'enzyme';
import ConsentTypeChoice from './';

const props = {
  children: <div className="test-the-children">hey it is children</div>,
  dropzone: <div className="test-the-dropzone">hey the dropzone</div>,
  label: 'the label',
  onSelect: jest.fn(),
  selectedType: 'cool',
  type: 'cool',
};

describe('ConsentTypeChoice', () => {
  it('renders consent type choice', () => {
    const wrapper = shallow(<ConsentTypeChoice {...props} />);
    expect(wrapper.find('.consent-type-choice')).toHaveLength(1);
    expect(wrapper.find('RadioField')).toHaveLength(1);
    expect(wrapper.find('.consent-type-choice__children')).toHaveLength(1);
    expect(wrapper.find('.test-the-children')).toHaveLength(1);
    expect(wrapper.find('.test-the-dropzone')).toHaveLength(1);
  });

  describe('when selected choice equals type', () => {
    const wrapper = shallow(<ConsentTypeChoice {...props} selectedType="cool" />);
    it('renders children', () => {
      expect(wrapper.find('.consent-type-choice__children')).toHaveLength(1);
      expect(wrapper.find('.consent-type-choice__dropzone')).toHaveLength(1);
      expect(wrapper.find('.test-the-children')).toHaveLength(1);
      expect(wrapper.find('.test-the-dropzone')).toHaveLength(1);
    });

    it('calls onSelect', () => {
      expect(props.onSelect).toHaveBeenCalledTimes(0);
      wrapper.instance().onSelect();
      expect(props.onSelect).toHaveBeenCalledTimes(1);
      expect(props.onSelect).toHaveBeenCalledWith(props.type);
    });
  });
});
