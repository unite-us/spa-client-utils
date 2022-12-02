import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import locations from 'testUtils/locations';
import service_areas from 'testUtils/service_areas';
import ProgramDetailsV2 from './ProgramDetailsV2';

jest.mock(
  'modules/ExpandableContainer',
  () => props => <div className="expandable-container" {...props} />,
);

function resetMoment() {
  moment.now = () => +new Date();
}

beforeEach(() => {
  const date = 1600704000000; // Monday, September 21, 2020 4:00:00 PM GMT
  const sameDay = moment(date);
  moment.now = () => sameDay;
});

afterEach(() => {
  resetMoment();
});

describe('ProgramDetailsV2', () => {
  const props = {
    feeScheduleProgramIconDetails: {},
    isFeeScheduleProgram: true,
    originLatLng: [42.4191639, -71.0269413],
    program: {
      locations,
      service_areas,
      name: 'Program 1',
      receiving_referrals: true,
      status: null,
    },
    sectionEmpty: {},
    rightHeaderComponent: () => (<div className="program-details-test-component" style={{ float: 'right', marginTop: '-2.5rem' }}>test component</div>),
  };

  it('renders ProgramDetailsV2', () => {
    const wrapper = shallow(<ProgramDetailsV2 {...props} />);

    expect(wrapper.find('MoreOrLess')).toHaveLength(1);
    expect(wrapper.find('ProgramUsersInfo')).toHaveLength(1);
    expect(wrapper.find('ProgramDescription')).toHaveLength(1);
    expect(wrapper.find('Locations')).toHaveLength(1);
    expect(wrapper.find('ProgramEligibility')).toHaveLength(1);
    expect(wrapper.find('Divider')).toHaveLength(3);
    expect(wrapper.find('rightHeaderComponent')).toHaveLength(1);
    expect(wrapper.find('ServiceAreas')).toHaveLength(1);
  });

  it('renders all details of ProgramDetailsV2 when initiallyCollapsed is set to false', () => {
    const wrapper = shallow(<ProgramDetailsV2 {...props} initiallyCollapsed={false} />);
    expect(wrapper.find('MoreOrLess')).toHaveLength(0);
  });
});
