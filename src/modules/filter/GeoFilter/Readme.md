```jsx
const contactWithAddressNoLatLng = {
  ...contact,
  addresses: [{
    _meta: {
      _source: 'cache',
      _type: 'contacts_address',
    },
    address_type: 'home',
    city: 'New York',
    country: 'USA',
    county: 'New York County',
    id: '242c5a8c-38cd-44b6-a5e5-08f0d028e304',
    is_mailing_address: false,
    lat_lng: [],
    line_1: '65 N Moore St',
    line_2: 'Floor 2',
    postal_code: '10013',
    state: 'NY',
  }],
};

const initialState = {
  address: '',
  addressType: 'ours',
  distance: 'any',
};

const providerFilterLocations = [
  {
    id: '565ae7e3-990b-4900-91fa-29a61f7b4310',
    type: 'location',
    attributes: {
      line_1: '65 N Moore St',
      line_2: null,
      city: 'New York',
      county: 'New York County',
      state: 'NY',
      postal_code: '10013',
      country: 'United States',
      latitude: 40.7202926,
      longitude: -74.0094995,
      name: null,
    },
  },
  {
    id: '301e40bd-33fd-451d-9d9a-841e0d5e389f',
    type: 'location',
    attributes: {
      line_1: '10 Columbus Circle',
      line_2: null,
      city: 'New York',
      county: 'New York County',
      state: 'NY',
      postal_code: '10019',
      country: 'United States',
      latitude: 40.7685526,
      longitude: -73.9831866,
      name: null,
    },
  },
  {
    id: 'f0da337b-6c43-494e-ad09-4d35a4bcb11d',
    type: 'location',
    attributes: {
      line_1: '217 Broadway',
      line_2: null,
      city: 'New York',
      county: 'New York County',
      state: 'NY',
      postal_code: '10007',
      country: 'United States',
      latitude: 40.7117094,
      longitude: -74.0086978,
      name: null,
    },
  },
  {
    id: '2a409f4e-66c3-4a39-80ea-67044a4a4960',
    type: 'location',
    attributes: {
      line_1: '2 E 30th St',
      line_2: null,
      city: 'New York',
      county: 'New York County',
      state: 'NY',
      postal_code: '10016',
      country: 'United States',
      latitude: 40.7455252,
      longitude: -73.9860267,
      name: 'Another',
    },
  }
];

<>
  <WrappedGeoFilter
    currentUserGroup={group}
    filters={state}
    contact={contactWithAddressNoLatLng}
    label="Distance"
    onFiltersChange={filters => { setState({ ...filters }) }}
    multipleLocationsEnabled
    providerFilterLocations={providerFilterLocations}
    google={window.google}
  />
  <em>
    Selected Address:
    {state.address.address ?
      state.address.address :
      null
    }
    <br/>
    Lat/Long:
    {state.address.latLng ?
      `${state.address.latLng.lat}, ${state.address.latLng.lng}` :
      null
    }
  </em>
</>
```
