```jsx
initialState = {
  serviceTypes: {
    value: false,
    valid: true,
    invalid: false,
    touched: false,
    pristine: true,
    dirty: false,
    visited: false,
  },
}

 const field = {
  value: state.serviceTypes.value,
  onChange: (value) => { setState({ serviceTypes: { ...state.serviceTypes, value } }) },
};


<div>
  <ServiceTypesCheckboxes
    autoSelectChildren
    autoSelectParent
    field={field}
    id="program-service-types"
    inline={false}
    label="Service Type(s)"
    labelKey="name"
    options={serviceTypes}
    valueKey="id"
  />

</div>
```
