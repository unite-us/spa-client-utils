import React from 'react';
import PropTypes from 'prop-types';
import { pluralize } from 'humanize-plus';
import { isEmpty, map, sortBy, uniqueId } from 'lodash';
import AllOrOne from 'modules/AllOrOne';
import Location from 'modules/locations/Location';
import addresses from 'modules/utils/addresses';

const Locations = ({
  className,
  clickableAddress,
  hideLocationName,
  isInNetworkGroup,
  locations,
  originLatLng,
  showCount,
  showMore,
  locationAdditionalContentComponent,
}) => {
  const calculatedDistances = map(locations, location => addresses.calculateDistance(location, originLatLng));
  const formattedLocations = sortBy(calculatedDistances, 'distanceVal') || [];

  if (isEmpty(formattedLocations)) {
    return null;
  }

  return (
    <div className={`ui-locations ${className}`}>
      {showCount && <h4 className="ui-locations-header">
        {`${formattedLocations.length} ${pluralize(formattedLocations.length, 'Location')}`}
      </h4>}
      <AllOrOne showAll={showMore}>
        {
          formattedLocations.map(location => (
            <div
              className="ui-location__container mb-half pt-half pb-half"
              key={location.id || uniqueId(location.name || location.displayName)}
            >
              <Location
                clickableAddress={clickableAddress}
                hideLocationName={hideLocationName}
                isInNetworkGroup={isInNetworkGroup}
                location={location}
                originLatLng={originLatLng}
                showMore={showMore}
                additionalContentComponent={locationAdditionalContentComponent}
              />
            </div>
          ))
        }
      </AllOrOne>
    </div>
  );
};

Locations.propTypes = {
  className: PropTypes.string,
  clickableAddress: PropTypes.bool,
  hideLocationName: PropTypes.bool,
  isInNetworkGroup: PropTypes.bool,
  locations: PropTypes.array,
  originLatLng: PropTypes.array,
  showCount: PropTypes.bool,
  showMore: PropTypes.bool,
  /**
   * Property passed down to location component that will render in the main content area of the component.
   * This feature is used to render an edit location link.
   */
  locationAdditionalContentComponent: PropTypes.func,
};

Locations.defaultProps = {
  className: '',
  clickableAddress: false,
  hideLocationName: false,
  isInNetworkGroup: true,
  locations: [],
  originLatLng: [],
  showCount: true,
  showMore: false,
  locationAdditionalContentComponent: null,
};

export default Locations;
