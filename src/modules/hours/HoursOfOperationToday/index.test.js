import React from 'react';
import { shallow } from 'enzyme';
import HoursOfOperation from './index';

const hoursArr = [
  {
    day_of_week: 'wednesday',
    hours_of_operation: [{ opens_at: 0, closes_at: 1320 }],
  },
];

const hoursObj = {
  wednesday: [
    { opens: '00:30', closes: '22:00' },
  ],
};

// this will set the today as Wednesday
jest.mock('moment', () => (
  {
    __esModule: true,
    default: () => ({
      day: jest.fn(() => 3),
    }),
  }
));

describe('HoursOfOperation', () => {
  it('renders hours of operation from an array of data', () => {
    const wrapper = shallow(<HoursOfOperation hours={hoursArr} />);

    expect(wrapper.find('.ui-hours-of-operation-day__day-label')
      .first().find('div').first()
      .text()).toEqual('wed');
    expect(wrapper.find('.ui-hours-of-operation-day__hours')
      .first().find('div').first()
      .text()).toEqual('12:00 AM - 10:00 PM');
  });

  it('renders hours of operation from an object', () => {
    const wrapper = shallow(<HoursOfOperation hours={hoursObj} />);

    expect(wrapper.find('.ui-hours-of-operation-day__day-label')
      .first().find('div').first()
      .text()).toEqual('wed');
    expect(wrapper.find('.ui-hours-of-operation-day__hours')
      .first().find('div').first()
      .text()).toEqual('12:00 AM - 10:00 PM');
  });
});
