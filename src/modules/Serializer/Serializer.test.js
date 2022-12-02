import Serializer from './Serializer';

describe('Serializer', () => {
  const userOne = {
    id: '9d6e2943-fb04-4749-ab2d-d05d47637020',
    email: 'admin@uniteus.com',
    first_name: 'Harvey',
    last_name: 'Pekar',
    full_name: 'Harvey Pekar',
    last_name_first_name: 'Pekar, Harvey',
    avatar_url: 'https://www.gravatar.com/avatar/4c1167eb391d86611c648f1490ff612a?r=g&s=100&d=https%3A%2F%2Fsmile.uniteus.io%2F9d6e2943-fb04-4749-ab2d-d05d47637020%2F100%2FHP.png',
    confirmed_at: null,
    created_at: 0,
    updated_at: 1487188813,
    _meta: {
      _type: 'user',
    },
  };

  const networkOne = {
    id: 'a7c86449-5fbf-4143-a7de-0313cde52bec',
    name: 'Automation Networks',
    network_type: 'coordinated_with_p2p',
    logo_url: '?_id=a7c86449-5fbf-4143-a7de-0313cde52bec&s=AN',
    is_active: true,
    abbreviation: 'AN',
    is_coordination_center: null,
    is_admin_group: null,
    is_super_network: false,
    created_at: 1492092675,
    updated_at: 1544203260,
    created_by: userOne,
    updated_by: userOne,
    starts_at: 0,
    ends_at: 0,
    coordination_centers: [
      {
        id: '9a448606-3020-40ce-8db2-61a1d68b6c8f',
        name: 'Emi Organization',
        description: '<p>sfdbsdfbfdb</p>',
        logo_url: 'https://s3.amazonaws.com/cdn-public-v3-uudev/group/9a448606-3020-40ce-8db2-61a1d68b6c8f/logo/641724cea7bd28c0655350f2df0c3962-medium.png',
        website_url: 'http://www.alexorg.org',
        is_verified: false,
        created_at: 1492093840,
        updated_at: 1551464702,
        _meta: {
          _type: 'group',
        },
      },
    ],
    admin_groups: [],
    service_types: [
      {
        id: '50126fcb-a3e9-45d5-9a8e-c32b7fd810b4',
        code: 'UU-BENEFITS',
        name: 'Benefits',
        definition: null,
        updated_at: 1544203260,
        children: [
          {
            id: '2ac1bb8f-89a1-44b9-9e24-9af3cec8a2de',
            code: 'UU-BENEFITS-BENEFITS-ELIGIBILITY-SCREENING',
            name: 'Benefits Eligibility Screening',
            definition: null,
            created_at: 0,
            updated_at: 0,
            _meta: {
              _type: 'servicetypes_servicetype',
            },
          },
          {
            id: '3e3aef24-f58d-493e-a604-8fe87019b142',
            code: 'UU-BENEFITS-DISABILITY-BENEFITS',
            name: 'Disability Benefits',
            definition: null,
            created_at: 0,
            updated_at: 0,
            _meta: {
              _type: 'servicetypes_servicetype',
            },
          },
          {
            id: '68a5c4a6-dca5-4c8a-b934-cd2e89bfc5b3',
            code: 'UU-BENEFITS-HEALTH-INSURANCE-BENEFITS',
            name: 'Health Insurance/Benefits',
            definition: null,
            created_at: 0,
            updated_at: 0,
            _meta: {
              _type: 'servicetypes_servicetype',
            },
          },
          {
            id: '2430b334-1d68-43ec-905c-36b5b2c2953b',
            code: 'UU-BENEFITS-HEALTH-INSURANCE-BENEFITS-E-G-MEDICARE-MEDICAID-PROGRAMS',
            name: 'Health Insurance/Benefits (e.g. Medicare & Medicaid programs)',
            definition: null,
            created_at: 0,
            updated_at: 0,
            _meta: {
              _type: 'servicetypes_servicetype',
            },
          },
          {
            id: '295a1c49-43b7-4cbd-b695-8de303cb97fa',
            code: 'UU-BENEFITS-ID-DOCUMENTATION-ASSISTANCE',
            name: 'ID/Documentation Assistance',
            definition: null,
            created_at: 0,
            updated_at: 0,
            _meta: {
              _type: 'servicetypes_servicetype',
            },
          },
          {
            id: '7cc14f7d-7901-466c-9ccd-52caeaa6b8fc',
            code: 'UU-BENEFITS-IMMIGRATION-SERVICES',
            name: 'Immigration Services',
            definition: null,
            created_at: 0,
            updated_at: 0,
            _meta: {
              _type: 'servicetypes_servicetype',
            },
          },
          {
            id: 'b7141fab-f70c-450f-9ad5-fdac74e9a138',
            code: 'UU-BENEFITS-INCOME-SUPPORT',
            name: 'Income Support',
            definition: null,
            created_at: 0,
            updated_at: 0,
            _meta: {
              _type: 'servicetypes_servicetype',
            },
          },
          {
            id: 'e27814ee-9c84-4d4a-9fb2-0d7f98a034f6',
            code: 'UU-BENEFITS-SNAP-WIC-NUTRITION-BENEFITS',
            name: 'SNAP/WIC/Nutrition Benefits',
            definition: null,
            created_at: 0,
            updated_at: 0,
            _meta: {
              _type: 'servicetypes_servicetype',
            },
          },
          {
            id: '9d65dac9-0720-40bf-85ec-5d4120f63502',
            code: 'UU-BENEFITS-UNEMPLOYMENT-INSURANCE',
            name: 'Unemployment Insurance',
            definition: null,
            created_at: 0,
            updated_at: 0,
            _meta: {
              _type: 'servicetypes_servicetype',
            },
          },
          {
            id: '203f0aff-92d9-459e-838a-ba51416ddcf7',
            code: 'UU-BENEFITS-VETERANS-BENEFITS',
            name: 'Veterans Benefits ',
            definition: null,
            created_at: 0,
            updated_at: 0,
            _meta: {
              _type: 'servicetypes_servicetype',
            },
          },
        ],
        _meta: {
          _type: 'facades_servicetypes_filteredparent',
        },
      },
    ],
    focus_configuration: {
      military_focus: true,
      health_insurance_focus: true,
      _meta: {
        _type: 'configuration_focus',
      },
    },
    sub_networks: null,
    _meta: {
      _type: 'network',
    },
  };

  const sampleCreatedExport = {
    target_ids: [
      networkOne,
    ],
    target_type: 'network',
    type: 'service_case',
    time_field: 'updated_at',
    time_period: 'last_7',
    start_at: '2019-03-14',
    end_at: null,
    send_email: false,
  };

  describe('build', () => {
    it('returns the passed in object if there is not a schema defined for the passed in type', () => {
      expect(Serializer.build({ rocket: sampleCreatedExport })).toEqual(sampleCreatedExport);
    });

    it('returns a slimmed version of an export', () => {
      expect(Serializer.build({ export: sampleCreatedExport })).toEqual({
        export_end_at: null,
        export_send_email: false,
        export_start_at: '2019-03-14',
        export_target_ids: ['a7c86449-5fbf-4143-a7de-0313cde52bec'],
        export_target_type: 'network',
        export_time_field: 'updated_at',
        export_time_period: 'last_7',
        export_type: 'service_case',
      });
    });

    it('returns a slimmed version of an network', () => {
      expect(Serializer.build({ network: networkOne })).toEqual({
        network_id: 'a7c86449-5fbf-4143-a7de-0313cde52bec',
        network_name: 'Automation Networks',
      });
    });

    it('returns a slimmed version of a user', () => {
      expect(Serializer.build({ user: userOne })).toEqual({
        user_full_name: 'Harvey Pekar',
        user_id: '9d6e2943-fb04-4749-ab2d-d05d47637020',
        user_email: 'admin@uniteus.com',
      });
    });

    it('returns the value if it not a valid object', () => {
      expect(Serializer.build({ user: null })).toBeNull();
      expect(Serializer.build({ user: undefined })).toBeUndefined();
      expect(Serializer.build({ user: 'bob' })).toEqual('bob');
    });

    it('returns a slimmed version of a contact', () => {
      expect(Serializer.build({ contact: userOne })).toEqual({
        full_name: 'Harvey Pekar',
        id: '9d6e2943-fb04-4749-ab2d-d05d47637020',
      });
    });

    it('returns a slimmed version of a browse detail group', () => {
      const provider = {
        id: 'd22290f0-e41c-4acd-b346-b76fe0409f1c',
        name: 'Damian Test Provider',
        service_types: [
          {
            id: '50126fcb-a3e9-45d5-9a8e-c32b7fd810b4',
            code: 'UU-BENEFITS',
            name: 'Benefits',
            children: [
              {
                id: '2ac1bb8f-89a1-44b9-9e24-9af3cec8a2de',
                code: 'UU-BENEFITS-BENEFITS-ELIGIBILITY-SCREENING',
                name: 'Benefits Eligibility Screening',
              },
            ],
          },
        ],
        group_type: 'in_network',
      };

      expect(Serializer.build({ browseGroupDetails: provider })).toEqual({
        browse_drawer_group_group_type: 'in_network',
        browse_drawer_group_id: 'd22290f0-e41c-4acd-b346-b76fe0409f1c',
        browse_drawer_group_name: 'Damian Test Provider',
        browse_drawer_group_service_types: ['Benefits', 'Benefits Eligibility Screening'],
      });
    });

    it('returns a slimmed version of a referral', () => {
      const referral = {
        contact: userOne,
        created_at: 123456675869,
        created_by: userOne,
        description: 'this is a description',
        documents: [],
        id: '67890-fds987d6vs7678e80r-suf8d97s6df',
        referred_by_group: {
          id: '90823uyhr-sdff8987ssd-234erfs-dfdf',
          name: 'Chris P. Bacon',
          description: 'another description',
        },
        interaction_count: 0,
        is_internetwork: true,
        referred_to_group: {
          description: '<h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ',
          id: '0b98eb63-98b5-41e5-b30c-1145353fb204',
          logo_url: null,
          name: 'Developer Coordination Center [Devs Only]',
        },
        referred_to_network: {
          abbreviation: null,
          created_at: 1477409368,
          ends_at: null,
          id: 'c88b9628-b76c-434b-ad58-62bb2ca9d6c0',
          is_active: true,
          is_admin_group: false,
          is_coordination_center: true,
          is_super_network: false,
          logo_url: null,
          name: 'Developer Playground [DEVS ONLY]',
          network_type: 'coordinated',
          starts_at: null,
          updated_at: 1560357542,
        },
        service_type: {
          code: 'UU-BENEFITS-HEALTH-INSURANCE-BENEFITS-E-G-MEDICARE-MEDICAID-PROGRAMS',
          definition: null,
          id: '2430b334-1d68-43ec-905c-36b5b2c2953b',
          name: 'Health Insurance/Benefits (e.g. Medicare & Medicaid programs)',
        },
      };
      expect(Serializer.build({ referral })).toEqual({
        contact: {
          id: '9d6e2943-fb04-4749-ab2d-d05d47637020',
          full_name: 'Harvey Pekar',
        },
        id: '67890-fds987d6vs7678e80r-suf8d97s6df',
        referred_by_group: {
          id: '90823uyhr-sdff8987ssd-234erfs-dfdf',
          name: 'Chris P. Bacon',
        },
      });
    });
  });

  describe('buildFilters', () => {
    const filters = {
      accessibility: [
        'blind_accommodation',
      ],
      addressType: {
        label: 'Other',
        value: 'other',
      },
      address: '',
      catersTo: [
        'caregivers',
      ],
      cities: [
        '0200065',
      ],
      contextAction: 'network',
      counties: [],
      distance: '5',
      includeHomeGroups: true,
      languages: [
        'sq',
      ],
      networks: [
        'a7c8',
      ],
      networkScopes: [],
      serviceTypes: ['2'],
      states: [
        'AK',
      ],
      text: '',
    };
    const geography = {
      Alaska: {
        counties: [
          {
            state: 'AK',
            state_code: '02',
            name: 'Aleutians East Borough',
            display_name: 'Aleutians East Borough',
            code: '013',
            full_code: '02013',
          },
        ],
      },
    };
    const langs = [
      {
        display_name: 'Afrikaans',
        value: 'af',
      },
      {
        display_name: 'Albanian',
        value: 'sq',
      },
    ];
    const network = {
      id: 'a7c86449-5fbf-4143-a7de-0313cde52bec',
      name: 'Automation Networks',
    };
    const services = [
      {
        id: '2',
        name: 'two',
      },
    ];

    it('builds a browse filters payload for tracking', () => {
      const expectedFilters = {
        browse_filters: ['accessibility', 'addressType', 'catersTo', 'cities', 'distance', 'languages', 'serviceTypes', 'states'],
        browse_filters_accessibility: ['blind_accommodation'],
        browse_filters_addressType: 'Other',
        browse_filters_catersTo: ['caregivers'],
        browse_filters_distance: '5',
        browse_filters_languages: ['Albanian'],
        browse_filters_networks: ['a7c8'],
        browse_filters_serviceTypes: ['two'],
        browse_filters_states: ['AK'],
        browse_network_id: 'a7c86449-5fbf-4143-a7de-0313cde52bec',
        browse_network_name: 'Automation Networks',
      };

      expect(Serializer.buildFilters({ langs, geography, network, filters, services }))
        .toEqual(expectedFilters);
    });

    describe('distance', () => {
      it('excludes distance if distance is any', () => {
        const anyDistanceFilters = {
          distance: 'any',
          accessibility: [],
          addressType: {
            label: 'Our Address',
            value: 'ours',
          },
          address: '',
          catersTo: [],
          cities: [],
          contextAction: 'network',
          counties: [],
          includeHomeGroups: true,
          languages: [],
          networks: [],
          networkScopes: [],
          serviceTypes: [],
          states: [],
          text: '',
        };

        const expectedFilters = {
          browse_filters: [],
          browse_network_id: 'a7c86449-5fbf-4143-a7de-0313cde52bec',
          browse_network_name: 'Automation Networks',
        };


        expect(Serializer.buildFilters({ langs, geography, network, filters: anyDistanceFilters, services }))
          .toEqual(expectedFilters);
      });

      it('includes distance if distance is not any', () => {
        const tenMilesDistanceFilters = {
          distance: '10',
          accessibility: [],
          addressType: {
            label: 'Our Address',
            value: 'ours',
          },
          address: '',
          catersTo: [],
          cities: [],
          contextAction: 'network',
          counties: [],
          includeHomeGroups: true,
          languages: [],
          networks: [],
          networkScopes: [],
          serviceTypes: [],
          states: [],
          text: '',
        };

        const expectedFilters = {
          browse_filters: ['distance'],
          browse_filters_distance: '10',
          browse_network_id: 'a7c86449-5fbf-4143-a7de-0313cde52bec',
          browse_network_name: 'Automation Networks',
        };


        expect(Serializer.buildFilters({ langs, geography, network, filters: tenMilesDistanceFilters, services }))
          .toEqual(expectedFilters);
      });
    });

    describe('addressType', () => {
      it('includes addressType if addressType is the client address', () => {
        const clientAddressFilters = {
          distance: 'any',
          accessibility: [],
          addressType: {
            label: 'Clients Address',
            value: 'clients',
          },
          address: '',
          catersTo: [],
          cities: [],
          contextAction: 'network',
          counties: [],
          includeHomeGroups: true,
          languages: [],
          networks: [],
          networkScopes: [],
          serviceTypes: [],
          states: [],
          text: '',
        };

        const expectedFilters = {
          browse_filters: ['addressType'],
          browse_filters_addressType: 'Clients Address',
          browse_network_id: 'a7c86449-5fbf-4143-a7de-0313cde52bec',
          browse_network_name: 'Automation Networks',
        };


        expect(Serializer.buildFilters({ langs, geography, network, filters: clientAddressFilters, services }))
          .toEqual(expectedFilters);
      });
      it('excludes addressType if addressType is an object whose value is `ours`', () => {
        const ourAddressFilters = {
          distance: 'any',
          accessibility: [],
          addressType: {
            label: 'Our Address',
            value: 'ours',
          },
          address: '',
          catersTo: [],
          cities: [],
          contextAction: 'network',
          counties: [],
          includeHomeGroups: true,
          languages: [],
          networks: [],
          networkScopes: [],
          serviceTypes: [],
          states: [],
          text: '',
        };

        const expectedFilters = {
          browse_filters: [],
          browse_network_id: 'a7c86449-5fbf-4143-a7de-0313cde52bec',
          browse_network_name: 'Automation Networks',
        };


        expect(Serializer.buildFilters({ langs, geography, network, filters: ourAddressFilters, services }))
          .toEqual(expectedFilters);
      });
      it('excludes addressType if addressType is the string ours', () => {
        const ourAddressFilters = {
          distance: 'any',
          accessibility: [],
          addressType: 'ours',
          address: '',
          catersTo: [],
          cities: [],
          contextAction: 'network',
          counties: [],
          includeHomeGroups: true,
          languages: [],
          networks: [],
          networkScopes: [],
          serviceTypes: [],
          states: [],
          text: '',
        };

        const expectedFilters = {
          browse_filters: [],
          browse_network_id: 'a7c86449-5fbf-4143-a7de-0313cde52bec',
          browse_network_name: 'Automation Networks',
        };


        expect(Serializer.buildFilters({ langs, geography, network, filters: ourAddressFilters, services }))
          .toEqual(expectedFilters);
      });
    });
  });
});

