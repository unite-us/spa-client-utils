import moment from 'moment';

export const INTERACTION_TYPE_VALUES = {
  PHONE: 'phone_call',
  EMAIL: 'email',
  MEETING: 'meeting',
};

export const INTERACTION_TYPE_OPTIONS = [
  { label: 'Phone', value: INTERACTION_TYPE_VALUES.PHONE },
  { label: 'Email', value: INTERACTION_TYPE_VALUES.EMAIL },
  { label: 'In Person', value: INTERACTION_TYPE_VALUES.MEETING },
];

// this is to be deprecated in favor of src/components/Notes/constants variables
// we can use this reference constant but those values reflect the source of truth
export const NOTE_TYPE_VALUES = {
  GENERAL: 'note',
  INTERACTION: 'interaction',
  PROVIDED_SERVICE: 'provided_service',
};

export const NOTE_TYPE_OPTIONS = [
  { label: 'General', value: NOTE_TYPE_VALUES.GENERAL },
  { label: 'Interaction', value: NOTE_TYPE_VALUES.INTERACTION },
  { label: 'Service Provided', value: NOTE_TYPE_VALUES.PROVIDED_SERVICE },
];

export const UNIT_OPTIONS = [
  { label: 'Dollar Amount ($)', value: 'dollar' },
  { label: 'Hours', value: 'hours' },
  { label: 'Units/Items', value: 'units per item' },
];

export const TODAY = moment().startOf('day').format('X');
export const PLACEHOLDER_TEXT = 'Add your note here';

export const DEFAULT_ATTACHED_TO = 'general';
export const DEFAULT_INTERACTION_TYPE = INTERACTION_TYPE_VALUES.PHONE;
export const DEFAULT_NOTE_TYPE = NOTE_TYPE_VALUES.GENERAL;

export default {
  DEFAULT_ATTACHED_TO,
  DEFAULT_INTERACTION_TYPE,
  DEFAULT_NOTE_TYPE,
  INTERACTION_TYPE_OPTIONS,
  INTERACTION_TYPE_VALUES,
  NOTE_TYPE_OPTIONS,
  NOTE_TYPE_VALUES,
  PLACEHOLDER_TEXT,
  TODAY,
  UNIT_OPTIONS,
};
