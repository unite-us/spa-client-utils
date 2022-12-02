```jsx
const selectConsentType = () => {
  console.log('selecting consent type')
}

<ConsentTypeChoice
  type="on-screen"
  label="Upload audio file (client consented verbally)"
  onSelect={selectConsentType}
  selectedType="on-screen"
>
  <Button
    label="Dont Click Me"
    primary
  />
</ConsentTypeChoice>
```
