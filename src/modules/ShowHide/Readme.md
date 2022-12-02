### Conditionally show/hide children
```jsx

<div>
  <Button
    label={state.hide ? 'Show Text' : 'Hide Text'}
    onClick={() => setState({ hide: !state.hide })}
    primary
  />
  <ShowHide hide={state.hide}>
    <p className="mt-two">
      Some text to show/hide
    </p>
  </ShowHide>
</div>
```

### Conditionally show array of children with some nulls/undefined values
```jsx
childArr = [
  'child 1',
  <InputField key="bla" placeholder="child 2" id="input" label="label" />,
  <p key="blu">child 3</p>,
  null,
  <div key="hello">child 4</div>,
  undefined,
];
<div>
  <Button
    className="mb-one"
    label={state.hide ? 'Show Children' : 'Hide Children'}
    onClick={() => setState({ hide: !state.hide })}
    primary
  />
  <ShowHide hide={state.hide}>
    {childArr}
  </ShowHide>
</div>
```
