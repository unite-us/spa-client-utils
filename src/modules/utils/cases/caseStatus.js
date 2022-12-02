import isCaseOpen from './isCaseOpen';

function caseStatus(serviceCase) {
  return isCaseOpen(serviceCase) ? 'open' : 'closed';
}

export default caseStatus;
