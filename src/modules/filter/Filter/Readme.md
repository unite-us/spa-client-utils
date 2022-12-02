```jsx
const options=[
  {
    label: 'A States',
    value: 'states-a',
    children: [
      { label: 'Alaska', value: 'AK' },
      { label: 'Alabama', value: 'AL', initial: true },
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
      { label: 'District of Columbia', value: 'DC', initial: true },
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
  return console.log('new filters', filters);
}

<Filter
  id="filter-example"
  name="Filter"
  filterKey="FilterKey"
  options={options}
  onFiltersChange={filter}
/>
```

### Filter with optionRenderLimit

```jsx
initialState = {
  options: [],
};

const url = 'https://geo.uniteus.io/v1/places?states=NY';

const getCities = () => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', url);
  xhr.onreadystatechange = () => {
    const DONE = 4; // readyState 4 means the request is done.
    const OK = 200; // status 200 is a successful return.
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(xhr);
      }
    }
  };

  xhr.send(null);
});

if(_.isEmpty(state.options)) {
  getCities().then((response) => {
    options = _.reduce(response[0].places, (acc, curr) => {
      return [...acc, { value: curr.full_code, label: curr.display_name }]
    }, []);
    return options;
  }).then((options) => {
    if(setState) {
      setState({ options });
    }
  });
}


<Filter
  id="cities-filter"
  name="city"
  pluralName="cities"
  options={state.options}
  optionsRenderLimit={50}
  onFiltersChange={(filters) => console.log('filtering cities', filters)}
  searchPlaceholder="Displaying 50 - Search"
/>
```
### Async Filter

```jsx
const options = states;

const asyncSearch = (search) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const results = _.take(_.filter(options, (opt) => {
        return _.includes(_.toLower(opt.label), _.toLower(search));
      }), 50);
      resolve(results);
    }, 1200);
  });
}

<Filter
  asyncLoadingText="Fetching states..."
  asyncSearch={asyncSearch}
  id="async-filter"
  name="async"
  onFiltersChange={(filters) => console.log('filtering async', filters)}
  options={_.take(options, 50)}
  optionsRenderLimit={50}
  searchPlaceholder="Displaying 50 - Search"
  uniqIdPrefix="async"
/>
```
