import axios from 'axios';
import EventTracker from './EventTracker';

jest.useFakeTimers();

describe('EventTracker', () => {
  let config;

  beforeAll(() => {
    config = {
      user: {
        groups: [
          {
            group: {
              id: '1234-uuid-group',
              name: 'group-one',
              state: 'active',
            },
          },
        ],
      },
      groupId: '1234-uuid-group',
      url: 'some-new-nice-fancy-url',
      isCoordinationGroup: true,
    };
  });

  describe('trackClick', () => {
    it('is a static function', () => {
      expect(typeof EventTracker.trackClick).toBe('function');
    });

    it('will not make a request with bad params', async () => {
      axios.post = jest.fn().mockReturnValue(new Promise((res, rej) => rej(new Error('error'))));

      try {
        await EventTracker.trackClick();
      } catch (error) {
        expect(error.message).toEqual('error');
      }
    });

    it('will make a call with good params', async () => {
      const eventPayload = {
        event: {
          created_at: Math.floor((new Date()).getTime() / 1000),
          name: 'Event Name',
        },
        group: {
          id: '1234-uuid-group',
          is_coordination_center: true,
          name: 'group-one',
          state: 'active',
        },
        payload: {
          data: 'foobar',
        },
        user: {
          networks: [],
          roles: [],
        },
      };

      axios.post = jest.fn();
      axios.post.mockReturnValue(new Promise(res => res(true)));

      await EventTracker.trackClick('Event Name', { data: 'foobar' }, config);
      expect(axios.post).toHaveBeenCalledWith('some-new-nice-fancy-url/events', eventPayload);
    });
  });
});
