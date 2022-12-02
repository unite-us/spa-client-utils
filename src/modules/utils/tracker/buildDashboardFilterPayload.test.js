import buildDashboardFilterPayload from './buildDashboardFilterPayload';

describe('buildDashboardFilterPayload', () => {
  it('returns an empty object when no params are passed in', () => {
    expect(buildDashboardFilterPayload()).toEqual({});
  });
  it('creates a filters object used for tracking', () => {
    const state = {
      page: 1,
      sidx: 'updated_at',
      sord: 'desc',
      filters: {
        service_types: ['202ebb37-b24f-4e46-bb45-372db29f271e', '0498957f-442c-4d97-a280-b930fd17d796'],
        care_coordinator_users: ['0498957f-442c-4d97-a280-b930fd17d796', '202ebb37-b24f-4e46-bb45-372db29f271e'],
        primary_worker_users: [],
        network_inclusion_scope: 'in',
        provider_scope: 'all',
      },
    };

    const props = {
      serviceTypes: [{
        id: '202ebb37-b24f-4e46-bb45-372db29f271e',
        code: 'UU-BENEFITS',
        name: 'Benefits',
      }],
      careCoordinators: [{
        user: {
          id: '0498957f-442c-4d97-a280-b930fd17d796',
          full_name: 'Brayan Bernhard',
        },
        count: 0,
      }],
    };

    expect(buildDashboardFilterPayload(state, props)).toEqual({
      care_coordinator_users: [{
        full_name: 'Brayan Bernhard',
        id: '0498957f-442c-4d97-a280-b930fd17d796',
      }],
      network_inclusion_scope: 'in',
      primary_worker_users: [],
      provider_scope: 'all',
      service_types: ['Benefits'],
    });
  });
});
