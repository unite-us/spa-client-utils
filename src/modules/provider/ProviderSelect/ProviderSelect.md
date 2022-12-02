```jsx
initialState = {
  isLoading: false,
  options: providersStub,
  paging: paging.first,
}

const onLoadMore = () => {
  setState({ isLoading: true });
  return new Promise(() => {
    setTimeout(() => {
      setState({
        isLoading: false,
        options: [...providersStub, group],
        paging: paging.last,
      });
    }, 4000);
  });
};

<ReduxTemplate formId="providerSelect">
  <Field
    name="providerSelect"
    component={ProviderSelect}
    props={{
      ccGroupIds: ['24c47f99-fd19-4640-bc96-0e9f90742d46', '24c47f99-fd19-4640-bc96-0e9f90742d56'],
      id: 'provider-select',
      isLoading: state.isLoading,
      onDetailClick: (provider) => console.log('detail clicked for', provider),
      onLoadMore,
      options: state.options,
      paging: state.paging,
      renderPaginationLoader: true,
      selectedServiceType: serviceTypes.slice(0, 2),
    }}
  />
</ReduxTemplate>
```

### Providers Loading
```jsx
<ReduxTemplate formId="providerSelectLoading">
  <Field
    name="providerSelect"
    component={ProviderSelect}
    props={{
      isLoading: true,
      options: [],
      id: 'provider-select',
      selectedServiceType: { name: 'Emergency Food' },
      onDetailClick: (provider) => console.log('detail clicked for', provider),
    }}
  />
</ReduxTemplate>
```

### No Providers Found
```jsx
<ReduxTemplate formId="providerSelectEmpty">
  <Field
    name="providerSelect"
    component={ProviderSelect}
    props={{
      options: [],
      id: 'provider-select',
      selectedServiceType: { name: 'Emergency Food' },
      onDetailClick: (provider) => console.log('detail clicked for', provider),
    }}
  />
</ReduxTemplate>
```
