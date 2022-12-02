import React from 'react';
import renderer from 'react-test-renderer';
import VerbalConsentScript from './';

describe('VerbalConsentScript', () => {
  it('renders', () => {
    const props = {
      showBaseCard: false,
      title: 'Consent Form',
    };

    const comp = renderer.create(<VerbalConsentScript {...props} />).toJSON();
    expect(comp).toMatchSnapshot();
  });

  it('renders Basecard', () => {
    const props = {
      showBaseCard: true,
      title: 'Consent Form',
    };

    const comp = renderer.create(<VerbalConsentScript {...props} />).toJSON();
    expect(comp).toMatchSnapshot();
  });
});
