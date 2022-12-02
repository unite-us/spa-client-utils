import axios from 'axios';
import _ from 'lodash';
import { getSlimUser } from 'utils/user/getSlimUser';
import getSlimGroup from './getSlimGroup';

function eventCreatedAt() {
  return Math.floor((new Date()).getTime() / 1000);
}

export default class EventTracker {
  static trackClick(eventName, payload, config) {
    const group = getSlimGroup(config);
    const user = getSlimUser(_.get(config, 'user', {}), group);
    const url = _.get(config, 'url', null);
    if (!url) {
      console.error('EventTracker.trackClick track url undefined.');
    }

    const data = {
      event: {
        name: eventName,
        created_at: eventCreatedAt(),
      },
      payload,
      user,
      group,
    };

    function onSuccess() {
      return true;
    }

    function onError(error) {
      throw error;
    }

    const request = axios.post(`${url}/events`, data);

    return request.then(onSuccess, onError);
  }
}
