import React from 'react';
import { shallow } from 'enzyme';
import provider from 'testUtils/provider';
import HoursOfOperationV2 from '.';

describe('HoursOfOperationV2', () => {
  const props = {
    hours: { monday: [{ opens: '08:00', closes: '17:00' }] },
    provider,
    showAll: false,
    showMore: false,
  };

  it('renders', () => {
    const comp = shallow(<HoursOfOperationV2 {...props} />);
    expect(comp.find('HoursOfOperationToday')).toHaveLength(1);
  });
});
