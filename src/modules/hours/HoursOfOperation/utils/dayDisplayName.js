const ABBREVIATED_DAYS = {
  monday: 'mon',
  tuesday: 'tue',
  wednesday: 'wed',
  thursday: 'thu',
  friday: 'fri',
  saturday: 'sat',
  sunday: 'sun',
};

const dayDisplayName = day => (ABBREVIATED_DAYS[day] || day);

export default dayDisplayName;
