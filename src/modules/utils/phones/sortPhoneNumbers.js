import { compact, find, groupBy, reduce, without } from 'lodash';

const PHONE_TYPE_SORT_ORDER = ['phone', 'fax', 'other'];

const sortPhoneNumbers = (phone_numbers, sortOrder = PHONE_TYPE_SORT_ORDER) => {
  const primaryPhone = find(phone_numbers, { is_primary: true });
  const groupedPhones = groupBy(phone_numbers, 'phone_type');

  const sortedPhones = reduce(sortOrder, (result, phoneType) => {
    if (groupedPhones[phoneType]) {
      result.push(...groupedPhones[phoneType]);
      return result;
    }
    return result;
  }, []);

  const phoneNumbers = compact([
    primaryPhone,
    ...without(sortedPhones, primaryPhone),
  ]);

  return phoneNumbers;
};

export default sortPhoneNumbers;
