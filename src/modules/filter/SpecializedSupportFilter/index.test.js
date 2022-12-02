import React from 'react';
import { shallow } from 'enzyme';
import accessibility from 'testUtils/accessibility.json';
import languages from 'testUtils/languages.json';
import populations from 'testUtils/populations.json';
import SpecializedSupportFilter from './index';

describe('SpecializedSupportFilter', () => {
  it('renders', () => {
    const props = {
      label: 'Specialized Support',
      onFiltersChange: jest.fn(),
      accessibility,
      languages,
      populations,
    };

    const comp = shallow(<SpecializedSupportFilter {...props} />);

    expect(comp.find('.ui-filter-section__label').text()).toBe('Specialized Support');
    expect(comp.find('Filter')).toHaveLength(3);
  });
});
