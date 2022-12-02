import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { has, isEmpty } from 'lodash';
import { Icon } from '@unite-us/ui';
import getIcon from '../utils/getIcon';

const ServiceType = ({ serviceType, level, showIcon, iconColor }) => {
  const itemClass = () => classNames({
    'ui-service-type': true,
    'ui-service-type__parent': level <= 0,
    'ui-service-type__child': level > 0,
  });

  return (
    <li className={itemClass()}>
      <div className="ui-service-type__item">
        {
          showIcon &&
            <span className="ui-service-type__item-icon">
              <Icon icon={getIcon(serviceType.code)} color={iconColor} size={18} />
            </span>
        }
        <span className="ui-service-type__item-name">
          {serviceType.name}
        </span>
      </div>
      {
        has(serviceType, 'children') && !isEmpty(serviceType.children) &&
          <ul className="ui-service-type__item-children list-unstyled">
            {
              serviceType.children.map(st => (
                <ServiceType
                  key={`ui-service-type-${level}-${st.code}`}
                  serviceType={st}
                  level={level + 1}
                  showIcon={false}
                  iconColor={iconColor}
                />
              ))
            }
          </ul>
      }
    </li>
  );
};

ServiceType.propTypes = {
  iconColor: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  serviceType: PropTypes.shape({
    children: PropTypes.array,
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  showIcon: PropTypes.bool.isRequired,
};

ServiceType.defaultProps = {
  serviceType: PropTypes.shape({
    children: undefined,
  }),
};

export default ServiceType;
