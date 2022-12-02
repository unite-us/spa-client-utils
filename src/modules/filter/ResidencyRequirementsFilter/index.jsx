import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  debounce,
  get,
  indexOf,
  isEmpty,
  isEqual,
  map,
  uuPick,
  reduce,
  noop,
} from 'lodash';
import Filter from '../Filter';

const defaultLocationState = {
  citiesOptions: [],
  countiesOptions: [],
  citiesPlaceholder: 'Select state(s) first',
  countiesPlaceholder: 'Select state(s) first',
  countiesResponse: [],
  citiesResponse: [],
  states: [],
  counties: [],
  cities: [],
};

class ResidencyRequirementsFilter extends Component {
  constructor(props) {
    super(props);

    this.countNestedOptions = this.countNestedOptions.bind(this);
    this.debouncedChange = debounce(props.onFiltersChange, 400);
    this.fetchPlaces = this.fetchPlaces.bind(this);
    this.getActiveStatesOptions = this.getActiveStatesOptions.bind(this);
    this.getChildren = this.getChildren.bind(this);
    this.getPlaceholderText = this.getPlaceholderText.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.mapPlaces = this.mapPlaces.bind(this);
    this.setOptionsFromParent = this.setOptionsFromParent.bind(this);

    this.countyFilter = null;
    this.countyRenderLimit = 50;
    this.cityFilter = null;
    this.cityRenderLimit = 50;

    this.state = {
      ...defaultLocationState,
      statesOptions: props.states,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const oldStates = get(this.props, 'filters.states', []);
    const newStates = get(nextProps, 'filters.states', []);
    const { parentStatesOptions } = nextProps;
    if (isEmpty(parentStatesOptions) && !isEmpty(oldStates) && !isEqual(oldStates, newStates)) {
      const statesOptions = this.getActiveStatesOptions(newStates);
      this.setState({
        statesOptions,
      });
      this.handleChange(newStates, 'states');
    }
  }

  componentDidUpdate(prevProps) {
    this.setOptionsFromParent(prevProps);
  }

  getChildren(places, selected) {
    return map(places, (place = {}) => ({
      label: get(place, 'display_name', '').concat(', ', place.state),
      value: place.full_code,
      initial: indexOf(selected, place.full_code) >= 0,
    }), []);
  }

  getPlaceholderText(renderLimit, optionsCount) {
    return optionsCount >= renderLimit ?
      `Showing ${renderLimit} results - Type to narrow search`
      : 'Search';
  }

  getActiveStatesOptions(states) {
    return reduce(this.state.statesOptions, (acc, opt) =>
      [
        ...acc,
        {
          label: opt.label,
          value: opt.value,
          initial: indexOf(states, opt.value) >= 0,
        },
      ], []);
  }

  setOptionsFromParent(prevProps) {
    const {
      filters,
      parentCitiesOptions,
      parentCountiesOptions,
      parentStatesOptions,
    } = this.props;

    if (!isEmpty(parentStatesOptions) && !isEqual(parentStatesOptions, prevProps.parentStatesOptions)) {
      this.setState({
        statesOptions: parentStatesOptions,
      });
    }

    if (!isEmpty(parentStatesOptions) && !isEqual(parentCountiesOptions, prevProps.parentCountiesOptions)) {
      const countiesOptions = this.mapPlaces(parentCountiesOptions, 'counties', get(filters, 'counties', []));
      const countiesPlaceholder = this.getPlaceholderText(this.countyRenderLimit, this.countNestedOptions(countiesOptions));

      this.setState({
        countiesOptions,
        countiesPlaceholder,
      });
    }

    if (!isEmpty(parentStatesOptions) && !isEqual(parentCitiesOptions, prevProps.parentCitiesOptions)) {
      const citiesOptions = this.mapPlaces(parentCitiesOptions, 'places', get(filters, 'cities', []));
      const citiesPlaceholder = this.getPlaceholderText(this.cityRenderLimit, this.countNestedOptions(citiesOptions));

      this.setState({
        citiesOptions,
        citiesPlaceholder,
      });
    }
  }

  countNestedOptions(nestedOptions) {
    const counterFunc = (memo, option) => memo + get(option, 'children.length', 0);
    const total = reduce(nestedOptions, counterFunc, 0);

    if (total > 0) {
      return total;
    }

    // If none of `nestedOptions` has children, then the length is that of `nestedOptions`.
    return nestedOptions.length;
  }

  fetchPlaces(states) {
    const promises = Promise.all([
      this.props.fetchStatesGeography(states, 'counties'),
      this.props.fetchStatesGeography(states, 'places'),
    ]);

    promises.then(([counties, cities]) => {
      const { filters } = this.props;
      const countiesOptions = this.mapPlaces(counties, 'counties', get(filters, 'counties', []));
      const citiesOptions = this.mapPlaces(cities, 'places', get(filters, 'cities', []));

      const countiesPlaceholder = this.getPlaceholderText(this.countyRenderLimit, this.countNestedOptions(countiesOptions));
      const citiesPlaceholder = this.getPlaceholderText(this.cityRenderLimit, this.countNestedOptions(citiesOptions));

      this.props.onResidencyOptionsChange(counties, cities);
      this.setState({
        countiesResponse: counties,
        citiesResponse: cities,
        countiesOptions,
        citiesOptions,
        countiesPlaceholder,
        citiesPlaceholder,
      }, () => {
        this.countyFilter.onOptionChange({});
        this.cityFilter.onOptionChange({});
      });
    });

    return promises;
  }

  mapPlaces(places, placePath, selected = []) {
    return map(places, (place = {}) => ({
      label: place.state.display_name,
      value: place.state.abbreviation,
      children: this.getChildren(get(place, placePath), selected),
    }));
  }

  handleChange(filters, key) {
    if (key === 'states') {
      if (isEmpty(filters)) {
        return this.setState({
          ...defaultLocationState,
        }, () => {
          this.handleChange([], 'counties');
          this.handleChange([], 'cities');
        });
      }
      const statesOptions = this.getActiveStatesOptions(filters);
      return this.fetchPlaces(filters).then(() => {
        this.setState({
          states: filters,
          statesOptions,
        }, () => this.debouncedChange(
          uuPick(this.state, ['states', 'counties', 'cities']),
        ));
      });
    }

    if (key === 'counties') {
      if (isEmpty(filters)) {
        this.handleChange([], 'cities');
      }
    }

    const optionsKey = `${key}Options`;
    const responseKey = `${key}Response`;
    const newOptions = this.mapPlaces(get(this.state, responseKey, []), key === 'counties' ? 'counties' : 'places', filters);

    return this.setState({
      [key]: filters,
      [optionsKey]: newOptions,
    }, () => this.debouncedChange(
      uuPick(this.state, ['states', 'counties', 'cities']),
    ));
  }

  render() {
    const {
      label,
    } = this.props;

    return (
      <div className="ui-filter-section ui-residency-requirements">
        <h5 className="ui-filter-section__label">{label}</h5>
        <Filter
          id="ui-residency-states"
          name="state"
          filterKey="states"
          options={this.state.statesOptions}
          onFiltersChange={this.handleChange}
          uniqIdPrefix="residency-states"
        />

        <Filter
          ref={(c) => { this.countyFilter = c; }}
          id="ui-residency-counties"
          name="county"
          pluralName="counties"
          filterKey="counties"
          options={this.state.countiesOptions}
          onFiltersChange={this.handleChange}
          optionsRenderLimit={this.countyRenderLimit}
          searchPlaceholder={this.state.countiesPlaceholder}
          uniqIdPrefix="residency-counties"
        />

        <Filter
          ref={(c) => { this.cityFilter = c; }}
          id="ui-residency-cities"
          name="city"
          pluralName="cities"
          filterKey="cities"
          options={this.state.citiesOptions}
          onFiltersChange={this.handleChange}
          optionsRenderLimit={this.cityRenderLimit}
          searchPlaceholder={this.state.citiesPlaceholder}
          uniqIdPrefix="residency-cities"
        />
      </div>
    );
  }
}

ResidencyRequirementsFilter.propTypes = {
  /** action calling the geo API */
  fetchStatesGeography: PropTypes.func.isRequired,
  /** current filters */
  filters: PropTypes.object.isRequired,
  /** Label of the filter group */
  label: PropTypes.string.isRequired,
  /**
   * @param {array} activeFilters array of selected filters
   * @public
  */
  onFiltersChange: PropTypes.func.isRequired,
  /**
    @param {array} countiesOptions array of counties for the action
    @param {array} citiesOptions array of cities for the action
  */
  onResidencyOptionsChange: PropTypes.func,
  /** array of US states */
  states: PropTypes.array.isRequired,
  /** array of states options set by the parent */
  parentStatesOptions: PropTypes.array,
  /** array of counties options set by the parent */
  parentCountiesOptions: PropTypes.array,
  /** array of cities options set by the parent */
  parentCitiesOptions: PropTypes.array,
};

ResidencyRequirementsFilter.defaultProps = {
  onResidencyOptionsChange: noop,
  parentCitiesOptions: [],
  parentCountiesOptions: [],
  parentStatesOptions: [],
};

export default ResidencyRequirementsFilter;
