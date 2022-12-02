import mockStorage from '../../../../testUtils/mockStorage';
import IntercomHelper from './index';

describe('IntercomHelper', () => {
  const intercomSpy = jest.fn();
  global.Intercom = intercomSpy;

  afterEach(() => {
    intercomSpy.mockClear();
  });

  describe('intrercomGuestLogin', () => {
    it('calls intercom boot if the document is defined', () => {
      IntercomHelper.intercomGuestLogin();

      expect(intercomSpy).toHaveBeenCalledWith('boot', expect.anything());
    });

    it('does not call intercom boot if the docuement is not defined', () => {
      // grab document from global (window) and store it
      const { document } = global;

      // remove it from the global (window) object
      delete global.document;

      IntercomHelper.intercomGuestLogin();

      expect(global.document).toBeUndefined();
      expect(intercomSpy).not.toHaveBeenCalled();

      // stick it back
      global.document = document;
    });
  });

  describe('intercomSessionExists', () => {
    const intercom = { key: 'value' };

    it('returns the the intercom value in app_support', () => {
      const sessionWithSupport = {
        app_support: {
          intercom,
        },
      };

      expect(IntercomHelper.intercomSessionExists(sessionWithSupport)).toBeTruthy();
    });

    it('returns false when there is no valid intercom key in app_support', () => {
      const sessionWithoutSupport = {
        app_support: {
          bar: 'foot',
        },
      };

      expect(IntercomHelper.intercomSessionExists(sessionWithoutSupport)).toBeFalsy();
    });
  });

  describe('intercomUserLogin', () => {
    const user_hash = 'somekindofhashedstring';
    const user_id = '1';

    afterEach(() => {
      intercomSpy.mockClear();
    });

    it('calls Intercom boot with user id and hash', () => {
      IntercomHelper.intercomUserLogin(user_hash, user_id);

      expect(intercomSpy).toHaveBeenCalledWith('boot', expect.objectContaining({ user_hash, user_id }));
    });

    it('does not call boot when the document does not exist', () => {
      const { document } = global;
      delete global.document;

      IntercomHelper.intercomUserLogin(user_hash, user_id);

      expect(intercomSpy).not.toHaveBeenCalled();

      global.document = document;
    });

    it('does not call boot when the document does not exist', () => {
      IntercomHelper.intercomUserLogin(null, user_id);

      expect(intercomSpy).not.toHaveBeenCalled();
    });
  });

  describe('intercomUserUpdate', () => {
    const user_hash = 'somekindofhashedstring';
    const user_id = '1';

    it('calls Intercom update with user id and hash', () => {
      IntercomHelper.intercomUserUpdate(user_hash, user_id);

      expect(intercomSpy).toHaveBeenCalledWith('update', expect.objectContaining({ user_hash, user_id }));
    });

    it('does not call update when the document does not exist', () => {
      const { document } = global;
      delete global.document;

      IntercomHelper.intercomUserLogin(null, user_id);

      expect(intercomSpy).not.toHaveBeenCalled();

      global.document = document;
    });

    it('does not call update when the document does not exist', () => {
      IntercomHelper.intercomUserLogin(null, user_id);

      expect(intercomSpy).not.toHaveBeenCalled();
    });
  });

  describe('shutdown', () => {
    beforeEach(() => {
      global.localStorage = mockStorage();
    });

    afterEach(() => {
      delete global.localStorage;
    });
    it('it calls shutdown if there are intercomSessions in localStorage', () => {
      global.localStorage.setItem('intercomSessions', '1');

      IntercomHelper.shutdown();

      expect(intercomSpy).toHaveBeenCalledWith('shutdown');
    });

    it('it does not call shutdown if intercomSessions is more than 1', () => {
      global.localStorage.setItem('intercomSessions', '2');

      IntercomHelper.shutdown();

      expect(intercomSpy).not.toHaveBeenCalled();
    });

    it('it does not call shutdown if document does not exist', () => {
      global.localStorage.setItem('intercomSessions', '1');
      const { document } = global;
      delete global.document;

      IntercomHelper.shutdown();

      expect(intercomSpy).not.toHaveBeenCalled();
      global.document = document;
    });
  });

  describe('incrementIntercomSessions', () => {
    beforeEach(() => {
      global.localStorage = mockStorage();
    });

    afterEach(() => {
      delete global.localStorage;
    });

    it('increments intercomSessions in localStorage by 1 when called', () => {
      IntercomHelper.incrementIntercomSessions();

      expect(global.localStorage.getItem('intercomSessions')).toEqual('1');
    });
  });

  describe('decrementIntercomSessions', () => {
    beforeEach(() => {
      global.localStorage = mockStorage();
    });

    afterEach(() => {
      delete global.localStorage;
    });

    it('decrements intercomSessions in localStorage by 1 when called', () => {
      IntercomHelper.incrementIntercomSessions();
      IntercomHelper.incrementIntercomSessions();

      expect(global.localStorage.getItem('intercomSessions')).toEqual('2');

      IntercomHelper.decrementIntercomSessions();

      expect(global.localStorage.getItem('intercomSessions')).toEqual('1');
    });
  });

  describe('bootUpdate', () => {
    const intercomUserLoginSpy = jest.spyOn(IntercomHelper, 'intercomUserLogin');
    const intercomUserUpdateSpy = jest.spyOn(IntercomHelper, 'intercomUserUpdate');

    beforeEach(() => {
      intercomUserLoginSpy.mockClear();
      intercomUserUpdateSpy.mockClear();
    });
    it('boots Intercom with a user', () => {
      const session = {
        user_support: {
          intercom: {
            user_hash: 'somekindofwonderful',
            user_id: '49',
          },
        },
        app_support: {
          intercom: {
            bar: 'far',
          },
        },
        intercomBootRequired: true,
      };
      const source = 'appclient';
      const intercomId = 'iouew845u9w';

      IntercomHelper.bootUpdate({ session, intercomId, source, companies: [], userId: undefined });

      expect(intercomUserLoginSpy).toHaveBeenCalledWith('somekindofwonderful', '49', 'iouew845u9w', 'appclient', [], undefined, undefined);
      expect(intercomUserUpdateSpy).not.toHaveBeenCalled();
    });

    it('updates Intercom with a user', () => {
      const session = {
        user_support: {
          intercom: {
            user_hash: 'somekindofwonderful',
            user_id: '49',
          },
        },
        app_support: {
          intercom: {
            bar: 'far',
          },
        },
        intercomBootRequired: false,
      };
      const source = 'ehr';
      const intercomId = 'iouew845u9w';

      IntercomHelper.bootUpdate({ session, intercomId, source, companies: [] });

      expect(intercomUserUpdateSpy).toHaveBeenCalledWith('somekindofwonderful', '49', 'iouew845u9w', 'ehr', [], undefined, undefined);
      expect(intercomUserLoginSpy).not.toHaveBeenCalled();
    });

    it('does not boot when impersonating', () => {
      const session = {
        impersonationType: 'user',
        user_support: {
          intercom: {
            user_hash: 'somekindofwonderful',
            user_id: '49',
          },
        },
        app_support: {
          intercom: {
            bar: 'far',
          },
        },
        intercomBootRequired: true,
      };
      const source = 'appclient';
      const intercomId = 'iouew845u9w';

      IntercomHelper.bootUpdate({ session, intercomId, source });

      expect(intercomUserLoginSpy).not.toHaveBeenCalled();
      expect(intercomUserUpdateSpy).not.toHaveBeenCalled();
    });
    it('does not update when impersonating', () => {
      const session = {
        impersonationType: 'user',
        user_support: {
          intercom: {
            user_hash: 'somekindofwonderful',
            user_id: '49',
          },
        },
        app_support: {
          intercom: {
            bar: 'far',
          },
        },
        intercomBootRequired: false,
      };
      const source = 'appclient';
      const intercomId = 'iouew845u9w';

      IntercomHelper.bootUpdate({ session, intercomId, source });

      expect(intercomUserLoginSpy).not.toHaveBeenCalled();
      expect(intercomUserUpdateSpy).not.toHaveBeenCalled();
    });
  });
});
