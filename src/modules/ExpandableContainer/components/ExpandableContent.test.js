import React from 'react';
import { shallow } from 'enzyme';
import ExpandableContent from './ExpandableContent';

describe('ExpandableContent', () => {
  const props = {
    className: 'required',
    style: { background: 'black' },
  };
  it('renders', () => {
    const comp = shallow(
      <ExpandableContent {...props} ><p>Word</p></ExpandableContent>,
    );

    expect(comp.find('.expandable-container__content-children')).toHaveLength(1);
  });

  it('returns an empty div if children are not passed in', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => 42);

    const comp = shallow(
      <ExpandableContent {...props} />,
    );

    expect(comp.find('.expandable-container__content-children')).toHaveLength(1);
    expect(spy).toHaveBeenCalledWith(
      expect.stringMatching('Failed prop type: The prop `children` is marked as required in `ExpandableContent`'),
    );

    spy.mockClear();
  });
});
