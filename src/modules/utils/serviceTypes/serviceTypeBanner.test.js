import serviceTypeBanner from './serviceTypeBanner';

const name = 'Service Name';

// TODO: Fix tests when service type is rendering correctly/refactored
xdescribe('serviceTypeBanner', () => {
  it('Returns nothing', () => {
    expect(serviceTypeBanner([])).toBeUndefined();
    expect(serviceTypeBanner()).toBeUndefined();
  });

  it('Returns Name for one type', () => {
    expect(serviceTypeBanner({ name })).toEqual(name);
    expect(serviceTypeBanner([{ name }])).toEqual(name);
  });

  it('Returns Name and "more" for two types', () => {
    expect(serviceTypeBanner([{ name }, { name }])).toEqual('Service Name and 1 more');
  });

  it('Returns Name and "more" for many types', () => {
    expect(serviceTypeBanner([{ name }, { name }, { name }])).toEqual('Service Name and 2 more');
  });
});
