import _ from 'lodash';

export default function getMarkerScheme({ anchor = 'center', center, ...rest }) {
  // rebuild marker to prevent appending the key name "center" to the marker descriptor string
  const marker = { anchor, ...rest };

  const markerStrings = _.reduce(marker, (markerParams, value, key) => {
    // guarding against empty values, but allowing 0 as a valid vlaue
    if (!_.isEmpty(value) || _.isNumber(value)) {
      markerParams.push(`${key}:${value}`);
    }

    return markerParams;
  }, []);

  const markerDescriptor = markerStrings.join('|');

  // append `center` to marker descriptor without a center key
  return encodeURI(`${markerDescriptor}|${center}`);
}
