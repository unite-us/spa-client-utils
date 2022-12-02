```jsx
<div>
  <ReduxTemplate formId="emailField">
    <Fields
      names={['client.emailAddress', 'client.primary']}
      component={EmailField}
      props={{
        id: 'id-1234',
        className: 'class-1234',
        emailInputClassName: 'email-input-class-name',
        label: 'email',
        emailAddressPath: 'client.emailAddress',
        primaryPath: 'client.primary',
      }}
      validate={[
        {
          name: 'client.emailAddress',
          funcs: [(value) => validations.isEmail(value), (value) => validations.isRequired(value)],
        }
      ]}
    />
  </ReduxTemplate>
</div>
```
