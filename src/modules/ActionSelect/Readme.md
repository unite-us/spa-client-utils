### Require Confirmation
```jsx
function asyncAction() {
  return new Promise(res => (
    setTimeout(() => {
      res(console.log('async action complete'));
    }, 5000))
  );
}

function quick() {
  return console.log('quick action complete');
}

function openDialog() {
  return console.log('open dialog');
}

const actions = [
  {
    label: 'Async Action',
    value: 'cool',
    action: asyncAction,
  },
  {
    label: 'Quick Action',
    value: 'beans',
    action: quick,
  },
];

<ActionSelect
  actions={actions}
  id="require-confirmation-select"
  requireConfirmation
  primary
/>
```

### No Confirmation
```jsx
function asyncAction() {
  return new Promise(res => (
    setTimeout(() => {
      res(console.log('async action complete'));
    }, 5000))
  );
}

let actionSelect;

function quick() {
  return console.log('quick action complete');
}

function openDialog() {
  return console.log('open dialog');
}

function resetValue() {
  actionSelect.resetValue()
}

const actions = [
  {
    label: 'Async Action',
    value: 'async action',
    action: asyncAction,
  },
  {
    label: 'Quick Action',
    value: 'quick action',
    action: quick,
  },
  {
    label: 'Quick Action 2',
    value: 'quick action 2',
    action: quick,
  }
];

<div>
  <ActionSelect
    ref={c => {
      if (c) {
        actionSelect = c;
      }
    }}
    actions={actions}
    id="no-confirmation-select"
  />
  <br />
  <button onClick={resetValue}>
    Reset
  </button>
</div>
```
