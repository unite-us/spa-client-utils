import React from 'react';
import renderer from 'react-test-renderer';
import ShareButton from './ShareButton';

describe('ShareButton', () => {
  it('renders default button with Share label', () => {
    expect(renderer.create(
      <ShareButton id="share-button-id" />,
    )).toMatchSnapshot();
  });

  it('renders share button with custom className, iconRight and label', () => {
    expect(renderer.create(
      <ShareButton
        className="this-button-class"
        iconRight={<mock-icon />}
        id="share-button-id"
        label="Custom Share Label"
      />,
    )).toMatchSnapshot();
  });
});
