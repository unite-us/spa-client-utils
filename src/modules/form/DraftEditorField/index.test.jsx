import React from 'react';
import { shallow } from 'enzyme';
import DraftEditorField from './index';

describe('DraftEditorField', () => {
  it('renders', () => {
    const props = {
      id: 'editor1',
      label: 'Test Editor',
    };

    const comp = shallow(<DraftEditorField {...props} />);

    expect(comp.find('label').text()).toBe(props.label);
    expect(comp.find('DraftEditor')).toHaveLength(1);
  });

  it('renders in read-only', () => {
    const props = {
      id: 'editor1',
      label: 'Test Editor',
      readOnly: true,
      value: 'Hello there',
    };

    const comp = shallow(<DraftEditorField {...props} />);
    expect(comp.find('HtmlParsedText')).toHaveLength(1);
  });
});
