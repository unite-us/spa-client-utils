```jsx
const hours = [
  {
    day_of_week: 'monday',
    hours_of_operation: [{ opens_at: 540, closes_at: 1020 }],
  },
  {
    day_of_week: 'tuesday',
    hours_of_operation: [{ opens_at: 540, closes_at: 1020 }],
  },
  {
    day_of_week: 'wednesday',
    hours_of_operation: [
      { opens_at: 360, closes_at: 600 },
      { opens_at: 720, closes_at: 1439 },
    ],
  },
  {
    day_of_week: 'thursday',
    hours_of_operation: [{ opens_at: 480, closes_at: 960 }],
  },
  {
    day_of_week: 'friday',
    hours_of_operation: [{ opens_at: 480, closes_at: 960 }],
  },
];

<HoursOfOperation
  hours={hours}
/>
```
