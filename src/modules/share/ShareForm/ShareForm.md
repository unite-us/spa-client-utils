
```jsx
<div style={{ width: '300px' }}>
  <ShareForm
    id='shareform'
    initialValues={{
      messageType: 'sms',
    }}
    onSend={values => {
        setState({ result: values });
      }}
    sharedGroups={[{ id: 'shared-group-id' }]}
    sharesUrl="the.shares.url"
  />
</div>

<SandboxFormResults formResult={state.result} />

```
