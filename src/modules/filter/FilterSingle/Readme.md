```jsx
initialState = { filters: { label: 'California', value: 'CA' }, };

const options=[
  {
    label: 'A States',
    value: 'states-a',
    children: [
      { label: 'Alaska', value: 'AK' },
      { label: 'Alabama', value: 'AL' },
      { label: 'Arkansas', value: 'AR' },
      { label: 'Arizona', value: 'AZ' },
    ],
  },
  {
    label: 'Other States',
    value: 'other-states',
    children: [
      { label: 'Boston', value: 'BO'},
      { label: 'California', value: 'CA' },
      { label: 'New York', value: 'NY' },
      { label: 'South Carolina', value: 'SC' },
    ],
  },
  {
    label: 'Not States',
    value: 'not-states',
    children: [
      { label: 'American Samoa', value: 'AS' },
      { label: 'Armed Forces Pacific', value: 'AP' },
      { label: 'District of Columbia', value: 'DC' },
      { label: 'Guam', value: 'GU' },
    ],
  },
  { label: 'Delaware', value: 'DE' },
  { label: 'Florida', value: 'FL' },
  { label: 'Georgia', value: 'GA' },
  { label: 'Hawaii', value: 'HI' },
  { label: 'Iowa', value: 'IA' },
  { label: 'Idaho', value: 'ID' },
  { label: 'Illinois', value: 'IL' },
  { label: 'Indiana', value: 'IN' },
  { label: 'Kansas', value: 'KS' },
  { label: 'Kentucky', value: 'KY' },
]

function filter(filters) {
  console.log('selected filter', filters);
  setState({ filters });
}

<div>
  <div style={{ display: "inline-block", marginRight: "10px" }}>
    <FilterSingle
      id="filter-example"
      name="filter-single-key"
      options={options}
      onFilterChange={filter}
      value={state.filters.value}
    />
  </div>
  <span>{JSON.stringify(state.filters)}</span>
</div>
