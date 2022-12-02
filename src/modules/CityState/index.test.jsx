import React from 'react';
import { shallow } from 'enzyme';
import CityState from './index';

describe('CityState', () => {
  describe('renders null', () => {
    it('and throws prop type warning with no address in props', () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(message => (message));
      const cityState = shallow(<CityState />);

      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringMatching('Failed prop type'));
      expect(cityState.html()).toBeNull();
      consoleErrorSpy.mockRestore();
    });

    it('if address has no city or state', () => {
      const props = {
        address: {
          city: null,
          state: null,
        },
      };

      const cityState = shallow(<CityState {...props} />);
      expect(cityState.html()).toBeNull();
    });
  });

  describe('renders county if passed in an address with', () => {
    it('a city', () => {
      const props = {
        address: {
          city: 'Compton',
        },
      };

      const cityState = shallow(<CityState {...props} />);
      expect(cityState.html()).toBe('<span>Compton </span>');
    });

    it('a state', () => {
      const props = {
        address: {
          state: 'CA',
        },
      };

      const cityState = shallow(<CityState {...props} />);
      expect(cityState.html()).toBe('<span>CA </span>');
    });
    it('a city and state', () => {
      const props = {
        address: {
          city: 'Compton',
          state: 'CA',
        },
      };

      const cityState = shallow(<CityState {...props} />);
      expect(cityState.html()).toBe('<span>Compton, <abbr>CA </abbr></span>');
    });
  });
});
