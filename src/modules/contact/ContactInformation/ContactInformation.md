```jsx
const contact = {
  email_addresses: ['contace@info.com', 'irreverant@gmail.com'],
  headerText: 'Program Contact Information',
  isInNetworkGroup: true,
  phone_numbers: [{
    country_code: '1',
    phone_number: '2355522222',
    phone_type: 'phone',
  },
  {
    country_code: '1',
    phone_number: '2345678765',
    phone_type: 'other',
  }],
  primary_contact_name: 'I have a Name',
  showContactInfoHeader: true,
  showMore: true,
  website_url: 'http://itsabookname.com',
  originLatLng: [40.77801264518891, -73.96909460228271]
};

<ContactInformation {...contact} />
```
