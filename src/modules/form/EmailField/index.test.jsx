import React from 'react';
import { shallow } from 'enzyme';
import EmailField from './index';

describe('EmailField', () => {
  let props;
  let component;

  beforeAll(() => {
    props = {
      id: 'id-1234',
      className: 'class-1234',
      label: 'EmailField Label',
      emailAddressPath: 'email',
      primaryPath: 'primary',
      primary: true,
    };

    component = shallow(<EmailField {...props} />);
  });

  it('renders', () => {
    expect(component.find('.ui-email-field')).toHaveLength(1);
  });

  it('should have 1 InputField', () => {
    expect(component.find('InputField')).toHaveLength(1);
  });

  it('should have 1 checkbox', () => {
    expect(component.find('CheckBoxField')).toHaveLength(1);
  });
});
