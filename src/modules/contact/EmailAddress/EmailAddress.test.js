import React from 'react';
import renderer from 'react-test-renderer';
import EmailAddress from './EmailAddress';

const emailAddress = 'email@address.com';

describe('EmailAddress', () => {
  it('renders email address as mailto link', () => {
    expect(renderer.create(
      <EmailAddress emailAddress={emailAddress} />,
    )).toMatchSnapshot();
  });

  it('renders email address as plain text', () => {
    expect(renderer.create(
      <EmailAddress disableLink emailAddress={emailAddress} />,
    )).toMatchSnapshot();
  });
});
