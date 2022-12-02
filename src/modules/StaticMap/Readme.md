### I'm a map I'm a map I'm a MAP!

```jsx
const latLng = { latitude: 40.7031, longitude: -74.0160 };
const onLoadComplete = () => {
  console.log('mad loaded');
};

<div>
  <StaticMap
    latLng={latLng}
    onLoadComplete={onLoadComplete}
    size="270x110"
    apiKey="AIzaSyAl5_cHrQgCPbnJOPR82PY2gXf5H6eOlhQ"
  />
</div>
```
