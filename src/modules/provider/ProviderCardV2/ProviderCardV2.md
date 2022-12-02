```jsx
initialState = {
  isSelected: false,
};

<ProviderCardV2
  id={'provider-card-1'}
  isSelected={state.isSelected}
  onAddProvider={() => { setState({ isSelected: true }) }}
  onRemoveProvider={() => { setState({ isSelected: false }) }}
  originLatLng={[42.4191639, -71.0269413]}
  provider={provider}
  providerLocations={locations}
  selectedServiceType={{ id: 'service-type-id', name: 'Some Service Type' }}
/>
```
