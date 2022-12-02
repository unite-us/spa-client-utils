import React from 'react';
import { shallow } from 'enzyme';

import ProviderCardLoading from './ProviderCardLoading';

describe('ProviderCard', () => {
  it('renders', () => {
    const comp = shallow(<ProviderCardLoading />);

    expect(comp.find('.ui-provider-card__detail')).toHaveLength(1);
    expect(comp.find('BarLoader')).toHaveLength(4);
  });
});
