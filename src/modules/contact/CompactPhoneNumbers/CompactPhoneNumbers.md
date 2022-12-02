Simple example of the component rendering 2 phones.
```jsx
const phone_numbers = [
  {
    phone_number: '1232221233',
    extension: null,
    phone_type: 'fax',
  },
  {
    phone_number: '1232221233',
    extension: null,
    phone_type: 'work',
  },
  {
    phone_number: '9845665154',
    extension: null,
    phone_type: 'mobile',
    is_primary: true
  },
];

<CompactPhoneNumbers phone_numbers={phone_numbers} />
```

When rendering 4 or more phone numbers, 3 numbers are shown, with a toggle button to view the rest.
```jsx
const phone_numbers = [
  {
    phone_number: '1232221233',
    phone_type: 'mobile',
  },
  {
    phone_number: '2223123454',
    phone_type: 'work',
  },
  {
    phone_number: '9845665154',
    phone_type: 'home',
    is_primary: true
  },
  {
    phone_number: '7564533215',
    phone_type: 'fax',
  },
];

<CompactPhoneNumbers phone_numbers={phone_numbers} showToggle />
```
