import React from 'react';
import PropTypes from 'prop-types';
import Filter from '../Filter';

const SpecializedSupportFilter = (props) => {
  const {
    accessibility,
    label,
    languages,
    onFiltersChange,
    populations,
  } = props;

  return (
    <div className="ui-filter-section ui-specialized-support-section">
      <h5 className="ui-filter-section__label">{label}</h5>
      <Filter
        filterKey="catersTo"
        name="Populations Specialized in Serving"
        onFiltersChange={onFiltersChange}
        options={populations}
        pluralName="Populations Specialized in Serving"
      />

      <Filter
        filterKey="accessibility"
        name="Accessibility"
        onFiltersChange={onFiltersChange}
        options={accessibility}
        pluralName="Accessibility"
      />

      <Filter
        filterKey="languages"
        name="Language"
        onFiltersChange={onFiltersChange}
        options={languages}
      />
    </div>
  );
};

SpecializedSupportFilter.propTypes = {
  /** array of accessibility options */
  accessibility: PropTypes.array.isRequired,
  /** label of the filter group */
  label: PropTypes.string.isRequired,
  /** array of languages options */
  languages: PropTypes.array.isRequired,
  /**
   * @param {array} activeFilters array of selected filters
   * @param {string} key filterKey
   * @public
  */
  onFiltersChange: PropTypes.func.isRequired,
  /** array of populations options */
  populations: PropTypes.array.isRequired,
};

export default SpecializedSupportFilter;
