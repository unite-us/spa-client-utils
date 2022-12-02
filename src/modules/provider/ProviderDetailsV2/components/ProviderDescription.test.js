import React from 'react';
import { shallow } from 'enzyme';
import provider from 'testUtils/provider';
import ProviderDescription from './ProviderDescription';

describe('ProviderDescription', () => {
  const props = {
    provider,
    showLess: true,
    showMore: false,
  };

  it('render', () => {
    const comp = shallow(<ProviderDescription {...props} />);

    expect(comp.find('ExpandableContainer')).toHaveLength(1);
    expect(comp.find('DraftEditorField')).toHaveLength(1);
    expect(comp.find('ContactInformation')).toHaveLength(1);
  });
});
