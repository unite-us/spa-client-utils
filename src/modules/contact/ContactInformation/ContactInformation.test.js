import React from 'react';
import { shallow } from 'enzyme';
import ContactInformation from './ContactInformation';

describe('ContactInformation', () => {
  const props = {
    email_addresses: ['contace@info.com', 'irreverant@gmail.com'],
    headerText: 'Program Contact Information',
    isInNetworkGroup: true,
    phone_numbers: [{
      phone_type: 'phone',
      country_code: '1',
      phone_number: '1235552222',
    },
    {
      phone_type: 'other',
      country_code: '1',
      phone_number: '12345678765',
    }],
    primary_contact_name: 'I have a Name',
    showContactInfoHeader: true,
    showMore: true,
    website_url: 'http://itsabookname.com',
  };

  it('render', () => {
    const comp = shallow(<ContactInformation {...props} />);

    expect(comp.find('.ui-contact-information__website')).toHaveLength(1);
    expect(comp.find('.ui-contact-information__worker')).toHaveLength(1);
    expect(comp.find('EmailAddress')).toHaveLength(2);
    expect(comp.find('PhoneNumbers')).toHaveLength(1);
  });
});
