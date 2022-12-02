export default function getDetailObj(detailObj) {
  switch (detailObj._meta._type) {
    case 'assistancerequest':
      return {
        assistanceRequest: detailObj,
      };
    case 'cases_servicecase':
      return {
        serviceCase: detailObj,
      };
    default:
      return {
        referral: detailObj,
      };
  }
}
