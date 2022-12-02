import React from 'react';
import renderer from 'react-test-renderer';
import ProgramAcceptance from './ProgramAcceptance';

describe('ProgramAcceptance', () => {
  it('renders receiving referral programs', () => {
    const props = {
      receiving_referrals: true,
      status: null,
    };

    expect(renderer.create(<ProgramAcceptance {...props} />)).toMatchSnapshot();
  });

  it('renders non receiving referral programs', () => {
    const props = {
      receiving_referrals: false,
      status: 'Overfilled',
    };

    expect(renderer.create(<ProgramAcceptance {...props} />)).toMatchSnapshot();
  });

  it('renders decativated programs', () => {
    const props = {
      receiving_referrals: false,
      status: 'Overfilled',
      is_active: false,
      hide_referrals: true,
    };

    expect(renderer.create(<ProgramAcceptance {...props} />)).toMatchSnapshot();
  });
});
