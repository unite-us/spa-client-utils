import React from 'react';
import renderer from 'react-test-renderer';
import PhoneNumbers from './PhoneNumbers';

describe('PhoneNumbers', () => {
  const props = {
    phone_numbers: [
      {
        phone_number: '1232221233',
        extension: '1',
        phone_type: 'phone',
      },
      {
        phone_number: '2223123454',
        extension: '1',
        phone_type: 'other',
      },
    ],
  };

  it('renders Program Eligibility', () => {
    expect(renderer.create(<PhoneNumbers {...props} />)).toMatchSnapshot();
  });

  it('renders phone_type property', () => {
    const instance = renderer.create(<PhoneNumbers {...props} />);
    const firstPhoneNumberText = instance.root
      .findAllByProps({ className: 'ui-provider-card__icon-text--phone ml-half normal-case' })[0]
      .children;
    expect(firstPhoneNumberText).toEqual(['Phone: (123) 222-1233 1']);
  });

  it('does not render phone_type property when hideLabels prop is true', () => {
    const instance = renderer.create(<PhoneNumbers {...props} hideLabels />);
    const firstPhoneNumberText = instance.root
      .findAllByProps({ className: 'ui-provider-card__icon-text--phone ml-half normal-case' })[0]
      .children;
    expect(firstPhoneNumberText).toEqual(['(123) 222-1233 1']);
  });
});
