import _ from 'lodash';
import filterPayload from './filterPayload';

describe('filterPayload', () => {
  describe('all data exists', () => {
    let source;
    let payload;
    let defaultData;
    let filterPayloadResult;

    beforeAll(() => {
      source = 'app-client';
      payload = {
        view: 'Any Random View',
      };
      defaultData = {
        assistanceRequest: {
          id: 'ar-1234',
          service_type: {
            name: 'ar-name',
          },
          status: 'open',
        },
        serviceCase: {
          id: 'case-1234',
          contact: {
            id: 'contact-1234',
          },
          service_type: {
            name: 'service-type-name',
          },
          program: {
            out_of_network: true,
          },
        },
        referral: {
          id: 'referral-1234',
          contact: {
            id: 'contact-1234',
          },
        },
        nextPage: 2,
      };
      filterPayloadResult = filterPayload({ source, payload, defaultData });
    });

    it('returns the unique payload', () => {
      expect(_.has(filterPayloadResult, 'view')).toBeTruthy();
    });

    it('returns the source payload', () => {
      expect(_.has(filterPayloadResult, 'source')).toBeTruthy();
    });

    it('returns the serviceCase object', () => {
      expect(_.has(filterPayloadResult, 'case_id')).toBeTruthy();
      expect(_.has(filterPayloadResult, 'contact_id')).toBeTruthy();
      expect(_.has(filterPayloadResult, 'service_type')).toBeTruthy();
      expect(_.has(filterPayloadResult, 'out_of_network')).toBeTruthy();
    });

    it('returns the assistance Request object', () => {
      expect(_.has(filterPayloadResult, 'assistance_request_id')).toBeTruthy();
      expect(_.has(filterPayloadResult, 'service_type')).toBeTruthy();
      expect(_.has(filterPayloadResult, 'status')).toBeTruthy();
    });

    it('returns the referral object', () => {
      expect(_.has(filterPayloadResult, 'referral_id')).toBeTruthy();
      expect(_.has(filterPayloadResult, 'contact_id')).toBeTruthy();
    });

    it('returns the next page object with correct data', () => {
      expect(filterPayloadResult.to_page).toEqual(3);
      expect(filterPayloadResult.from_page).toEqual(2);
    });

    it('returns the previous page object with correct data', () => {
      const modifiedDefaultData = { ..._.omit(defaultData, ['nextPage']), prevPage: 2 };
      const modifiedPayloadResult = filterPayload({ source, payload, defaultData: modifiedDefaultData });
      expect(modifiedPayloadResult.to_page).toEqual(1);
      expect(modifiedPayloadResult.from_page).toEqual(2);
    });
  });

  describe('no data exists', () => {
    let source;
    let payload;
    let defaultData;
    let filterPayloadResult;

    beforeAll(() => {
      payload = {};
      defaultData = {};
      filterPayloadResult = filterPayload({ source, payload, defaultData });
    });

    it('does not return a unique payload', () => {
      expect(_.has(filterPayloadResult, 'view')).toBeFalsy();
    });

    it('does not return the source payload', () => {
      expect(_.has(filterPayloadResult, 'source')).toBeFalsy();
    });

    it('does not return the serviceCase object', () => {
      expect(_.has(filterPayloadResult, 'case_id')).toBeFalsy();
      expect(_.has(filterPayloadResult, 'case_contact_id')).toBeFalsy();
      expect(_.has(filterPayloadResult, 'service_type')).toBeFalsy();
      expect(_.has(filterPayloadResult, 'out_of_network')).toBeFalsy();
    });

    it('does not return the assistance Request object', () => {
      expect(_.has(filterPayloadResult, 'assistance_request_id')).toBeFalsy();
      expect(_.has(filterPayloadResult, 'service_type')).toBeFalsy();
      expect(_.has(filterPayloadResult, 'status')).toBeFalsy();
    });

    it('does not return the referral object', () => {
      expect(_.has(filterPayloadResult, 'referral_id')).toBeFalsy();
      expect(_.has(filterPayloadResult, 'contact_id')).toBeFalsy();
    });

    it('does not return the page object', () => {
      expect(_.has(filterPayloadResult, 'from_page')).toBeFalsy();
      expect(_.has(filterPayloadResult, 'to_page')).toBeFalsy();
    });
  });
});
