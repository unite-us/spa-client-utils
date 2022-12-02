### ButtonSelect

```jsx
function quick(value) {
  console.log(value);
  return console.log('quick action complete');
}

const options = [
  {
    label: 'Quick Action',
    value: 'quick a',
    action: quick,
  },
  {
    label: 'Quick Action 2',
    value: 'quick a 2',
    action: quick,
  }
];

<div>
  <div style={{ display: 'flex' }}>
    <h3 style={{ marginRight: '10px' , display: 'inline' }}>Alex Lee</h3>
    <ButtonSelect
      id="id"
      options={options}
      placeholder="consent declined"
      icon="IconTimesCircle"
      buttonBackgroundColor="black"
    />
  </div>

  <div style={{ display: 'flex' }}>
    <h3 style={{ marginRight: '10px' , display: 'inline' }}>Alex Lee</h3>
    <ButtonSelect
      id="id"
      options={options}
      placeholder="pending consent"
      icon="IconQuestionCircle"
      buttonBackgroundColor="tangie"
    />
  </div>

  <div style={{ display: 'flex' }}>
    <h3 style={{ marginRight: '10px' , display: 'inline' }}>Alex Lee</h3>
    <ButtonSelect
      id="id"
      options={options}
      placeholder="pending consent"
      icon="IconExclamationCircle"
      buttonBackgroundColor="rosso"
    />
  </div>

  <div style={{ display: 'flex' }}>
    <h3 style={{ marginRight: '10px' , display: 'inline' }}>Alex Lee</h3>
    <ButtonSelect
      id="id"
      options={options}
      placeholder="consent accepted"
      icon="IconCheckCircle"
      buttonBackgroundColor="avocado"
    />
  </div>

  <div style={{ display: 'flex' }}>
    <h3 style={{ marginRight: '10px' , display: 'inline' }}>Alex Lee</h3>
    <ButtonSelect
      id="id"
      options={options}
      placeholder="Icon Not Required"
      iconRequired={false}
      buttonBackgroundColor="avocado"
    />
  </div>
</div>
```
