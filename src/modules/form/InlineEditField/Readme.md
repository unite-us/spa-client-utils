#### Basic inline field

```jsx
const onSave = (value) => {
  console.log('basic field saves', { value });
  setState({ value });
};

initialState = {
  value: 'Answer 1',
};

<div className="row">
  <InlineEditField
    id="basic-inline-edit"
    label="Question 1"
    value={state.value}
    fieldComponent={InputField}
    className="col-xs-4"
    onFieldSave={onSave}
    afterLabelContent={<InfoPanel message={`Reminder: Hello there`} />}
    fieldProps={{ required: true }}
  />
</div>

```

#### Basic disabled inline field

```jsx
const onSave = (value) => {
  console.log('basic field saves', { value });
  setState({ value });
};

initialState = {
  value: 'Answer 1',
};

<div className="row">
  <InlineEditField
    id="basic-disabled-inline-edit"
    label="Question 1"
    value={state.value}
    fieldComponent={InputField}
    className="col-xs-4"
    onFieldSave={onSave}
    disabled
  />
</div>

```

#### Inline field with validation
```jsx
const onSave = (value) => {
  console.log('saving', { value });
  setState({ value });
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('done saving', { value });
      resolve(value);
    }, 1000);
  });
};

const onError = (error) => {
  console.log('field has errors', { error });
};

initialState = {
  value: 'Required Answer 1',
};

const validate = [
  validations.isRequired,
  (value) => {
    return undefined;
  },
];

<div className="row">
  <InlineEditField
    id="validate-inline-edit"
    label="Question 1"
    value={state.value}
    fieldComponent={InputField}
    className="col-xs-4"
    onFieldSave={onSave}
    onFieldError={onError}
    fieldValidations={validate}
    fieldProps={{
      required: true,
    }}
  />
</div>

```

#### Select inline field

```jsx
const onSave = (value) => {
  console.log('select field saves', { value });
  setState({ value });
};

initialState = {
  value: { label: 'Croissant', value: 'croissant' },
};

const options = [
  { label: 'Baguette', value: 'baguette' },
  { label: 'Croissant', value: 'croissant' },
  { label: 'Macaron', value: 'macaron' },
];

<div className="row">
  <InlineEditField
    id="select-inline-edit"
    label="Question 1"
    value={state.value}
    fieldComponent={SelectField}
    className="col-xs-6"
    onFieldSave={onSave}
    fieldProps={{
      options,
      forceObjectValue: true,
      hint: 'This is a French select',
      required: true,
    }}
    displayValue={state.value.label}
    fieldValidations={validations.isRequired}
  />
</div>

```

#### TextField inline field

```jsx
const onSave = (value) => {
  console.log('textfield field saves', { value });
  setState({ value });
};

initialState = {
  value: 'Lorem ipsum blabla.\nthis is another line',
};

<div className="row">
  <InlineEditField
    id="text-inline-edit"
    label="Question 1"
    value={state.value}
    fieldComponent={TextField}
    className="col-xs-6"
    onFieldSave={onSave}
  />
</div>

```

#### DateField inline field

```jsx
const onSave = (value) => {
  console.log('date field saves', { value });
  setState({ value: parseInt(value, 10) });
};

initialState = {
  value: 1570406400,
};

<div className="row">
  <InlineEditField
    id="date-inline-edit"
    label="Date 1"
    value={state.value}
    fieldComponent={DateField}
    fieldProps={{ maxDate: new Date() }}
    className="col-xs-6"
    onFieldSave={onSave}
    displayValue={dates.formatDate(state.value)}
  />
</div>

```
