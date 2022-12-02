import React from 'react';
import renderer from 'react-test-renderer';
import ProviderCardAddRemoveButton from './ProviderCardAddRemoveButton';

jest.mock('@unite-us/ui', () => ({
  ...require.requireActual('@unite-us/ui'),
  Icon: jest.fn(() => <mock-icon />),
}));

describe('ProviderCardAddRemoveButton', () => {
  it('renders add button', () => {
    expect(renderer.create(
      <ProviderCardAddRemoveButton className="another-class-name" />,
    )).toMatchSnapshot();
  });

  it('renders remove button', () => {
    expect(renderer.create(
      <ProviderCardAddRemoveButton
        className="another-class-name"
        selected
      />,
    )).toMatchSnapshot();
  });
});
