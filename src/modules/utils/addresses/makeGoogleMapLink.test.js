import group from 'testUtils/group.json';
import makeGoogleMapLink from './makeGoogleMapLink';

describe('makeGoogleMapLink', () => {
  it('returns a link to a google map when a valid address is passed in', () => {
    expect(makeGoogleMapLink(group.addresses[0])).toEqual('https://www.google.com/maps/dir/?api=1&destination=10%20Columbus%20Circle%2C%20New%20York%2C%20NY%2010019');
  });

  it('returns a google map link when a non valid address is passed in', () => {
    expect(makeGoogleMapLink()).toEqual('https://www.google.com/maps/dir/?api=1&destination=');
    expect(makeGoogleMapLink('zoo')).toEqual('https://www.google.com/maps/dir/?api=1&destination=');
  });
});
