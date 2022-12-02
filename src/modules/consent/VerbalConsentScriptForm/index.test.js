import React from 'react';
import { shallow } from 'enzyme';
import VerbalConsentScriptForm from './';

describe('VerbalConsentScriptForm', () => {
  describe('Verbal Consent Script Form - No BaseCard', () => {
    let props;
    beforeAll(() => {
      props = {
        acceptConsent: jest.fn(() => new Promise(res => res(42))),
        declineConsent: jest.fn(() => new Promise(res => res(42))),
        onSignatureEnd: jest.fn(),
        onSignatureClear: jest.fn(),
        title: 'Consent Form',
        showBaseCard: false,
        fullName: 'Alex Lee',
        userName: 'userName',
      };
    });

    it('renders the form', () => {
      const comp = shallow(<VerbalConsentScriptForm {...props} />);
      expect(comp.find('.verbal-consent-script-form')).toHaveLength(1);
      expect(comp.find('BaseCard')).toHaveLength(0);
      expect(comp.find('Button')).toHaveLength(2);
    });

    it('calls the declineConsent function on decline button click', () => {
      const comp = shallow(<VerbalConsentScriptForm {...props} />);
      comp.find('Button').at(0).simulate('click');
      expect(props.declineConsent).toHaveBeenCalled();
    });

    it('calls the acceptConsent function on decline button click', () => {
      const comp = shallow(<VerbalConsentScriptForm {...props} />);
      comp.find('Button').at(1).simulate('click');
      expect(props.acceptConsent).toHaveBeenCalled();
    });
  });

  describe('state changes', () => {
    it('shows the consent ConsentResponseRecorded', () => {
      const props = {
        acceptConsent: jest.fn(() => new Promise(res => res(42))),
        declineConsent: jest.fn(() => new Promise(res => res(42))),
        onSignatureEnd: jest.fn(),
        onSignatureClear: jest.fn(),
        title: 'Consent Form',
        showBaseCard: false,
        fullName: 'Alex Lee',
        userName: 'userName',
      };
      const comp = shallow(<VerbalConsentScriptForm {...props} />);
      comp.setState({ responseIsComplete: true, accepted: true });
      expect(comp.find('ConsentResponseRecorded')).toHaveLength(1);
    });

    it('shows the consent ConsentDeclinedResponseRecorded', () => {
      const props = {
        acceptConsent: jest.fn(() => new Promise(res => res(42))),
        declineConsent: jest.fn(() => new Promise(res => res(42))),
        onSignatureEnd: jest.fn(),
        onSignatureClear: jest.fn(),
        title: 'Consent Form',
        showBaseCard: false,
        fullName: 'Alex Lee',
        userName: 'userName',
      };
      const comp = shallow(<VerbalConsentScriptForm {...props} />);
      comp.setState({ responseIsComplete: true });
      expect(comp.find('ConsentDeclinedResponseRecorded')).toHaveLength(1);
    });
  });
});
