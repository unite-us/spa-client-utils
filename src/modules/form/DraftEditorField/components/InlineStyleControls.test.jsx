import React from 'react';
import { shallow } from 'enzyme';
import InlineStyleControls from './InlineStyleControls';

describe('InlineStyleControls', () => {
  it('renders', () => {
    const getCurrentInlineStyle = jest.fn(() => ({
      has: style => style === 'BOLD',
    }));

    const props = {
      editorState: {
        getCurrentInlineStyle,
      },
      onToggle: jest.fn(),
    };

    const comp = shallow(<InlineStyleControls {...props} />);

    expect(comp.find('StyleButton')).toHaveLength(3);
  });
});
