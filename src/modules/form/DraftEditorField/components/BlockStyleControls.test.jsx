import React from 'react';
import { shallow } from 'enzyme';
import BlockStyleControls from './BlockStyleControls';

describe('BlockStyleControls', () => {
  it('renders', () => {
    const getSelection = jest.fn(() => ({ getStartKey: jest.fn() }));
    const getBlockForKey = jest.fn(() => ({ getType: jest.fn() }));
    const getCurrentContent = jest.fn(() => ({ getBlockForKey }));

    const props = {
      editorState: {
        getSelection,
        getCurrentContent,
      },
      onToggle: jest.fn(),
    };

    const comp = shallow(<BlockStyleControls {...props} />);

    expect(comp.find('StyleButton')).toHaveLength(8);
  });
});
