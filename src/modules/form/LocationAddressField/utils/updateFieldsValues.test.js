import updateFieldsValues from './updateFieldsValues';

const fieldNames = [
  'line_1',
  'city',
  'county',
  'state',
  'postal_code',
  'country',
  'latitude',
  'longitude',
];

let result;
let fields;

describe('updateFieldsValues', () => {
  beforeEach(() => {
    result = {
      result: {
        address_components: [
          {
            types: ['postal_code'],
            short_name: 'CP',
            long_name: 'postal code',
          },
          {
            types: ['country'],
            short_name: 'US',
            long_name: 'USA',
          },
          {
            types: ['administrative_area_level_1'],
            short_name: 'state',
            long_name: 'state',
          },
          {
            types: ['administrative_area_level_2'],
            short_name: 'county',
            long_name: 'county',
          },
          {
            types: ['sublocality'],
            short_name: 'city',
            long_name: 'city',
          },
          {
            types: ['route'],
            short_name: 'street',
            long_name: 'street',
          },
          {
            types: ['street_number'],
            short_name: 'street_number',
            long_name: 'street_number',
          },
          {
            types: ['establishment'],
            short_name: 'establishment',
            long_name: 'establishment',
          },
          {
            types: ['locality'],
            short_name: 'Schenectady',
            long_name: 'Schenectady',
          },
          {
            types: ['administrative_area_level_3'],
            short_name: 'Rotterdam',
            long_name: 'Rotterdam',
          },
        ],
      },
      latLng: {
        lat: () => 49,
        lng: () => 57,
      },
    };

    fields = fieldNames.reduce((acc, fieldName) => ({
      ...acc,
      [fieldName]: {
        input: {
          onChange: jest.fn(),
        },
      },
    }), {});
  });


  it('calls the onChange method of all the fields', () => {
    updateFieldsValues(result, fields);
    fieldNames.forEach((name) => {
      expect(fields[name].input.onChange).toHaveBeenCalledTimes(1);
    });
  });

  it('calls line_1 onchange with the complete street address', () => {
    updateFieldsValues(result, fields);
    expect(fields.line_1.input.onChange).toHaveBeenCalledWith('street_number street');
  });

  it('calls line_1 onchange without street number if not present', () => {
    result.result.address_components[6].short_name = undefined;
    result.result.address_components[6].long_name = undefined;
    updateFieldsValues(result, fields);
    expect(fields.line_1.input.onChange).toHaveBeenCalledWith('street');
  });

  it('calls line_1 onchange establishment if street is not present', () => {
    result.result.address_components[5].short_name = undefined;
    result.result.address_components[5].long_name = undefined;
    updateFieldsValues(result, fields);
    expect(fields.line_1.input.onChange).toHaveBeenCalledWith('establishment');
  });

  it('calls line_1 onchange if there are not any street address fields in the result', () => {
    result.result.address_components[5].short_name = undefined;
    result.result.address_components[5].long_name = undefined;
    result.result.address_components[6].short_name = undefined;
    result.result.address_components[6].long_name = undefined;
    result.result.address_components[7].short_name = undefined;
    result.result.address_components[7].long_name = undefined;
    updateFieldsValues(result, fields);
    expect(fields.line_1.input.onChange).toHaveBeenCalledWith('');
  });

  it('resets all field values to empty strings if result argument is falsy', () => {
    updateFieldsValues(null, fields);
    fieldNames.forEach((name) => {
      expect(fields[name].input.onChange).toHaveBeenCalledWith('');
    });
  });

  it('sets city from returned locality', () => {
    updateFieldsValues(result, fields);
    expect(fields.city.input.onChange).toHaveBeenCalledWith('Schenectady');
  });

  it('sets city from sublocality if locality if not present', () => {
    result.result.address_components = result.result.address_components.filter(component => component.short_name !== 'Schenectady');
    updateFieldsValues(result, fields);
    expect(fields.city.input.onChange).toHaveBeenCalledWith('city');
  });

  it('sets city from administrative_level_3 if neither locality nor sublocality are present', () => {
    result.result.address_components = result.result.address_components.filter(component => (component.short_name !== 'Schenectady' && component.short_name !== 'city'));
    updateFieldsValues(result, fields);
    expect(fields.city.input.onChange).toHaveBeenCalledWith('Rotterdam');
  });
});
