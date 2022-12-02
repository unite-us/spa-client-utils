import { isNull, isEmpty, has } from 'lodash';

function isCaseOpen(serviceCase) {
  // TODO: CORE Replace this method with the one in app client AFTER new Core merge
  // https://uniteus.atlassian.net/browse/CORE-899
  if (has(serviceCase, 'outcome')) {
    return isEmpty(serviceCase.outcome);
  }
  return isNull(serviceCase.closing || serviceCase.closed_at);
}

export default isCaseOpen;
