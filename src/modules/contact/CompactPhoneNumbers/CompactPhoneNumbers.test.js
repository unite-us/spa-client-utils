import React from 'react';
import renderer from 'react-test-renderer';
import CompactPhoneNumbers from './CompactPhoneNumbers';

describe('CompactPhoneNumbers', () => {
  const props = {
    phone_numbers: [],
  };

  beforeEach(() => {
    props.phone_numbers = [
      {
        phone_number: '1232221233',
        extension: '1',
        phone_type: 'home',
      },
      {
        phone_number: '2223123454',
        extension: '1',
        phone_type: 'unknown',
      },
      {
        phone_type: 'work',
        phone_number: '1234567890',
      },
      {
        phone_type: 'fax',
        phone_number: '1231234567',
      },
    ];
  });

  it('renders phone numbers', () => {
    expect(renderer.create(<CompactPhoneNumbers {...props} />)).toMatchSnapshot();
  });

  it('does not render anything if the phone numbers list is empty', () => {
    expect(
      renderer.create(<CompactPhoneNumbers phone_numbers={[]} />).toJSON(),
    ).toBe(null);
  });

  it('renders max 3 phone numbers', () => {
    expect(
      renderer.create((
        <CompactPhoneNumbers
          phone_numbers={props.phone_numbers}
        />
      ))
        .root
        .findAllByProps({ className: 'phone-number' }),
    ).toHaveLength(3);
  });

  it('does not render numbers with falsy number properties', () => {
    props.phone_numbers[0].phone_number = '';
    props.phone_numbers.splice(2, 2);
    expect(
      renderer.create((
        <CompactPhoneNumbers
          phone_numbers={props.phone_numbers}
        />
      ))
        .root
        .findAllByProps({ className: 'phone-number' }),
    ).toHaveLength(1);
  });

  it('renders phone_type property', () => {
    const instance = renderer.create(<CompactPhoneNumbers {...props} />);
    expect(instance.root.findAllByProps({ className: 'phone-number__phone-type' })[0].children[0])
      .toEqual(props.phone_numbers[0].phone_type);
  });

  it('renders a toggle button when there are more than 3 numbers', () => {
    const instance = renderer.create(<CompactPhoneNumbers {...props} />);
    expect(instance.root.findAllByProps({ className: 'phone-number__toggle' }))
      .toHaveLength(1);
  });

  it('does not render a toggle button when there are 3 numbers or less', () => {
    props.phone_numbers.splice(0, 1);
    const instance = renderer.create(<CompactPhoneNumbers {...props} />);
    expect(instance.root.findAllByProps({ className: 'phone-number__toggle' }))
      .toHaveLength(0);
  });
});
