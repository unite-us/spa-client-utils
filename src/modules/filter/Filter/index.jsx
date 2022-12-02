import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import Humanize from 'humanize-plus';
import { SelectionBubble } from '@unite-us/ui';
import {
  ClearSelections,
  FilterOption,
  NoMatches,
  Search,
  SelectAll,
} from './components';
import {
  buildOptions,
  countOptions,
  createFilterId,
  filterOptions,
  getInitialFilters,
  isMultiLevel,
} from './utils';

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.filterOptions = this.filterOptions.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.onClearAll = this.onClearAll.bind(this);
    this.onClickOutside = this.onClickOutside.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
    this.setSelectedOptions = this.setSelectedOptions.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSelectAll = this.onSelectAll.bind(this);
    this.getAvailableOptions = this.getAvailableOptions.bind(this);
    this.setActiveFiltersAndOptionsCount = this.setActiveFiltersAndOptionsCount.bind(this);
    this.setAvailableAndSelectedOptions = this.setAvailableAndSelectedOptions.bind(this);
    this.asyncFilterOptions = this.asyncFilterOptions.bind(this);
    this.debouncedAsyncFilterOptions = _.debounce(this.asyncFilterOptions, props.asyncSearchDebounce);
    this.state = {
      activeFilters: getInitialFilters(props.options),
      availableOptions: [],
      filterKey: props.filterKey,
      loading: false,
      open: false,
      options: props.options,
      search: '',
      selectedOptions: [],
      totalOptionsCount: countOptions(props.options),
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickOutside);
    this.filterOptions();
  }

  componentDidUpdate(prevProps) {
    if (!this.state.open && !_.isEqual(this.props.options, prevProps.options)) {
      this.setActiveFiltersAndOptionsCount();
    }
  }

  componentWillUnmount() {
    this.setState({ open: false });
    document.removeEventListener('click', this.onClickOutside);
  }

  onButtonClick(e) {
    e.preventDefault();
    if (!this.state.open) {
      this.searchField.resetValue();
    }
    this.setState({ open: !this.state.open });
  }

  onClickOutside(e) {
    if (this.state.open) {
      const path = e.path || (e.composedPath && e.composedPath());
      const index = _.findIndex(path, this.filterWrapper);

      if (path && index < 0) {
        this.setState({ open: false });
      }
    }
  }

  onOptionChange(filter, value) {
    const { value: optValue } = filter;
    let newFilters = _.without(this.state.activeFilters, optValue);
    let newSelected = _.without(this.state.selectedOptions, filter);

    if (this.props.isSingleOptionSelect) {
      newFilters = [optValue];
      newSelected = [filter];
    } else if (value) {
      newFilters = newFilters.concat(optValue);
      newSelected = newSelected.concat(filter);
    }

    this.setState({
      activeFilters: newFilters,
      selectedOptions: newSelected,
    }, () => {
      this.props.onFiltersChange(newFilters, this.props.filterKey, {
        setSelectedOptions: this.setSelectedOptions,
        filterKey: optValue,
      });
      this.filterOptions();
    });
  }

  onSelectAll() {
    let options = this.state.options;

    if (isMultiLevel(options)) {
      options = buildOptions({ options, selected: this.state.activeFilters });
    }

    const newFilters = _.reduce(options, (acc, o) => {
      if (_.get(o, 'hasChildren', false)) {
        return acc;
      }
      return _.concat(acc, o.value);
    }, []);

    this.setState({ activeFilters: newFilters }, () => {
      this.filterOptions();
      this.props.onFiltersChange(newFilters, this.props.filterKey, {
        setSelectedOptions: this.setSelectedOptions,
      });
    });
  }

  onClearAll() {
    const newFilters = [];
    this.setState({ activeFilters: newFilters }, () => {
      this.filterOptions();
      this.props.onFiltersChange(newFilters, this.props.filterKey, {
        setSelectedOptions: this.setSelectedOptions,
      });
    });
  }

  onSearchChange(value) {
    const { asyncSearch } = this.props;
    const { search } = this.state;
    if (asyncSearch) {
      if (search !== value) {
        return this.setState({
          search: value || '',
          loading: true,
          availableOptions: [],
        }, this.debouncedAsyncFilterOptions);
      }
    }
    return this.setState({ search: value || '' }, this.filterOptions);
  }

  setSelectedOptions(options) {
    const activeFilters = options;
    const selectedOptions = options.map(
      id => this.state.options.find(o => o.value === id),
    );
    this.setState({ activeFilters, selectedOptions }, () => {
      this.filterOptions();
    });
  }

  getAvailableOptions(options = []) {
    if (isMultiLevel(options)) {
      return buildOptions({ options, selected: this.state.activeFilters });
    }
    return options;
  }

  setActiveFiltersAndOptionsCount() {
    const { options } = this.props;
    this.setState({
      activeFilters: getInitialFilters(options),
      options,
      totalOptionsCount: countOptions(options),
    }, this.filterOptions);
  }

  setAvailableAndSelectedOptions(availableOptions = [], options = []) {
    const {
      selectedOptions,
      activeFilters,
    } = this.state;

    const available = _.filter(availableOptions, opt =>
      _.indexOf(activeFilters, opt.value) < 0);
    const canBeSelectedOptions = _.uniqBy([...selectedOptions, ...options], 'value');
    const selected = _.filter(canBeSelectedOptions, opt =>
      _.indexOf(activeFilters, opt.value) >= 0);

    this.setState({
      availableOptions: (this.props.optionsRenderLimit < 0) ? available : _.take(available, this.props.optionsRenderLimit),
      selectedOptions: selected,
      loading: false,
    });
  }

  asyncFilterOptions() {
    const { asyncSearch } = this.props;
    const { search } = this.state;

    return asyncSearch(search).then((options) => {
      const available = this.getAvailableOptions(options);
      this.setAvailableAndSelectedOptions(available, options);
      this.setState({ options });
      return options;
    }).catch((error) => {
      this.setAvailableAndSelectedOptions([], []);
      return error;
    });
  }

  filterOptions() {
    let options = this.state.options;

    if (isMultiLevel(options)) {
      options = buildOptions({ options, selected: this.state.activeFilters });
    }

    let available = options;

    if (!_.isEmpty(this.state.search)) {
      const { filterSearchOptions } = this.props;
      const { search } = this.state;
      const filteredOptions = filterSearchOptions ?
        filterSearchOptions(this.state.options, search) :
        filterOptions(this.state.options, search);

      options = filteredOptions;
      available = this.getAvailableOptions(filteredOptions);
    }
    this.setAvailableAndSelectedOptions(available, options);
  }

  render() {
    const {
      asyncLoadingText,
      className,
      hideSelectAll,
      mustHaveOneSelected,
      name,
      noMatchesPlaceholder,
      optionsRenderLimit,
      pluralName,
      searchPlaceholder,
      uniqIdPrefix,
    } = this.props;

    const {
      activeFilters,
      availableOptions,
      loading,
      open,
      search,
      selectedOptions,
      totalOptionsCount,
    } = this.state;

    const filterClass = () => classNames({
      'ui-filter': true,
    }, className);

    const allOptionsSelected = activeFilters.length >= totalOptionsCount;

    const noMatchesFound = availableOptions.length <= 0;

    const filterButtonClass = () => classNames({
      open,
    });

    const dropdownClass = () => classNames({
      dropdown: true,
      open,
    });

    const countClass = () => classNames({
      'count-container': true,
      hidden: selectedOptions.length === 0,
    });

    const count = selectedOptions.length;

    return (
      <div
        className={filterClass()}
        id={createFilterId(name)}
        ref={(filterWrapper) => { this.filterWrapper = filterWrapper; }}
      >
        <button
          type="button"
          onClick={this.onButtonClick}
          className={filterButtonClass()}
        >
          {Humanize.titleCase(
            Humanize.pluralize(count || 1, name, pluralName),
          )}

          <span className={countClass()}>
            (<span className="count">{count}</span>)
          </span>
        </button>
        <div className={dropdownClass()}>

          <Search
            id={createFilterId(name)}
            label={`Search ${name}`}
            onChange={this.onSearchChange}
            placeholder={searchPlaceholder}
            ref={(searchField) => { this.searchField = searchField; }}
          />

          <div className="ui-filter__options">
            {
              !_.isEmpty(selectedOptions) ? (
                <div className="selected-options__container">
                  <div className="selected-options">
                    {
                      selectedOptions.map(o => (
                        <SelectionBubble
                          key={`uOpt-${o.value}-selected`}
                          label={o.label}
                          hideClose={mustHaveOneSelected && count === 1}
                          selected={o}
                          onClick={this.onOptionChange}
                        />
                      ))
                    }
                  </div>

                  {mustHaveOneSelected ?
                    <div className={'has-border'} /> :
                    <ClearSelections onClick={this.onClearAll} allOptionsSelected={allOptionsSelected} />
                  }
                </div>
              ) : null
            }
            <div className="filter-options__container">
              {
                loading && <div className="filter-options__container--loading">{asyncLoadingText}</div>
              }
              <SelectAll
                hide={hideSelectAll || noMatchesFound || allOptionsSelected || optionsRenderLimit > 0}
                onSelectAll={this.onSelectAll}
              />

              {
                this.state.availableOptions.map(o => (
                  <FilterOption
                    selected={_.indexOf(activeFilters, o.value) >= 0}
                    key={`uOpt-${o.value}`}
                    onChange={this.onOptionChange}
                    option={o}
                    searchTerm={search}
                    uniqIdPrefix={uniqIdPrefix}
                  />
                ))
              }
              <NoMatches
                noMatchesFound={!loading && (allOptionsSelected || noMatchesFound)}
                placeholder={noMatchesPlaceholder}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  /** className for reference */
  className: PropTypes.string,
  /** Filter key used when storing selected filter to state. i.e. serviceTypes */
  filterKey: PropTypes.string,
  /** returns an array of filtered searched ServiceType options */
  filterSearchOptions: PropTypes.func,
  /** Don't allow user to remove all options */
  mustHaveOneSelected: PropTypes.bool,
  /** Should hide select all button */
  hideSelectAll: PropTypes.bool,
  /** Only allows one option to be selected at a time */
  isSingleOptionSelect: PropTypes.bool,
  /** Singular name to display on Filter button (i.e. 'Population') */
  name: PropTypes.string.isRequired,
  /** Plural name to display on Filter in case Humanize can't handle it */
  pluralName: PropTypes.string,
  /**
   * @param {array} activeFilters array of selected filters
   * @param {string} key filterKey
   * @public
  */
  onFiltersChange: PropTypes.func.isRequired,
  /**
   * Accepts Promise resolving an array of formatted options
   * @param {string} search
  */
  asyncSearch: PropTypes.func,
  /** Debouce wait for the asyncSearch */
  asyncSearchDebounce: PropTypes.number,
  /** Async loading text displayed while waiting for the promise */
  asyncLoadingText: PropTypes.string,
  /** Array of filter options objects */
  options: PropTypes.array.isRequired,
  /** Maximum number of options to render in case of long options array (-1 is unlimited) */
  optionsRenderLimit: PropTypes.number,
  /** Placeholder text for when no matches are found */
  noMatchesPlaceholder: PropTypes.string,
  /** Placeholder text for search */
  searchPlaceholder: PropTypes.string,
  /** A prefix to prevent ID conflicts when multiple filters share the same option list */
  uniqIdPrefix: PropTypes.string,
};

Filter.defaultProps = {
  className: '',
  filterKey: '',
  filterSearchOptions: undefined,
  asyncSearch: undefined,
  mustHaveOneSelected: false,
  hideSelectAll: false,
  isSingleOptionSelect: false,
  optionsRenderLimit: -1,
  noMatchesPlaceholder: 'No Results Found',
  pluralName: null,
  searchPlaceholder: 'Search',
  uniqIdPrefix: '',
  asyncSearchDebounce: 400,
  asyncLoadingText: 'Loading...',
};
