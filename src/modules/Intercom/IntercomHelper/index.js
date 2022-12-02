/* eslint-disable new-cap */
import { get } from 'lodash';
import BrowserHelper from '../BrowserHelper';

const IntercomHelper = {
  bootUpdate({ session, intercomId, source, companies, name, userId, userEmail, intercomUserHash }) {
    if (typeof document !== 'undefined') {
      const { intercomBootRequired, impersonationType } = session || {};

      const userHash = intercomUserHash || get(session, 'user_support.intercom.user_hash');
      const intercomUserId = userId || get(session, 'user_support.intercom.user_id');
      const shouldBootIntercom = !impersonationType && intercomBootRequired && IntercomHelper.intercomSessionExists(session);
      const shouldUpdateIntercom = !impersonationType && !intercomBootRequired && IntercomHelper.intercomSessionExists(session);

      // if there is a need for boot and there is a intercomSession
      if (shouldBootIntercom) {
        this.intercomUserLogin(userHash, intercomUserId, intercomId, source, companies, name, userEmail);
      }

      // no need for a boot, just need to update intercom Session
      if (shouldUpdateIntercom) {
        this.intercomUserUpdate(userHash, intercomUserId, intercomId, source, companies, name, userEmail);
      }
    }
  },

  intercomGuestLogin(intercomId, source) {
    if (typeof document !== 'undefined') {
      window.Intercom('boot', {
        app_id: intercomId,
        source,
        widget: {
          activator: '#IntercomDefaultWidget',
        },
      });
    }
  },

  intercomSessionExists(session) {
    return get(session, 'app_support.intercom', false);
  },

  intercomUserLogin(user_hash, user_id, intercomId, source, companies, name, email) {
    if (typeof document !== 'undefined' && user_hash) {
      const data = {
        app_id: intercomId,
        user_id,
        user_hash,
        source,
      };
      if (companies) {
        data.companies = companies;
        data.name = name;
        data.email = email;
      }
      window.Intercom('boot', data);
    }
  },

  intercomUserUpdate(user_hash, user_id, intercomId, source, companies, name, email) {
    if (typeof document !== 'undefined' && user_hash) {
      const data = {
        app_id: intercomId,
        user_id,
        user_hash,
        source,
      };
      if (companies) {
        data.companies = companies;
        data.name = name;
        data.email = email;
      }
      window.Intercom('update', data);
    }
  },

  shutdown() {
    const intercomSessions = Number(localStorage.getItem('intercomSessions'));

    if (typeof document !== 'undefined' && intercomSessions === 1) {
      window.Intercom('shutdown');
    }
  },

  incrementIntercomSessions() {
    // if we can't access localStorage, it means we can't share sessions
    // so we are only concerned with the one session.
    if (BrowserHelper.storageAvailable('localStorage')) {
      // determine if there are existing intercomSessions
      // convert to Number, localStorage values are strings
      // this possibly could return undefined so we at least want to start off with zero
      const updatedIntercomSessions = Number(localStorage.getItem('intercomSessions') || 0) + 1;

      // make the Number a String and update localStorage with the updated sessions
      localStorage.setItem('intercomSessions', String(updatedIntercomSessions));
    }
  },

  decrementIntercomSessions() {
    if (BrowserHelper.storageAvailable('localStorage')) {
      const intercomSessions = Number(localStorage.getItem('intercomSessions'));

      if (intercomSessions <= 0) {
        // let's keep this at zero and not allow any negative numbers to slip in
        localStorage.setItem('intercomSessions', '0');
      } else {
        const decrementedIntercomSessions = intercomSessions - 1;

        localStorage.setItem('intercomSessions', String(decrementedIntercomSessions));
      }
    }
  },
};

export default IntercomHelper;
