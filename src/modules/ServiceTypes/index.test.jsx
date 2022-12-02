import React from 'react';
import { shallow } from 'enzyme';
import ServiceTypes from '../ServiceTypes';

const serviceTypes = [
  { code: 'UU-BENEFITS', name: 'Benefits' },
  { code: 'UU-EDUCATION', name: 'Education' },
  { code: 'UU-WELLNESS', name: 'Wellness' },
];

describe('ServiceTypes', () => {
  it('renders', () => {
    const props = {
      serviceTypes,
    };

    const component = shallow(<ServiceTypes {...props} />);
    expect(component.find('.ui-service-types')).toHaveLength(1);
  });
});
