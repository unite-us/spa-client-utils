```jsx
initialState = {
  isSelected: false,
};

const hours_of_operation = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  .map(day_of_week => ({
    day_of_week,
    hours_of_operation: [{ opens_at: 540, closes_at: 1020 }],
  })
);

const hours = {
  monday: [{ opens: '08:00', closes: '17:00' }],
  tuesday: [{ opens: '08:00', closes: '17:00' }],
  wednesday: [{ opens: '08:00', closes: '12:00' }, { opens: '14:00', closes: '17:00' }],
  thursday: [{ opens: '08:00', closes: '17:00' }],
  friday: [{ opens: '08:00', closes: '17:00' }],
};

<ProviderCard
  isSelected={state.isSelected}
  onAddProvider={() => { setState({ isSelected: true }) }}
  onRemoveProvider={() => { setState({ isSelected: false }) }}
  originLatLng={[42.4191639, -71.0269413]}
  provider={{
    addresses: [{
      line_1: '123 Loooooooooooooooooooong Street',
      city: 'Funmouth',
      state: 'MA',
      postal_code: '12345',
      country: 'USA',
      address_type: 'work',
      lat_lng: [42.3682235, -71.2398932],
    }],
    email_addresses: [
      { email_address: 'first@email.com' },
      { email_address: 'primary@email.com', is_primary: true },
    ],
    group_type: 'out_of_network',
    hours_of_operation,
    hours,
    name: 'Some Organization',
    phone_numbers: [{
      phone_number: '1234567890',
      is_primary: true,
      phone_type: 'work',
      can_sms: true,
    }],
    programs: [{ id: 'program-id', name: 'Some Program' }],
    service_types: [{ id: 'service-type-id', name: 'Some Service Type' }],
    website_url: 'www.thisorgsite.com',
  }}
  selectedServiceType={{ id: 'service-type-id', name: 'Some Service Type' }}
/>
```
