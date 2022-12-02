import React from 'react';
import { shallow } from 'enzyme';
import FormSection from './FormSection';

describe('FormSection', () => {
  it('renders', () => {
    const props = {
      section: {
        id: 'section1',
        name: 'Section 1',
        display_name: true,
        questions: [
          { id: 'q1', input_type: 'text' },
          { id: 'q2', input_type: 'text' },
          { id: 'q3', input_type: 'text' },
          { id: 'q4', input_type: 'text' },
        ],
      },
      editMode: true,
      hiddenFields: ['q4'],
    };

    const comp = shallow(<FormSection {...props} />);
    expect(comp.find('h3').text()).toBe('Section 1');
    expect(comp.find('FormField')).toHaveLength(4);
  });

  it('does not render an h3 if the section.display_name is false', () => {
    const props = {
      section: {
        id: 'section1',
        name: 'Section 1',
        display_name: false,
        questions: [
          { id: 'q1', input_type: 'text' },
          { id: 'q2', input_type: 'text' },
          { id: 'q3', input_type: 'text' },
          { id: 'q4', input_type: 'text' },
        ],
      },
      editMode: true,
      hiddenFields: ['q4'],
    };

    const comp = shallow(<FormSection {...props} />);

    expect(comp.find('h3').length).toEqual(0);
    expect(comp.find('FormField')).toHaveLength(4);
  });
});
