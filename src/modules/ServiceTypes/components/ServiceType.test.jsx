import React from 'react';
import { shallow } from 'enzyme';
import ServiceType from './ServiceType';

const serviceType = {
  code: 'UU-BENEFITS',
  name: 'Benefits',
  children: [{
    code: 'UU-BENEFITS-IMMIGRATION-SERVICES',
    name: 'Immigration Services',
  }, {
    code: 'UU-BENEFITS-VETERANS-BENEFITS',
    name: 'Veterans Benefits',
  }],
};

const defaultProps = {
  serviceType,
  iconColor: '',
  level: 0,
  showIcon: true,
};

describe('ServiceType', () => {
  it('renders', () => {
    const component = shallow(<ServiceType {...defaultProps} />);
    expect(component.find('.ui-service-type')).toHaveLength(1);
  });

  it('renders a single parent service type', () => {
    const component = shallow(<ServiceType {...defaultProps} />);
    expect(component.find('.ui-service-type__parent')).toHaveLength(1);
  });

  it('displays an Icon for the parent service type', () => {
    const component = shallow(<ServiceType {...defaultProps} />);
    expect(component.find('Icon')).toHaveLength(1);
    expect(component.find('Icon').prop('icon')).toBe('Benefits');
  });

  it('renders a list of childen service types', () => {
    const component = shallow(<ServiceType {...defaultProps} />);
    const subTypes = component.find('.ui-service-type__item-children');

    expect(subTypes).toHaveLength(1);
    expect(subTypes.children()).toHaveLength(2);
  });

  it('does not display an Icon for the sub types', () => {
    const component = shallow(<ServiceType {...defaultProps} />);
    const subTypes = component.find('.ui-service-type__item-children');

    expect(subTypes.children()
      .find('ServiceType').first().prop('showIcon')).toBe(false);
  });

  it('does not display subtypes if there are none', () => {
    const propsWithoutSubtypes = {
      serviceType: {
        code: 'UU-BENEFITS',
        name: 'Benefits',
        children: [],
      },
      iconColor: '',
      level: 0,
      showIcon: true,
    };
    const component = shallow(<ServiceType {...propsWithoutSubtypes} />);
    const subTypes = component.find('.ui-service-type__item-children');

    expect(subTypes.children()).toHaveLength(0);
  });
});
