import _ from 'lodash';
import serviceTypeUtils from 'modules/utils/serviceTypes';
import { createFilterTrackingObject, SERIALIZER_DICTIONARY } from './utils';

// a sample serializedScheme
// {
//   keys: ['end_at', 'send_email', 'start_at', 'target_ids', 'target_type', 'time_field', 'time_period', 'type'],
//   prefix: 'export',
//   transformers: {
//     target_ids: (values) => values.map(val => val.id),
//   },
// }

// used in Serializer.buildFilters
// key will be 'places' or 'counties'
function mapLocations(locationsObj, key, locations) {
  const citiesOrCounties = Object.values(locationsObj)
    .reduce((acc, currentLocation) => {
      if (currentLocation[key]) {
        return [...acc].concat(currentLocation[key]);
      }
      return acc;
    }, []);

  const matchedCitiesOrCounties = citiesOrCounties
    .filter(location => locations.includes(location.full_code));

  return matchedCitiesOrCounties.map(matchedLocation => ({
    name: matchedLocation.display_name,
    full_code: matchedLocation.full_code,
    state: matchedLocation.state,
  }));
}


function formatDistance(distance) {
  return distance === 'any' ? null : distance;
}

function formatAddressType(type) {
  return [type, _.get(type, 'value')].includes('ours') ? null : type;
}


class Serializer {
  static build(obj) {
    // This is expecting obj to have only one key so the array returned is [ [ key, value ] ],
    // we want to destructure the first array
    const [type, rawObject] = Object.entries(obj)[0];

    // The Object constructor creates an object wrapper for the given value.
    // If the value is null or undefined, it will create and return an empty object,
    // otherwise, it will return an object of a type that corresponds to the given value.
    // If the value is an object already, it will return the value.
    // Use this check to short circuit work for null, undefined or primitives
    if (rawObject !== Object(rawObject)) {
      return rawObject;
    }

    const serializedScheme = SERIALIZER_DICTIONARY[type];

    // there is a defined serializer for the type
    if (serializedScheme) {
      const { keys, prefix, transformers } = serializedScheme;

      // Object.entries returns an array for an object that looks like [[key, value], [key, value], [key, value]]
      return Object.entries(rawObject)
        .reduce((acc, [key, value]) => {
          // look for current key in the array of whitelisted keys
          if (keys.includes(key)) {
            // create new key if there is a prefix found
            const prefixedKey = prefix ? `${prefix}_${key}` : key;

            // check to see if there is any transformation needed for the values
            if (transformers && transformers[key]) {
              return {
                ...acc,
                [prefixedKey]: transformers[key](value),
              };
            }

            return {
              ...acc,
              [prefixedKey]: value,
            };
          }
          // return the acc if the key is not found in the array of whitelisted keys
          return acc;
        }, {});
    }

    // no defined serializer for the type, so return the object passed in
    return rawObject;
  }

  static buildFilters({ langs, geography, network, filters, services }) {
    // pull these out of the rest of the filters for building readable data for tracking
    const { counties, cities, languages, ...rest } = filters;

    // build slim counties matching the county full codes from filters
    const countyObjs = mapLocations(geography, 'counties', counties);

    // build slim cities matching the city full codes from filters
    const cityObjs = mapLocations(geography, 'places', cities);

    // use the display name of the language found from the values in filters
    const languageStrings = langs.reduce((acc, currentLanguage) => {
      if (languages.includes(currentLanguage.value)) {
        return [...acc, currentLanguage.display_name];
      }
      return acc;
    }, []);

    const distance = formatDistance(filters.distance);
    const addressType = formatAddressType(filters.addressType);


    // map filter service type ids to names for readability
    const serviceTypeNames = serviceTypeUtils.flattenServiceTypes(services)
      .reduce((acc, curr) => {
        if (filters.serviceTypes.includes(curr.id)) {
          return [
            ...acc,
            curr.name,
          ];
        }
        return acc;
      }, []);

    // build the browse filters object used for tracking
    const browseFilters = Serializer.build({
      browseFilters: {
        ...(_.uuCompactArrayOrObject({
          ...rest,
          addressType,
          cities: cityObjs,
          counties: countyObjs,
          distance,
          languages: languageStrings,
          serviceTypes: serviceTypeNames,
        })),
      },
    });

    // return browse filters along with original browse filters keys array and network info for tracking
    return {
      ...browseFilters,
      browse_filters: createFilterTrackingObject(filters),
      browse_network_id: network.id,
      browse_network_name: network.name,
    };
  }
}

export default Serializer;
