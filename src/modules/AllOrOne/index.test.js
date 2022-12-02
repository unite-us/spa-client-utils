import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import AllOrOne from './index';

describe('AllOrOne', () => {
  const DummyLocation = ({ location }) => (
    <div>
      <p title={location.displayName}>
        {location.displayName} ({location.distance})
      </p>
    </div>
  );

  DummyLocation.propTypes = {
    location: PropTypes.object.isRequired,
  };

  const locations = [
    {
      displayName: '123 lol Street, Funmouth, MA 12345',
      distance: '11.41 mi',
    },
    {
      displayName: '123 Street, Funmouth, MA 12345',
      distance: '40.29 mi',
    },
  ];

  describe('returns null', () => {
    test('if the collection is empty', () => {
      expect(renderer.create(
        <AllOrOne>
          {
            [].map(location => (
              <DummyLocation key={location.displayName} location={location} />
            ))
          }
        </AllOrOne>,
      )).toMatchSnapshot();
    });

    test('if the collection is empty and showAll is true', () => {
      expect(renderer.create(
        <AllOrOne showAll>
          {
            [].map(location => (
              <DummyLocation key={location.displayName} location={location} />
            ))
          }
        </AllOrOne>,
      )).toMatchSnapshot();
    });

    test('if nothing is passed in', () => {
      expect(renderer.create(
        <AllOrOne />,
      )).toMatchSnapshot();
    });

    test('nothing is passed in and showAll is true', () => {
      expect(renderer.create(
        <AllOrOne showAll />,
      )).toMatchSnapshot();
    });
  });

  describe('returns the first in a collection', () => {
    test('if showAll is false', () => {
      expect(renderer.create(
        <AllOrOne>
          {
            locations.map(location => (
              <DummyLocation key={location.displayName} location={location} />
            ))
          }
        </AllOrOne>,
      )).toMatchSnapshot();
    });
  });

  describe('returns all the collection', () => {
    test('if showAll is true', () => {
      expect(renderer.create(
        <AllOrOne showAll>
          {
            locations.map(location => (
              <DummyLocation key={location.displayName} location={location} />
            ))
          }
        </AllOrOne>,
      )).toMatchSnapshot();
    });
  });
});
