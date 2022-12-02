import { get, reverse } from 'lodash';

const findAddressComponent = (components, type, short = false) => {
  const component = components.find(({ types }) => types.includes(type));
  return get(component, `${short ? 'short_name' : 'long_name'}`);
};

const findAddressComponentForCity = (components, types = []) => {
  const component = findAddressComponent(components, types[0]);
  if (component) {
    return component;
  }
  const subLocalityComponent = findAddressComponent(components, types[1]);
  if (subLocalityComponent) {
    return subLocalityComponent;
  }
  return findAddressComponent(components, types[2]);
};

const updateFieldsValues = (result, fields = {}) => {
  const components = reverse(result?.result?.address_components) || [];
  const streetNumber = findAddressComponent(components, 'street_number');
  const street = findAddressComponent(components, 'route');
  const establishment = findAddressComponent(components, 'establishment');
  const city = findAddressComponentForCity(components, ['locality', 'sublocality', 'administrative_area_level_3']);
  const county = findAddressComponent(components, 'administrative_area_level_2');
  const state = findAddressComponent(components, 'administrative_area_level_1', true);
  const country = findAddressComponent(components, 'country', true);
  const postalCode = findAddressComponent(components, 'postal_code', true);

  let line1 = establishment;

  if (street) {
    line1 = streetNumber ? `${streetNumber} ${street}` : street;
  }

  fields.line_1.input.onChange(line1 || '');
  fields.city.input.onChange(city || '');
  fields.county.input.onChange(county || '');
  fields.state.input.onChange(state || '');
  fields.country.input.onChange(country || '');
  fields.postal_code.input.onChange(postalCode || '');
  fields.latitude.input.onChange(result?.latLng?.lat || '');
  fields.longitude.input.onChange(result?.latLng?.lng || '');
};

export default updateFieldsValues;
