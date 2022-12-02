```jsx
const resizeStyle = {
  backgroundColor: '#fff',
  border: '1px #e8e8e8 solid',
  borderRadius: '3px',
  display: 'inline-block',
  height: '450px',
  overflow: 'auto',
  padding: '20px',
  resize: 'both',
};

<div>
  <div><h5>Resize me! I'm responsive!</h5></div>
  <div style={resizeStyle}>
    <ServiceTypes
      serviceTypes={serviceTypes}
    />
  </div>
</div>
```
