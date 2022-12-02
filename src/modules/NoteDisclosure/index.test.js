import React from 'react';
import renderer from 'react-test-renderer';
import NoteDisclosure from './';

describe('NoteDisclosure', () => {
  it('renders', () => {
    const props = {
      className: 'className-prop',
    };

    const comp = renderer.create(<NoteDisclosure {...props} />).toJSON();
    expect(comp).toMatchSnapshot();
  });
});
