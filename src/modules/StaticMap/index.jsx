import React from 'react';
import PropTypes from 'prop-types';
import { createGoogleAPIFragment, STATIC_MARKER_URL } from './utils/constants';
import { styles } from './utils/mapScheme';
import { getStaticMapScheme, getMarkerScheme } from './utils';

const StaticMap = ({ latLng, scale, scheme, size, zoom, apiKey }) => {
  const { latitude, longitude } = latLng;

  const apiUrl = createGoogleAPIFragment(apiKey);
  const center = `${latitude},${longitude}`;
  const markers = `&markers=${getMarkerScheme({
    center: `${center}`,
    icon: `${STATIC_MARKER_URL}`,
    scale: `${scale}`,
  })}`;
  const mapCenter = `&center=${center}`;
  const mapScale = `&scale=${scale}`;
  const mapScheme = `&${getStaticMapScheme(scheme)}`;
  const mapSize = `&size=${size}`;
  const mapZoom = `&zoom=${zoom}`;
  const mapSrc = `${apiUrl}${mapCenter}${markers}${mapScheme}${mapSize}${mapZoom}${mapScale}`;

  return (
    <div className="map">
      <div className="map__absolute">
        <img
          alt="map"
          className="map__static"
          src={mapSrc}
        />
      </div>
    </div>
  );
};

StaticMap.propTypes = {
  latLng: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
  scale: PropTypes.string,
  scheme: PropTypes.array,
  size: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  zoom: PropTypes.string,
};

StaticMap.defaultProps = {
  scheme: styles,
  // this is the existing drawer size
  size: '470x470',
  // there are certain numbers here, check Google Maps API
  zoom: '16',
  // there are certain numbers here, check Google Static Map API
  scale: '1',
};

export default StaticMap;
