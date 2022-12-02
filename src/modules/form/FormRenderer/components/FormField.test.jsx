import React from 'react';
import { shallow } from 'enzyme';
import FormField from './FormField';

describe('FormField', () => {
  it('renders', () => {
    const props = {
      question: {
        input_type: 'text',
      },
      section: {
        id: '1',
        name: 'section 1',
        display_name: true,
        display_order: 20000,
        section_type: 'form_group',
        questions: [
          {
            input_type: 'text',
          },
        ],
      },
      hiddenFields: [],
    };

    const comp = shallow(<FormField {...props} />);
    expect(comp.find('FormInputField'))
      .toHaveLength(1);
  });
  it('doesn t render hidden field', () => {
    const props = {
      question: {
        id: 'question1',
        input_type: 'text',
      },
      section: {
        id: '1',
        name: 'section 1',
        display_name: true,
        display_order: 20000,
        section_type: 'form_group',
        questions: [
          {
            id: 'question1',
            input_type: 'text',
          },
        ],
      },
      hiddenFields: ['question1'],
    };

    const comp = shallow(<FormField {...props} />);
    expect(comp.find('FormInputField'))
      .toHaveLength(0);
  });
  it('renders select', () => {
    const props = {
      question: {
        input_type: 'select',
      },
      section: {
        id: '1',
        name: 'section 1',
        display_name: true,
        display_order: 20000,
        section_type: 'form_group',
        questions: [
          {
            input_type: 'select',
          },
        ],
      },
      hiddenFields: [],
    };

    const comp = shallow(<FormField {...props} />);
    expect(comp.find('FormSelectField'))
      .toHaveLength(1);
  });
  it('renders checkbox', () => {
    const props = {
      question: {
        input_type: 'checkbox',
      },
      section: {
        id: '1',
        name: 'section 1',
        display_name: true,
        display_order: 20000,
        section_type: 'form_group',
        questions: [
          {
            input_type: 'checkbox',
          },
        ],
      },
      hiddenFields: [],
    };

    const comp = shallow(<FormField {...props} />);
    expect(comp.find('FormCheckboxField'))
      .toHaveLength(1);
  });
  it('renders radio', () => {
    const props = {
      question: {
        input_type: 'radio',
      },
      section: {
        id: '1',
        name: 'section 1',
        display_name: true,
        display_order: 20000,
        section_type: 'form_group',
        questions: [
          {
            input_type: 'radio',
          },
        ],
      },
      hiddenFields: [],
    };

    const comp = shallow(<FormField {...props} />);
    expect(comp.find('FormRadioField'))
      .toHaveLength(1);
  });
  it('renders textarea', () => {
    const props = {
      question: {
        input_type: 'textarea',
      },
      section: {
        id: '1',
        name: 'section 1',
        display_name: true,
        display_order: 20000,
        section_type: 'form_group',
        questions: [
          {
            input_type: 'textarea',
          },
        ],
      },
      hiddenFields: [],
    };

    const comp = shallow(<FormField {...props} />);
    expect(comp.find('FormTextareaField'))
      .toHaveLength(1);
  });
  it('renders date', () => {
    const props = {
      question: {
        input_type: 'date',
      },
      section: {
        id: '1',
        name: 'section 1',
        display_name: true,
        display_order: 20000,
        section_type: 'form_group',
        questions: [
          {
            input_type: 'date',
          },
        ],
      },
      hiddenFields: [],
    };

    const comp = shallow(<FormField {...props} />);
    expect(comp.find('FormDateField'))
      .toHaveLength(1);
  });
  it('renders duration', () => {
    const props = {
      question: {
        input_type: 'duration',
      },
      section: {
        id: '1',
        name: 'section 1',
        display_name: true,
        display_order: 20000,
        section_type: 'form_group',
        questions: [
          {
            input_type: 'duration',
          },
        ],
      },
      hiddenFields: [],
    };

    const comp = shallow(<FormField {...props} />);
    expect(comp.find('FormDurationField'))
      .toHaveLength(1);
  });
});
