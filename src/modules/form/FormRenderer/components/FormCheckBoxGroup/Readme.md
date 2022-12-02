```jsx
<div>
  <ReduxTemplate formId="checkBoxGroup">
    <Fields
      component={CheckBoxGroup}
      names={[
        'payment_options.free',
        'payment_options.insurance',
        'payment_options.self_pay',
        'payment_options.sliding_scale',
      ]}
      props={{
        id: 'check-box-group-id',
        label: 'Program Payment Options',
        hint: 'It\'s money Son!',
        options: [
          { label: 'free', value: 'payment_options.free' },
          { label: 'insurance', value: 'payment_options.insurance' },
          { label: 'self pay', value: 'payment_options.self_pay' },
          { label: 'sliding scale', value: 'payment_options.sliding_scale', disabled: true },
        ],
      }}
    />
  </ReduxTemplate>
</div>
```
