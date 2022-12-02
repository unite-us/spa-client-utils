import React from 'react';
import { mount } from 'enzyme';
import InfoPanel from './InfoPanel';

describe('InfoPanel', () => {
  it('renders info panel with icon and message', () => {
    const comp = mount(
      <InfoPanel
        className="extra-class"
        message="A message for the info panel."
      />,
    );
    expect(comp.text()).toBe('A message for the info panel.');
    expect(comp.find('Icon').prop('icon')).toBe('IconExclamationCircle');
  });
});
