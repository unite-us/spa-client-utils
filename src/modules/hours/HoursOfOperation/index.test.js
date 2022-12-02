import React from 'react';
import { shallow } from 'enzyme';
import HoursOfOperation from './index';

const hoursArr = [
  {
    day_of_week: 'monday',
    hours_of_operation: [{ opens_at: 0, closes_at: 1320 }],
  },
];

const hoursObj = {
  monday: [
    { opens: '00:30', closes: '22:00' },
  ],
};

describe('HoursOfOperation', () => {
  it('renders hours of operation from an array of data', () => {
    const wrapper = shallow(<HoursOfOperation hours={hoursArr} />);

    expect(wrapper.find('.ui-hours-of-operation-day__day-label')
      .first().find('p').text()).toEqual('mon');
    expect(wrapper.find('.ui-hours-of-operation-day__hours')
      .first().text()).toEqual('12:00 AM - 10:00 PM');
  });

  it('renders hours of operation from an object', () => {
    const wrapper = shallow(<HoursOfOperation hours={hoursObj} />);

    expect(wrapper.find('.ui-hours-of-operation-day__day-label')
      .first().find('p').text()).toEqual('mon');
    expect(wrapper.find('.ui-hours-of-operation-day__hours')
      .first().text()).toEqual('12:00 AM - 10:00 PM');
  });

  it('renders closed week when hours === null', () => {
    const wrapper = shallow(<HoursOfOperation hours={null} />);
    expect(wrapper.find('.ui-hours-of-operation-day__hours').first().text())
      .toEqual('Closed');
  });
});
