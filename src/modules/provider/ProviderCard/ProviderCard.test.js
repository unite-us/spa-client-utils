import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import group from 'testUtils/group.json';
import ProviderCard from './ProviderCard';

jest.mock('@unite-us/ui', () => ({
  ...require.requireActual('@unite-us/ui'),
  Icon: jest.fn(() => <mock-icon />),
}));

// TODO: fix tests for day of week
describe('ProviderCard', () => {
  const mockDate = new Date('2020-01-01T00:00:00');

  beforeEach(() => {
    global.Date = class extends Date {
      constructor() {
        super();
        return mockDate;
      }
    };
  });

  it('renders', () => {
    const props = {
      provider: group,
      selectedServiceType: {},
    };

    expect(renderer.create(<ProviderCard {...props} />)).toMatchSnapshot();
  });

  it('calls the add/remove callbacks', () => {
    const onAddProvider = jest.fn();
    const onRemoveProvider = jest.fn();
    const props = {
      disableSelection: false,
      provider: group,
      isSelected: false,
      onAddProvider,
      onRemoveProvider,
      selectedServiceType: {},
    };

    const groupWithDistance = {
      ...group,
      distance: '',
    };

    const comp = shallow(<ProviderCard {...props} />);
    comp.instance().onAddProvider();
    expect(onAddProvider).toHaveBeenCalledWith(groupWithDistance);
    comp.instance().onRemoveProvider();
    expect(onRemoveProvider).toHaveBeenCalledWith(group);
  });

  it('renders multiple service types', () => {
    const props = {
      provider: group,
      selectedServiceType: [
        {
          id: '50126fcb-a3e9-45d5-9a8e-c32b7fd810b4',
          name: 'Benefits',
        },
        {
          id: 'c088b0bd-9d90-4aaf-9841-ff29bf6311b3',
          name: 'Clothing & Household Goods',
        },
        {
          id: '123-ba-match',
          name: 'No Match Here',
        },
      ],
    };

    expect(renderer.create(<ProviderCard {...props} />)).toMatchSnapshot();
  });

  it('renders with no service types', () => {
    const props = {
      provider: group,
      selectedServiceType: [],
    };

    expect(renderer.create(<ProviderCard {...props} />)).toMatchSnapshot();
  });

  it('renders disabled', () => {
    const props = {
      provider: group,
      selectedServiceType: [],
    };

    expect(renderer.create(
      <ProviderCard {...props} disableSelection />,
    )).toMatchSnapshot();
  });

  it('renders unselectable', () => {
    const props = {
      provider: group,
      selectedServiceType: [],
    };
    expect(renderer.create(
      <ProviderCard {...props} unselectable />,
    )).toMatchSnapshot();
  });

  it('calls the onDetailClick callback', () => {
    const onDetailClick = jest.fn();
    const props = {
      disableSelection: false,
      provider: group,
      isSelected: false,
      onAddProvider: jest.fn(),
      onRemoveProvider: jest.fn(),
      selectedServiceType: {},
      onDetailClick,
    };

    const event = { preventDefault: jest.fn() };

    const comp = shallow(<ProviderCard {...props} />);
    comp.instance().onDetailClick(event);
    expect(onDetailClick).toHaveBeenCalledWith(group);
  });

  it('shows indication for OON provider', () => {
    const props = {
      provider: {
        ...group,
        group_type: 'out_of_network',
      },
      selectedServiceType: {},
    };

    expect(renderer.create(<ProviderCard {...props} />)).toMatchSnapshot();
  });

  it('shows indication for external providers (same as OON)', () => {
    const props = {
      provider: {
        ...group,
        group_type: 'external_provider',
      },
      selectedServiceType: {},
    };

    expect(renderer.create(<ProviderCard {...props} />)).toMatchSnapshot();
  });

  describe('provider details', () => {
    const defaultProps = {
      isSelected: false,
      onAddProvider: jest.fn(),
      onDetailClick: jest.fn(),
      onRemoveProvider: jest.fn(),
      originLatLng: [42.4191639, -71.0269413],
      provider: group,
      selectedServiceType: {},
    };

    it('hides address when provider address does not exist', () => {
      const props = {
        ...defaultProps,
        provider: {
          ...group,
          addresses: [],
        },
      };

      const wrapper = shallow(<ProviderCard {...props} />);
      expect(wrapper.find('.ui-provider-card__address')).toHaveLength(0);
    });

    it('hides distance when provider address does not exist', () => {
      const wrapper = shallow(<ProviderCard {...defaultProps} originLatLng={[]} />);
      expect(wrapper.find('.ui-provider-card__distance')).toHaveLength(0);
    });

    it('hides distance when originLatLng does not exist', () => {
      const wrapper = shallow(<ProviderCard {...defaultProps} originLatLng={[]} />);
      expect(wrapper.find('.ui-provider-card__distance')).toHaveLength(0);
    });

    it('hides hours of operation when provider hours_of_operation does not exist', () => {
      const props = {
        ...defaultProps,
        provider: {
          ...group,
          hours_of_operation: [],
          hours: {},
        },
      };

      const wrapper = shallow(<ProviderCard {...props} />);
      expect(wrapper.find('.ui-provider-card__hours')).toHaveLength(0);
    });

    it('hides phone number when provider phone_numbers does not exist', () => {
      const props = {
        ...defaultProps,
        provider: {
          ...group,
          phone_numbers: [],
        },
      };

      const wrapper = shallow(<ProviderCard {...props} />);
      expect(wrapper.find('.ui-provider-card__phone')).toHaveLength(0);
    });

    it('hides website url when provider website_url does not exist', () => {
      const props = {
        ...defaultProps,
        provider: {
          ...group,
          website_url: '',
        },
      };

      const wrapper = shallow(<ProviderCard {...props} />);
      expect(wrapper.find('.ui-provider-card__url')).toHaveLength(0);
    });

    it('Show provider hours of operation', () => {
      const props = {
        ...defaultProps,
        provider: {
          ...group,
        },
      };

      const wrapper = shallow(<ProviderCard {...props} />);
      expect(wrapper.find('.ui-provider-card__hours')).toHaveLength(1);
      expect(wrapper.find('.ui-provider-card__hours').text().includes('9:00 AM - 5:00 PM')).toBe(true);
    });
  });
});
