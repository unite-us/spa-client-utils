import React from 'react';
import { shallow, mount } from 'enzyme';
import { take } from 'lodash';
import Filter from './index';
import * as getInitialFilters from './utils/getInitialFilters';
import * as countOptions from './utils/countOptions';

const states = require('testUtils/states.json');

const mockValues = {
  first: { value: 'some-value', label: 'Some' },
  second: { value: 'some-other-value', label: 'Other' },
};

describe('Filter', () => {
  const options = [{
    label: 'opt 1',
    value: 'opt1',
  },
  {
    label: 'opt 2',
    value: 'opt2',
    children: [{
      label: 'opt 2 1',
      value: 'opt21',
    }],
  },
  {
    label: 'opt 3',
    value: 'opt3',
  }];
  const onFiltersChange = jest.fn();
  const props = {
    hideSelectAll: true,
    id: 'test-component',
    name: 'Test Filter',
    onFiltersChange,
    options,
  };

  it('renders', () => {
    const component = shallow(<Filter {...props} />);
    expect(component.find('.ui-filter')).toHaveLength(1);
  });

  it('hides SelectAll when its passed the hideSelectAll prop', () => {
    const wrapper = shallow(<Filter {...props} />);
    const comp = wrapper.find('SelectAll').dive();
    expect(comp.type()).toEqual(null);
  });

  it('shows SelectAll when its passed the hideSelectAll prop', () => {
    const wrapper = shallow(<Filter {...props} hideSelectAll={false} />);
    const comp = wrapper.find('SelectAll').dive();

    expect(comp.find('.select-all')).toHaveLength(1);
  });

  describe('#ComponentDidUpdate', () => {
    it('calls setActiveFiltersAndOptionsCount if open state is false and prevProps.options do not equal props.options', () => {
      const newOptions = [{
        label: 'different',
        value: 'different',
      },
      {
        label: 'different',
        value: 'different',
        children: [{
          label: 'different',
          value: 'different',
        }],
      },
      {
        label: 'different',
        value: 'different',
      }];
      const testProps = { ...props, options };
      const newProps = {
        hideSelectAll: true,
        id: 'test-component',
        name: 'Test Filter',
        onFiltersChange,
        options: newOptions,
      };
      const component = shallow(<Filter {...testProps} />);
      const setActiveFiltersAndOptionsCount = jest.spyOn(component.instance(), 'setActiveFiltersAndOptionsCount');

      component.instance().setState({ open: false });
      component.setProps(newProps);

      expect(component.state('options')).toEqual(newOptions);
      expect(setActiveFiltersAndOptionsCount).toHaveBeenCalled();
    });
  });

  describe('#setActiveFiltersAndOptionsCount', () => {
    it('calls getInitialFilters, countOptionsSpy and filterOptions', () => {
      const component = shallow(<Filter {...props} />);
      const instance = component.instance();
      const getInitialFiltersSpy = jest.spyOn(getInitialFilters, 'default');
      const countOptionsSpy = jest.spyOn(countOptions, 'default');
      const filterOptionsSpy = jest.spyOn(component.instance(), 'filterOptions');

      instance.setActiveFiltersAndOptionsCount();

      expect(getInitialFiltersSpy).toHaveBeenCalled();
      expect(countOptionsSpy).toHaveBeenCalled();
      expect(filterOptionsSpy).toHaveBeenCalled();

      getInitialFiltersSpy.mockClear();
      countOptionsSpy.mockClear();
    });
  });

  describe('updates options', () => {
    const { first, second } = mockValues;

    it('supports multiple options', () => {
      const component = shallow(<Filter {...props} />);
      const compInstance = component.instance();

      expect(component.state('activeFilters')).toEqual([]);

      compInstance.onOptionChange(first, []);
      expect(compInstance.state.activeFilters).toEqual([first.value]);

      compInstance.onOptionChange(second, []);
      expect(compInstance.state.activeFilters).toHaveLength(2);
    });

    it('contains one option at a time when isSingleOptionSelect is true', () => {
      const component = shallow(<Filter {...{ ...props, isSingleOptionSelect: true }} />);
      const compInstance = component.instance();

      compInstance.onOptionChange(first);
      compInstance.onOptionChange(second);

      expect(compInstance.state.activeFilters).toEqual([second.value]);
    });
  });

  describe('renders filtered options', () => {
    it('renders filtered options when the prop filterSearchOptions is passed', () => {
      const optionsForFiltering = [{
        label: 'different',
        value: 'different',
      },
      {
        label: 'different',
        value: 'different',
        children: [{
          label: 'different',
          value: 'different',
        }],
      },
      {
        label: 'different',
        value: 'different',
      }];
      const testProps = { ...props, options };
      const prevProps = {
        hideSelectAll: true,
        id: 'test-component',
        name: 'Test Filter',
        onFiltersChange,
        options: optionsForFiltering,
        filterSearchOptions: true,
      };
      const component = shallow(<Filter {...testProps} />);
      const setActiveFiltersAndOptionsCount = jest.spyOn(component.instance(), 'setActiveFiltersAndOptionsCount');

      component.instance().setState({ open: false });
      component.instance().componentDidUpdate(prevProps);

      expect(setActiveFiltersAndOptionsCount).toHaveBeenCalled();
    });
  });
  describe('async search', () => {
    it('Fetches the options asynchronously', async () => {
      const asyncSearch = jest.fn(() => Promise.resolve(take(states, 10)));
      const newProps = {
        asyncLoadingText: 'Fetching states...',
        asyncSearch,
        id: 'async-filter',
        name: 'async',
        onFiltersChange: jest.fn(),
        options: states,
        optionsRenderLimit: 50,
        searchPlaceholder: 'Displaying 50 - Search',
      };
      const comp = mount(<Filter {...newProps} />);
      expect(comp.find('FilterOption')).toHaveLength(50);
      comp.instance().onSearchChange('term');
      comp.update();
      expect(comp.find('FilterOption')).toHaveLength(0);
      expect(comp.find('.filter-options__container--loading').text()).toBe('Fetching states...');
      expect(comp.state('loading')).toBeTruthy();
      await comp.instance().asyncFilterOptions();
      comp.update();
      expect(asyncSearch).toHaveBeenCalledWith('term');
      expect(comp.find('FilterOption')).toHaveLength(10);
      expect(comp.state('loading')).toBeFalsy();
      expect(comp.state('options')).toEqual(take(states, 10));
    });
  });
});
