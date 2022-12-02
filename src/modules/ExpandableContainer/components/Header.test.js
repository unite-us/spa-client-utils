import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header', () => {
  it('returns empty header tag if no header is passed in', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => 42);
    const comp = shallow(<Header />);

    expect(comp.find('h5')).toHaveLength(1);
    expect(spy).toHaveBeenCalledWith(
      expect.stringMatching('The prop `header` is marked as required in `Header`'),
    );
    spy.mockClear();
  });

  it('renders', () => {
    const comp = shallow(<Header header="word" />);

    expect(comp.find('.expandable-container__header')).toHaveLength(1);
    expect(comp.find('h5')).toHaveLength(1);
  });
});

