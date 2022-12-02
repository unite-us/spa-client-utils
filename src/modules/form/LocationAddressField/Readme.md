```jsx
const value = { address: {
  "line_1": "620 Atlantic Ave",
  "city": "Brooklyn",
  "county": "Kings County",
  "state": "NY",
  "postal_code": "11217",
  "country": "United States",
  "latitude": 40.650002,
  "longitude": -73.949997,
}};

<div>
  <ReduxTemplate
    formId="locationAddressField"
    initialValues={value}
  >
    <Fields
      names={[
        'address.line_1',
        'address.city',
        'address.county',
        'address.state',
        'address.postal_code',
        'address.country',
        'address.latitude',
        'address.longitude',
      ]}
      component={WrappedLocationAddressField}
      props={{
        id: 'id-1234',
        label: 'Address',
        fieldNamePath: 'address',
      }}
    />
  </ReduxTemplate>
</div>
```
