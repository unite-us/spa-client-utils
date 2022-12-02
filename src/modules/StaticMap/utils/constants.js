const createGoogleAPIFragment = googleKey => `https://maps.googleapis.com/maps/api/staticmap?key=${googleKey}`;
const STATIC_MARKER_URL = 'https://uniteus-io-assets.s3.amazonaws.com/app-client/location-marker.png';
const STATIC_MARKER_URL2X = 'https://uniteus-io-assets.s3.amazonaws.com/app-client/location-marker-2x.png';
const STATIC_MARKER_URL3X = 'https://uniteus-io-assets.s3.amazonaws.com/app-client/location-marker-3x.png';

export {
  createGoogleAPIFragment,
  STATIC_MARKER_URL,
  STATIC_MARKER_URL2X,
  STATIC_MARKER_URL3X,
};
