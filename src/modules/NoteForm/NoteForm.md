```jsx
  function onSubmit(values) {
    setState({ result: values });
  }

  <div style={{ maxWidth: '600px' }}>
    <NoteForm
      durationOptions={duration}
      onCancel={() => setState({ result: null})}
      onSubmit={onSubmit}
    />

    <SandboxFormResults formResult={state.result} />
  </div>
```
