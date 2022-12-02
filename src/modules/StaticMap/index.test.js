import React from 'react';
import { shallow } from 'enzyme';
import StaticMap from './index';

describe('StaticMap', () => {
  it('renders a static map', () => {
    const props = {
      latLng: { latitude: 40, longitude: -74 },
      apiKey: '1-google-api-key',
    };

    const wrapper = shallow(<StaticMap {...props} />);

    expect(wrapper.find('.map')).toHaveLength(1);
    expect(wrapper.find('img')).toHaveLength(1);
  });
});
