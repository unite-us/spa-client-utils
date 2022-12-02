```jsx
const url = 'https://geo.uniteus.io/v1/';

const fetchStatesGeography = (states, key) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', `${url}${key}?states=${states.join(',')}`);
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

initialState = {
  states: [],
  counties: [],
  cities: [],
  statesOptions: states,
  filters: {},
};

const onChange = (filters) => {
  console.log('residency filters changed', filters);
  const statesOptions = _.reduce(states, (acc, opt) => {
    if(_.includes(_.get(filters, 'states', []), opt.value)) {
      return [
        ...acc,
        {
          label: opt.label,
          value: opt.value,
          initial: true,
        }
      ];
    }
    return [...acc, opt];
  }, []);

  setState({
    filters,
    statesOptions,
  });
};

<ResidencyRequirementsFilter
  states={state.statesOptions}
  filters={state.filters}
  fetchStatesGeography={fetchStatesGeography}
  onFiltersChange={onChange}
  label="Residency Requirements"
/>
```
