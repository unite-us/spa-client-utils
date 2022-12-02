import React from 'react';
import PropTypes from 'prop-types';
import ServiceType from './components/ServiceType';

const ServiceTypes = ({ iconColor, serviceTypes = [] }) => (
  <ul className="ui-service-types list-unstyled">
    {
      serviceTypes.map(st => (
        <ServiceType
          iconColor={iconColor}
          key={`service-type-${st.code}`}
          level={0}
          serviceType={st}
          showIcon
        />
      ))
    }
  </ul>
);

ServiceTypes.propTypes = {
  /** color of ServiceType icons */
  iconColor: PropTypes.string.isRequired,
  /** array of serviceType objects */
  serviceTypes: PropTypes.array.isRequired,
};

ServiceTypes.defaultProps = {
  iconColor: '#712F79', // $eggplant-color
};

export default ServiceTypes;
