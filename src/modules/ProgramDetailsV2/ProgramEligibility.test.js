import React from 'react';
import renderer from 'react-test-renderer';
import ProgramEligibility from './ProgramEligibility';

jest.mock(
  'modules/ExpandableContainer',
  () => props => <div className="expandable-container" {...props} />,
);

describe('ProgramEligibility', () => {
  let props;

  beforeAll(() => {
    props = {
      originLatLng: [42.4191639, -71.0269413],
      program: {
        name: 'Program 1',
        receiving_referrals: true,
        status: null,
        email_addresses: ['bobby@gmail.com', 'larry@gmail.com'],
        phone_numbers: [{ country_code: '1', phone_number: '1234442123', phone_type: 'phone' }],
        accessibility_options: [
          {
            id: 'ada_accessible',
            name: 'ADA accessible',
          },
          {
            id: 'translation_services',
            name: 'Interpreter/translation services available',
          },
        ],
        locations: [
          {
            line_1: '123 Loooooooooooooooooooong Street',
            city: 'Funmouth',
            state: 'MA',
            postal_code: '12345',
            country: 'USA',
            address_type: 'work',
            latitude: 42.3682235,
            longitude: -70.2398932,
            is_primary: true,
          },
          {
            line_1: '123 lol Street',
            city: 'Funmouth',
            state: 'MA',
            postal_code: '12345',
            country: 'USA',
            address_type: 'work',
            latitude: 42.3682235,
            longitude: -71.2398932,
            is_primary: true,
          },
        ],
        service_types: [
          {
            id: '50126fcb-a3e9-45d5-9a8e-c32b7fd810b4',
            code: 'UU-BENEFITS',
            name: 'Benefits',
            definition: null,
            created_at: 0,
            updated_at: 0,
            children: [
              {
                id: '2ac1bb8f-89a1-44b9-9e24-9af3cec8a2de',
                code: 'UU-BENEFITS-BENEFITS-ELIGIBILITY-SCREENING',
                name: 'Benefits Eligibility Screening',
                definition: null,
                created_at: 0,
                updated_at: 0,
              },
            ],
            parent_service_type: null,
            facet: null,
          },
        ],
        description: '<div>Hello World</div>',
        eligibility_text: '<p>You are eligible</p>',
      },
      showMore: true,
      showLess: false,
      sectionEmpty: {},
    };
  });

  it('renders ProgramEligibility', () => {
    expect(renderer.create(<ProgramEligibility {...props} />)).toMatchSnapshot();
  });

  it('renders ProgramEligibility eligibility true', () => {
    const newProps = { ...props, eligibility: true };
    expect(renderer.create(<ProgramEligibility {...newProps} />)).toMatchSnapshot();
  });

  it('renders ProgramEligibility geography true', () => {
    const newProps = { ...props, geography: true };
    expect(renderer.create(<ProgramEligibility {...newProps} />)).toMatchSnapshot();
  });
});
