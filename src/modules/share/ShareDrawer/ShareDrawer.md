```jsx
const groups = [
  { id: 'group-1', name: 'Group 1' },
  { id: 'group-2', name: 'Group 2' },
  { id: 'group-3', name: 'Group 3' },
  { id: 'group-4', name: 'Group 4' },
];

initialState = {
  open: false,
};

<div>
  <Button
    label={state.open ? 'Close Share Drawer' : 'Open Share Drawer'}
    onClick={() => setState({ open: !state.open })}
    primary={!state.open}
  />
  <ShareDrawer
    className="this-share-drawer"
    shareFormProps={{
      onSend: values => alert(`Send ${values.messageType} to ${values.to}`),
      sharesUrl: 'thesharesurl.com',
      id: '12a',
    }}
    groups={groups}
    onClose={() => setState({ open: !state.open })}
    open={state.open}
  />
</div>
```
