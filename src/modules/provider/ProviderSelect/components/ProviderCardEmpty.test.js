import React from 'react';
import { shallow } from 'enzyme';

import ProviderCardEmpty from './ProviderCardEmpty';

describe('ProviderCardEmpty', () => {
  it('renders', () => {
    const comp = shallow(<ProviderCardEmpty />);

    expect(comp.find('.ui-provider-card__detail')).toHaveLength(1);
    expect(comp.find('h4')).toHaveLength(1);
    expect(comp.find('p')).toHaveLength(1);
  });
});
