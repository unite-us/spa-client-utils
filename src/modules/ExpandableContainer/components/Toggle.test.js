import React from 'react';
import { shallow } from 'enzyme';
import Toggle from './Toggle';

describe('Toggle', () => {
  const props = {
    id: '1',
    className: 'word',
    text: 'shamwow',
    onClick: jest.fn(),
  };

  it('renders', () => {
    const comp = shallow(<Toggle {...props} />);

    expect(comp.find('.word')).toHaveLength(1);
    expect(comp.find('a')).toHaveLength(1);
  });


  it('renders read only text and no link', () => {
    const comp = shallow(<Toggle {...props} readOnly />);

    expect(comp.find('.word')).toHaveLength(1);
    expect(comp.find('a')).toHaveLength(0);
  });
});
