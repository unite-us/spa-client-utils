import { map, difference, isEmpty } from 'lodash';

export default function isSectionEmpty(section = {}, hiddenFields = []) {
  const questionIds = map(section.questions, 'id');
  const diff = difference(questionIds, hiddenFields);

  return isEmpty(diff);
}
