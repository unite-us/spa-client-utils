import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import browser from 'modules/utils/browser';
import {
  createFilterId,
} from '../Filter/utils';
import {
  findFirstOption,
  formatDropdownOptions,
} from './utils';
import FilterOption from './components/FilterOption';

export default class FilterSingle extends Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.onClickOutside = this.onClickOutside.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);

    const { value } = props;
    const options = formatDropdownOptions(props.options);

    this.state = {
      open: false,
      options,
      value,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickOutside);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const value = nextProps.value;
    if (!_.isEqual(value, this.props.value)) {
      this.setState({ value });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickOutside);
  }

  onButtonClick(e) {
    e.preventDefault();
    this.setState({ open: !this.state.open });
  }

  onClickOutside(e) {
    if (this.state.open) {
      const path = browser.getEventPath(e);
      const index = _.findIndex(path, this.filterWrapper);
      if (index < 0) {
        this.setState({ open: false });
      }
    }
  }

  onOptionChange(selectedFilter, value) {
    this.props.onFilterChange(selectedFilter, value);
    this.setState({ value, open: false });
  }

  render() {
    const {
      className,
      name,
      uniqIdPrefix,
    } = this.props;
    const { options, value } = this.state;
    const activeFilter = _.find(options, { value }, findFirstOption(options));

    const optionElements = _.map(this.state.options, option => (
      <FilterOption
        id={`${uniqIdPrefix}${name}-${option.value}`}
        isActive={activeFilter.value === option.value}
        key={`${name}-${option.value}`}
        name={name}
        onChange={this.onOptionChange}
        option={option}
      />
    ));

    const currentFilter = _.find(this.state.options, { value });

    const filterClass = () => classNames({
      'ui-filter-single': true,
    }, className);

    const filterButtonClass = () => classNames({
      open: this.state.open,
    });

    const dropdownClass = () => classNames({
      dropdown: true,
      open: this.state.open,
    });

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
          {currentFilter.label}
        </button>
        <div className={dropdownClass()}>
          <div className="ui-filter-single__options">
            <div className="ui-filter-options__container">
              {optionElements}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FilterSingle.propTypes = {
  /** className for reference */
  className: PropTypes.string,
  /** Current selected filter to display on FilterSingle button (i.e. 'Cases') */
  name: PropTypes.string.isRequired,
  /**
   * @param {object} activeFilter the current filter option (object)
   * @param {string} value string value
   * @public
  */
  onFilterChange: PropTypes.func.isRequired,
  /** Array of filter options objects */
  options: PropTypes.array.isRequired,
  /** FilterSingle value of current selected option */
  value: PropTypes.string.isRequired,
  /** A prefix to prevent ID conflicts when multiple filters share the same option list */
  uniqIdPrefix: PropTypes.string,
};

FilterSingle.defaultProps = {
  className: '',
  uniqIdPrefix: '',
};
