```jsx
<div>
  <ReduxTemplate formId="nameField">
    <Fields
      names={['client.title', 'client.first_name', 'client.last_name', 'client.suffix', 'client.nicknames']}
      component={NameField}
      props={{
        id: 'id-1234',
        className: 'class-1234',
        label: 'First Name',
        titlePath: 'client.title',
        firstNamePath: 'client.first_name',
        lastNamePath: 'client.last_name',
        suffixPath: 'client.suffix',
        nicknamesPath: 'client.nicknames',
        suffixOptions: [
        {
          display_name: "Jr.",
          value: "Jr.",
        },
        {
          display_name: "Sr.",
          value: "Sr.",
        }
        ],
        titleOptions: [
          {
            display_name: "Mr.",
            value: "Mr.",
          },
          {
            display_name: "Mrs.",
            value: "Mrs.",
          }
        ],
      }}
      validate={[
        {
          name: 'client.first_name',
          funcs: [(value) => validations.isRequired(value)],
        }
      ]}
    />
  </ReduxTemplate>
</div>
```
