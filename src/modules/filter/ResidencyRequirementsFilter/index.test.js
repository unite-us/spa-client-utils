import React from 'react';
import { shallow, mount } from 'enzyme';
import { find } from 'lodash';
import states from 'testUtils/states.json';
import ResidencyRequirementsFilter from './index';

describe('ResidencyRequirementsFilter', () => {
  it('renders', () => {
    const props = {
      fetchStatesGeography: jest.fn(),
      filters: { cities: [], counties: [] },
      label: 'Residency Requirements',
      onFiltersChange: jest.fn(),
      states,
    };

    const comp = shallow(<ResidencyRequirementsFilter {...props} />);

    expect(comp.find('.ui-filter-section__label').text()).toBe('Residency Requirements');
    expect(comp.find('Filter')).toHaveLength(3);
  });

  it('handles changes', async () => {
    const props = {
      fetchStatesGeography: jest.fn(() => new Promise(resolve => resolve())),
      filters: { cities: [], counties: [] },
      label: 'Residency Requirements',
      onFiltersChange: jest.fn(),
      states,
    };

    const comp = mount(<ResidencyRequirementsFilter {...props} />);

    await comp.instance().handleChange(['AK'], 'states');
    const selectedState = find(comp.state('statesOptions'), s => s.initial === true);
    expect(comp.state('states')).toEqual(['AK']);
    expect(selectedState.value).toBe('AK');

    comp.instance().handleChange(['001'], 'cities');
    expect(comp.state('cities')).toEqual(['001']);

    await comp.instance().handleChange([], 'states');
    expect(comp.state('states')).toEqual([]);
    expect(comp.state('cities')).toEqual([]);
  });

  it('clears counties and cities when states filter is empty', async () => {
    const props = {
      fetchStatesGeography: jest.fn(() => new Promise(resolve => resolve())),
      filters: { states: ['AL'], cities: ['001'], counties: ['0001', '0002'] },
      label: 'Residency Requirements',
      onFiltersChange: jest.fn(),
      states,
    };

    const comp = mount(<ResidencyRequirementsFilter {...props} />);

    await comp.instance().handleChange([], 'states');
    expect(comp.state('states')).toEqual([]);
    expect(comp.state('counties')).toEqual([]);
    expect(comp.state('cities')).toEqual([]);
  });

  it('clears cities when county filters are empty', async () => {
    const props = {
      fetchStatesGeography: jest.fn(() => new Promise(resolve => resolve())),
      filters: { cities: ['001'], counties: ['0001', '0002'] },
      label: 'Residency Requirements',
      onFiltersChange: jest.fn(),
      states,
    };

    const comp = mount(<ResidencyRequirementsFilter {...props} />);

    await comp.instance().handleChange([], 'counties');
    expect(comp.state('counties')).toEqual([]);
    expect(comp.state('cities')).toEqual([]);
  });

  it('gets the active states options', () => {
    const props = {
      fetchStatesGeography: jest.fn(),
      filters: { cities: [], counties: [] },
      label: 'Residency Requirements',
      onFiltersChange: jest.fn(),
      states,
    };

    const activeStates = ['AR'];
    const comp = mount(<ResidencyRequirementsFilter {...props} />);
    const result = comp.instance().getActiveStatesOptions(activeStates);
    const expectedStates = find(result, res => res.initial === true);
    expect(expectedStates.value).toBe('AR');
  });

  describe('countNestedOptions', () => {
    const props = {
      fetchStatesGeography: jest.fn(),
      filters: { cities: [], counties: [] },
      label: 'Residency Requirements',
      onFiltersChange: jest.fn(),
      states,
    };
    it('all children', () => {
      const comp = mount(<ResidencyRequirementsFilter {...props} />);
      const result = comp.instance().countNestedOptions([{ children: [1, 2, 3, 4] }, { children: [5, 6, 7] }]);
      expect(result).toEqual(7);
    });

    it('some children', () => {
      const comp = mount(<ResidencyRequirementsFilter {...props} />);
      const result = comp.instance().countNestedOptions([{ children: [1, 2, 3, 4] }, { children: [] }, {}]);
      expect(result).toEqual(4);
    });

    it('no children', () => {
      const comp = mount(<ResidencyRequirementsFilter {...props} />);
      const result = comp.instance().countNestedOptions([{}, {}]);
      expect(result).toEqual(2);
    });
  });

  it('gets the active states options when no state is selected', () => {
    const props = {
      fetchStatesGeography: jest.fn(),
      filters: { cities: [], counties: [] },
      label: 'Residency Requirements',
      onFiltersChange: jest.fn(),
      states,
    };

    const activeStates = [];
    const comp = mount(<ResidencyRequirementsFilter {...props} />);
    const result = comp.instance().getActiveStatesOptions(activeStates);
    const expectedStates = find(result, res => res.initial === true);
    expect(expectedStates).toBeUndefined();
  });

  it('calls onResidencyOptionsChange after fetching the places', async () => {
    const onResidencyOptionsChange = jest.fn();
    const props = {
      fetchStatesGeography: jest.fn(() => Promise.resolve()),
      filters: { cities: [], counties: [] },
      label: 'Residency Requirements',
      onFiltersChange: jest.fn(),
      states,
      onResidencyOptionsChange,
    };
    const comp = mount(<ResidencyRequirementsFilter {...props} />);
    await comp.instance().fetchPlaces(['NY']);

    expect(onResidencyOptionsChange).toHaveBeenCalled();
  });

  it('overwrites the options when they are set by the parent', () => {
    const props = {
      fetchStatesGeography: jest.fn(),
      filters: { cities: [], counties: [] },
      label: 'Residency Requirements',
      onFiltersChange: jest.fn(),
      states,
    };

    const parentStatesOptions = [
      { label: 'Alaska', value: 'AK', initial: true },
      { label: 'Alabama', value: 'AL', initial: false },
    ];

    const parentCountiesOptions = [
      {
        state: { abbreviation: 'AK' },
        counties: [{ state: 'AK', state_code: '02', name: 'Aleutians East Borough', display_name: 'Aleutians East Borough', code: '013', full_code: '02013' }],
        count: 1,
      },
    ];

    const parentCitiesOptions = [
      {
        state: { abbreviation: 'AK' },
        places: [{ state: 'AK', state_code: '02', name: 'Aleutians East Borough', display_name: 'Aleutians East Borough', code: '013', full_code: '02013' }],
        count: 1,
      },
    ];

    const expectedCounties = [
      {
        allChildrenSelected: false,
        children: [
          { hasChildren: false, initial: false, label: 'Aleutians East Borough, AK', level: 1, value: '02013' },
        ],
        disabled: true,
        hasChildren: true,
        label: undefined,
        level: 0,
        value: 'AK',
      },
    ];
    const expectedCities = [
      {
        allChildrenSelected: false,
        children: [
          { hasChildren: false, initial: false, label: 'Aleutians East Borough, AK', level: 1, value: '02013' },
        ],
        disabled: true,
        hasChildren: true,
        label: undefined,
        level: 0,
        value: 'AK',
      },
    ];

    const comp = mount(<ResidencyRequirementsFilter {...props} />);
    comp.setProps({ parentStatesOptions, parentCountiesOptions, parentCitiesOptions });

    expect(comp.state('statesOptions')).toEqual(parentStatesOptions);
    expect(comp.state('countiesOptions')).toEqual(expectedCounties);
    expect(comp.state('citiesOptions')).toEqual(expectedCities);
  });
});
