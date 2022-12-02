import React from 'react';
import { shallow } from 'enzyme';
import NameField from './index';

describe('NameField', () => {
  let props;
  let component;

  beforeAll(() => {
    props = {
      id: 'id-1234',
      className: 'class-1234',
      suffixOptions: [
        {
          display_name: 'Jr.',
          value: 'Jr.',
        },
        {
          display_name: 'Sr.',
          value: 'Sr.',
        },
      ],
      titleOptions: [
        {
          display_name: 'Mr.',
          value: 'Mr.',
        },
        {
          display_name: 'Mrs.',
          value: 'Mrs.',
        },
      ],
    };

    component = shallow(<NameField {...props} />);
  });

  it('renders', () => {
    expect(component.find('.ui-name-field')).toHaveLength(1);
  });

  it('should have 4 input fields', () => {
    expect(component.find('InputField')).toHaveLength(4);
  });

  it('should have 2 select fields', () => {
    expect(component.find('SelectField')).toHaveLength(2);
  });
});
