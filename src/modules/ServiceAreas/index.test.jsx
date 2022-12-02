import React from 'react';
import { mount } from 'enzyme';
import ServiceAreas from './';

describe('ServiceAreas', () => {
  it('renders National Service Area', () => {
    const props = {
      className: 'program-details__section',
      service_areas: [{
        service_area_type: 'national',
        name: 'national',
        state_abbreviation: null,
        latitude: null,
        longitude: null,
      }],
    };

    const wrapper = mount(<ServiceAreas {...props} />);

    expect(wrapper.find('LabelTextInline')).toHaveLength(1);
    expect(wrapper.find('LabelTextInline').text()).toContain('National');
  });

  it('renders State Service Area', () => {
    const props = {
      className: 'program-details__section',
      service_areas: [{
        service_area_type: 'state',
        name: 'New York',
        state_abbreviation: 'NY',
        latitude: null,
        longitude: null,
      }],
    };

    const wrapper = mount(<ServiceAreas {...props} />);

    expect(wrapper.find('LabelTextInline')).toHaveLength(1);
    expect(wrapper.find('LabelTextInline').text()).toContain('States');
    expect(wrapper.find('LabelTextInline').text()).toContain('New York');
  });
});
