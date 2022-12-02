import { formatNumber } from 'humanize-plus';

const RADIUS_OF_EARTH_IN_MILES = 3956;

function toRadians(x) {
  return (x / 180) * Math.PI;
}

function getDistanceInMiles(originLatLng = [], destinationLatLng = [], options = {}) {
  if (!originLatLng || !destinationLatLng) return '';
  if (originLatLng.length && destinationLatLng.length) {
    const origin = {
      lat: originLatLng[0],
      lng: originLatLng[1],
    };

    const destination = {
      lat: destinationLatLng[0],
      lng: destinationLatLng[1],
    };

    const lat1 = toRadians(origin.lat);
    const lat2 = toRadians(destination.lat);
    const lng1 = toRadians(origin.lng);
    const lng2 = toRadians(destination.lng);

    const latDifference = lat2 - lat1;
    const lngDifference = lng2 - lng1;

    const chord = (Math.sin(latDifference / 2) ** 2) +
          ((Math.sin(lngDifference / 2) ** 2) *
          Math.cos(lat1) * Math.cos(lat2));

    const angularDistance = 2 * Math.atan2(
      Math.sqrt(chord), Math.sqrt(1 - chord),
    );

    const convertedMiles = RADIUS_OF_EARTH_IN_MILES * angularDistance;

    if (options.format === 'float') {
      return convertedMiles;
    }

    const miles = formatNumber(convertedMiles, 2);
    const mileText = `${miles} mi`;

    return miles === '0.00' ? '0 mi' : mileText;
  }

  return '';
}

export default getDistanceInMiles;
