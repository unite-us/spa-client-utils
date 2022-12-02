import { ACCOUNT_TOKEN } from './constants';

export default function initializeInMoment(props) {
  const { userCreated, userRole, userLocation, config: { noSurveyedCookie, surveyImmediately, productName } } = props;
  const setupScript = document.createElement('script');
  const beacon = document.createElement('script');
  const wootricSettings = {
    product_name: productName,
    account_token: ACCOUNT_TOKEN,
    created_at: userCreated,
    modal_footprint: 'compact',
    properties: {
      user_role: userRole,
      user_location: userLocation,
    },
  };
  setupScript.type = 'text/javascript';
  setupScript.id = 'wootric-settings';
  setupScript.async = true;
  setupScript.innerHTML = `
        wootric_no_surveyed_cookie = ${noSurveyedCookie};
        wootric_survey_immediately = ${surveyImmediately};
        window.wootricSettings = ${JSON.stringify(wootricSettings)}
      `;
  beacon.type = 'text/javascript';
  beacon.id = 'wootric-beacon';
  beacon.async = true;
  beacon.src = 'https://cdn.wootric.com/wootric-sdk.js';
  beacon.onload = () => { window.wootric('run'); };

  if (document.getElementById('wootric-settings') == null) document.body.appendChild(setupScript);
  if (document.getElementById('wootric-beacon') == null) document.body.appendChild(beacon);
}
