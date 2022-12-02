import React from 'react';
import PropTypes from 'prop-types';
import LabelTextInline from 'modules/Shared/LabelTextInline';

const ServiceAreas = ({
  className,
  service_areas,
}) => {
  const nationalServiceArea = service_areas.find(sA => sA.service_area_type === 'national');
  const statesServiceAreas = service_areas.filter(sA => sA.service_area_type === 'state').map(sA => sA.name);

  return (
    <div className={`${className}`}>
      <div>
        <h4 className="mb-one">Service Areas</h4>
        {nationalServiceArea &&
          <LabelTextInline
            className="mb-one"
            label="National"
            content="This program serves the entire country"
          />
        }
        {!nationalServiceArea &&
          <div>
            { statesServiceAreas.length > 0 &&
              <LabelTextInline
                className="mb-one"
                label="States"
                content={statesServiceAreas}
              />
            }
          </div>
        }
      </div>
    </div>
  );
};

ServiceAreas.propTypes = {
  className: PropTypes.string,
  /** Array of Service Areas objects. It can contain National Service area if the program serves the entire country, States or Cities */
  service_areas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      program: PropTypes.shape({
        id: PropTypes.string,
      }),
      service_area_type: PropTypes.string,
      state_abbreviation: PropTypes.string,
    }),
  ),
};

ServiceAreas.defaultProps = {
  className: '',
  service_areas: [],
};

export default ServiceAreas;
