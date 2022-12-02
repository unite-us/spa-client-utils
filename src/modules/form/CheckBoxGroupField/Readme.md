```jsx
<div>
  <ReduxTemplate formId="checkBoxGroupField">
    <Fields
      names={['group.cooking', 'group.cleaning', 'group.driving']}
      component={CheckBoxGroupField}
      id='id-1234'
      className='class-1234'
      label='Group Services'
      options={[{ value: 'group.cooking', display_name: 'Cooking' },
                { value: 'group.cleaning', display_name: 'Cleaning' },
                { value: 'group.driving', display_name: 'Driving' }]}
      valueKey='value'
      labelKey='display_name'
      disabled={false}
    />
  </ReduxTemplate>
</div>
```

```jsx
initialState = {
  cleaning: {
    value: false,
    checked: false,
    valid: true,
    invalid: false,
    touched: false,
    pristine: true,
    dirty: false,
    visited: false,
  },
  cooking: {
    value: false,
    checked: false,
    valid: true,
    invalid: false,
    touched: false,
    pristine: true,
    dirty: false,
    visited: false,
  },
  driving: {
    value: true,
    checked: true,
    valid: true,
    invalid: false,
    touched: true,
    pristine: false,
    dirty: true,
    visited: true,
  },
};

const field = {
  contact: {
    cleaning: {
      value: state.cleaning.value,
      onChange: () => { setState({ cleaning: { ...state.cleaning, value: !state.cleaning.value } }) },
    },
    cooking:  {
       value: state.cooking.value,
       onChange: () => { setState({ cooking: { ...state.cooking, value: !state.cooking.value } }) },
     },
    driving:  {
       value: state.driving.value,
       onChange: () => { setState({ driving: { ...state.driving, value: !state.driving.value } } ) },
     },
  },
};

<div>
  <CheckBoxGroupField
   label='Contact Services'
   valueKey='value'
   labelKey='display_name'
   disabled={false}
   id='id-1235'
   options={[{ value: 'contact.cooking', display_name: 'Cooking' },
     { value: 'contact.cleaning', display_name: 'Cleaning' },
     { value: 'contact.driving', display_name: 'Driving' }
   ]}
   field={field}
   hint="Choose one or more services"
  />
</div>
```
