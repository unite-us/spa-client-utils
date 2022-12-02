import _ from 'lodash';

function returnAssistanceRequestPayload(assistanceRequest) {
  if (assistanceRequest) {
    return {
      assistance_request_id: _.get(assistanceRequest, 'id'),
      service_type: _.get(assistanceRequest, 'service_type.name'),
      status: _.get(assistanceRequest, 'status'),
    };
  }

  return null;
}

function returnPagePayload({ nextPage, prevPage }) {
  if (nextPage) {
    const toPage = nextPage + 1;
    return {
      to_page: toPage,
      from_page: nextPage,
    };
  }

  if (prevPage) {
    const toPage = prevPage - 1;

    return {
      to_page: toPage,
      from_page: prevPage,
    };
  }

  return null;
}

function returnServiceCasePayload(serviceCase) {
  if (serviceCase) {
    return {
      case_id: _.get(serviceCase, 'id'),
      contact_id: _.get(serviceCase, 'contact.id'),
      service_type: _.get(serviceCase, 'service_type.name'),
      out_of_network: _.get(serviceCase, 'program.out_of_network'),
    };
  }

  return null;
}

function returnReferralPayload(referral) {
  if (referral) {
    return {
      referral_id: _.get(referral, 'id'),
      contact_id: _.get(referral, 'contact.id'),
      referred_to_group_id: _.get(referral, 'referred_to_group.id'),
      referred_by_group_id: _.get(referral, 'referred_by_group.id'),
    };
  }

  return null;
}

function returnContactPayload(contact) {
  if (contact) {
    return {
      contact_id: _.get(contact, 'id'),
    };
  }

  return null;
}

function returnAssessmentPayload(assessment) {
  if (assessment) {
    return {
      assessment_id: _.get(assessment, 'id'),
    };
  }

  return null;
}

function returnIntakePayload(intake) {
  if (intake) {
    return {
      intake_id: _.get(intake, 'id'),
    };
  }

  return null;
}

function returnSourcePayload(source) {
  return source ? { source } : null;
}

export default function filterPayload({ source, payload, defaultData }) {
  const { assistanceRequest, nextPage, prevPage, serviceCase, referral, contact, assessment, intake } = defaultData;

  const sourcePayload = returnSourcePayload(source);
  const assistanceRequestPayload = returnAssistanceRequestPayload(assistanceRequest);
  const pagePayload = returnPagePayload({ nextPage, prevPage });
  const serviceCasePayload = returnServiceCasePayload(serviceCase);
  const referralPayload = returnReferralPayload(referral);
  const contactPayload = returnContactPayload(contact);
  const assessmentPayload = returnAssessmentPayload(assessment);
  const intakePayload = returnIntakePayload(intake);

  return {
    ...payload,
    ...sourcePayload,
    ...assistanceRequestPayload,
    ...pagePayload,
    ...serviceCasePayload,
    ...referralPayload,
    ...contactPayload,
    ...assessmentPayload,
    ...intakePayload,
  };
}
