import React from 'react';
import renderer from 'react-test-renderer';
import ProgramDescription from './ProgramDescription';

jest.mock(
  'modules/ExpandableContainer',
  () => props => <div className="expandable-container" {...props} />,
);

describe('ProgramDescription', () => {
  let props;

  beforeAll(() => {
    props = {
      program: {
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
        email_addresses: ['bobby@gmail.com', 'larry@gmail.com'],
        phone_numbers: [{ country_code: '1', phone_number: '1234442123', phone_type: 'phone' }],
        website_url: 'testingtesting.com',
        description: '<div>Hello World</div>',
      },
      showMore: true,
      showLess: false,
    };
  });
  it('renders ProgramDescription', () => {
    expect(renderer.create(<ProgramDescription {...props} />)).toMatchSnapshot();
  });

  it('renders ProgramDescription description undefined/null', () => {
    const newProps = { ...props, description: null };
    expect(renderer.create(<ProgramDescription {...newProps} />)).toMatchSnapshot();
  });
});
