import React from 'react';
import { shallow } from 'enzyme';
import { Form } from './Form';

describe('Form', () => {
  it('renders', () => {
    const props = {
      editMode: true,
      formData: {
        id: 'form1',
        sections: [
          { id: 'section1' },
          { id: 'section2' },
          { id: 'section3' },
        ],
      },
      hiddenFields: [],
    };

    const comp = shallow(<Form {...props} />);
    expect(comp.find('FormRendererSection')).toHaveLength(3);
  });
});
