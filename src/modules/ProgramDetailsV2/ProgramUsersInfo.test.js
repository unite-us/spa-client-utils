import React from 'react';
import { shallow } from 'enzyme';
import ProgramUsersInfo from './ProgramUsersInfo';

describe('ProgramUsersInfo', () => {
  it('renders nothing if the program doesn t accept referrals', () => {
    const props = {
      program: { receiving_referrals: false },
      showProgramUsersInfo: true,
    };

    const comp = shallow(<ProgramUsersInfo {...props} />);
    expect(comp.text()).toBe('');
  });

  it('renders nothing if showProgramUsersInfo is false', () => {
    const props = {
      program: { receiving_referrals: true },
      showProgramUsersInfo: false,
    };

    const comp = shallow(<ProgramUsersInfo {...props} />);
    expect(comp.text()).toBe('');
  });

  it('renders if showProgramUsersInfo is true and the program accepts referrals', () => {
    const props = {
      program: { receiving_referrals: true },
      showProgramUsersInfo: true,
    };

    const comp = shallow(<ProgramUsersInfo {...props} />);
    expect(comp.find('.program-details-user-info__text').text())
      .toBe('Please make sure at least one user from your organization is assigned to this program. Go to the Users tab to add users to your organization and assign them to programs.');
    expect(comp.find('Icon')).toHaveLength(1);
  });
});
