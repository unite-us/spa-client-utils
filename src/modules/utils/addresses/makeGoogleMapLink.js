import getAddressString from './getAddressString';

const makeGoogleMapLink = address => (
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(getAddressString(address))}`
);

export default makeGoogleMapLink;
