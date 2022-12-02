import { map, debounce } from 'lodash';

const getAddressOptions = (results) => {
  const options = map(results, result => ({
    address: result.formatted_address,
    result,
    id: result.place_id,
    latLng: {
      lat: result.geometry.location.lat(),
      lng: result.geometry.location.lng(),
    },
  }));

  return options;
};

const getGeoCodeOptions = debounce((address, callback, google) => {
  if (address.length > 3) {
    const geoCoder = new google.maps.Geocoder();
    geoCoder.geocode({ address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK || status === google.maps.GeocoderStatus.ZERO_RESULTS) {
        const options = getAddressOptions(results);
        callback(options);
      } else {
        /* eslint-disable-next-line no-console */
        console.warn(`Geocode was not successful for the following reason: ${status}`);
      }
    });
  } else {
    callback([]);
  }
}, 400);

export default getGeoCodeOptions;
