import serviceTypeUtils from 'utils/serviceTypes';
import createFilterTrackingObject from './createFilterTrackingObject';

const defaultEntry = {
  prefix: null,
  transformers: {},
};

const SERIALIZER_DICTIONARY = {
  contact: {
    ...defaultEntry,
    keys: ['id', 'full_name'],
  },
  browseFilters: {
    keys: [
      'accessibility',
      'addressType',
      'catersTo',
      'cities',
      'counties',
      'distance',
      'filters',
      'languages',
      'network_id',
      'network_name',
      'networks',
      'networkScopes',
      'serviceTypes',
      'states',
      'text',
    ],
    prefix: 'browse_filters',
    transformers: {
      filters: values => createFilterTrackingObject(values),
      addressType: value => value.label,
    },
  },
  browseGroupDetails: {
    keys: ['id', 'name', 'service_types', 'group_type', 'position'],
    prefix: 'browse_drawer_group',
    transformers: {
      service_types: values => serviceTypeUtils.flattenServiceTypes(values, true)
        .map(val => val.name),
    },
  },
  dropDownGroupDetails: {
    keys: ['id', 'name', 'position', 'network'],
    prefix: 'dropdown_group',
    transformers: {
      service_types: values => serviceTypeUtils.flattenServiceTypes(values, true)
        .map(val => val.name),
    },
  },
  export: {
    keys: ['end_at', 'send_email', 'start_at', 'target_ids', 'target_type', 'time_field', 'time_period', 'type'],
    prefix: 'export',
    transformers: {
      target_ids: values => values.map(val => val.id),
    },
  },
  interaction: {
    ...defaultEntry,
    keys: ['type', 'occurred_on', 'duration'],
  },
  network: {
    ...defaultEntry,
    keys: ['id', 'name'],
    prefix: 'network',
  },
  outcome: {
    ...defaultEntry,
    keys: ['outcome_id', 'resolved'],
  },
  referral: {
    ...defaultEntry,
    keys: [
      'id',
      'contact',
      'referred_by_group',
    ],
    transformers: {
      contact: ({ id, full_name }) => ({ id, full_name }),
      referred_by_group: ({ id, name }) => ({ id, name }),
    },
  },
  sharedGroup: {
    ...defaultEntry,
    keys: ['id', 'name'],
    prefix: 'shared_group',
  },
  user: {
    ...defaultEntry,
    keys: ['id', 'full_name', 'email'],
    prefix: 'user',
  },
};

export default SERIALIZER_DICTIONARY;
