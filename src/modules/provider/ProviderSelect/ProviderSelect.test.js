import React from 'react';
import { shallow } from 'enzyme';
import group from 'testUtils/group.json';
import ProviderSelect from './ProviderSelect';

describe('ProviderSelect', () => {
  it('renders', () => {
    const props = {
      options: [group, group],
      id: 'provider-select',
      input: {
        value: '',
      },
      meta: {
        invalid: false,
        touched: false,
      },
    };
    const comp = shallow(<ProviderSelect {...props} />);
    expect(comp.find('ProviderCard')).toHaveLength(2);
  });

  it('renders loading indicator', () => {
    const props = {
      isLoading: true,
      id: 'provider-select',
      input: {
        value: '',
      },
      meta: {
        invalid: false,
        touched: false,
      },
    };
    const comp = shallow(<ProviderSelect {...props} />);
    expect(comp.find('ProviderCard')).toHaveLength(0);
    expect(comp.find('ProviderCardLoading')).toHaveLength(1);
  });

  it('calls onChange when adding/removing providers', () => {
    const onChange = jest.fn();
    const props = {
      options: [group, group],
      id: 'provider-select',
      input: {
        value: '',
        onChange,
      },
      meta: {
        invalid: false,
        touched: false,
      },
    };
    const comp = shallow(<ProviderSelect {...props} />);

    comp.instance().onAddProvider(group);
    expect(onChange).toHaveBeenCalledWith([group]);

    comp.instance().onRemoveProvider(group);
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('shows errors', () => {
    const props = {
      options: [group, group],
      id: 'provider-select',
      input: {
        value: '',
      },
      meta: {
        invalid: true,
        touched: true,
        error: 'my error',
      },
    };
    const comp = shallow(<ProviderSelect {...props} />);

    expect(comp.find('.ui-form-field--has-error')).toHaveLength(1);
    expect(comp.find('.ui-form-field__error').text()).toBe('my error');
  });

  it('renders a ProviderSelectPaginationLoader when passed renderPaginationLoader prop', () => {
    const props = {
      options: [group, group],
      id: 'provider-select',
      input: {
        value: '',
      },
      meta: {
        invalid: true,
        touched: true,
        error: 'my error',
      },
      renderPaginationLoader: true,
    };
    const comp = shallow(<ProviderSelect {...props} />);

    expect(comp.find('ProviderSelectPaginationLoader')).toHaveLength(1);
  });
});
