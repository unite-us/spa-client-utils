### Require Confirmation

```jsx
initialState = {
  showAll: false,
};

const DummyLocation = ({ location }) => (
  <div className="detail-card-text__location mb-quarter">
    <Icon className="detail-card-text__icon" icon="IconMapMarker" size={20} />
    <p title={location.displayName}>
      {location.displayName} ({location.distance})
    </p>
  </div>
);

const locations = [
  {
    displayName: "123 lol Street, Funmouth, MA 12345",
    distance: "11.41 mi"
  },
  {
    displayName: "123 Loooooooooooooooooooong Street, Funmouth, MA 12345",
    distance: "40.29 mi"
  }
];

<div>
  <button
    onClick={() => setState({ showAll: !state.showAll })}
    style={{ marginBottom: '30px' }}
  >
    {state.showAll ? 'See Less' : 'See More'}
  </button>
  
  <div>
    <h3>Locations</h3>
    <AllOrOne showAll={state.showAll}>
      {
        locations.map((location, index) => <DummyLocation location={location} key={index} />)
      }
    </AllOrOne>
  </div>
</div>
```
