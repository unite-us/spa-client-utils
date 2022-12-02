import React from 'react';
import { shallow } from 'enzyme';
import durationOptions from 'testUtils/duration.json';
import { InteractionTypeField } from './InteractionTypeField';
import { INTERACTION_TYPE_OPTIONS } from '../utils/constants';

const props = {
  change: jest.fn(),
  duration: '1',
  durationOptions,
  handleDurationChange: jest.fn(),
  handleInteractionTypeChange: jest.fn(),
  interactionType: 'phone_call',
  note: '',
  validations: [],
};

describe('InteractionTypeField', () => {
  afterEach(() => {
    props.change.mockClear();
    props.handleDurationChange.mockClear();
    props.handleInteractionTypeChange.mockClear();
  });

  it('renders', () => {
    const wrapper = shallow(<InteractionTypeField {...props} />);
    expect(wrapper.find('.ui-interaction-type-field')).toHaveLength(1);
  });

  it('renders interaction type fields', () => {
    const wrapper = shallow(<InteractionTypeField {...props} />);
    const formFields = wrapper.find('Field');

    expect(formFields).toHaveLength(3);
    expect(formFields.at(0).prop('name')).toEqual('type');
    expect(formFields.at(1).prop('name')).toEqual('occurred_on');
    expect(formFields.at(2).prop('name')).toEqual('duration');
  });

  it('renders interaction type options', () => {
    const wrapper = shallow(<InteractionTypeField {...props} />);
    const interactionTypeField = wrapper.find('.ui-interaction-type-field__interaction-type-field');

    expect(interactionTypeField.prop('options')).toEqual(INTERACTION_TYPE_OPTIONS);
  });

  it('does not render duration field if interaction type is email', () => {
    const wrapper = shallow(<InteractionTypeField {...props} interactionType="email" />);
    expect(wrapper.find('.ui-interaction-type-field__duration-field')).toHaveLength(0);
  });

  it('does not initialize duration field if interaction type is email', () => {
    shallow(<InteractionTypeField {...props} interactionType="email" />);
    expect(props.change).not.toHaveBeenCalledWith('interaction.duration');
  });

  it('initializes duration field on mount if interaction type is not email', () => {
    shallow(<InteractionTypeField {...props} duration="30" interactionType="not-email" />);

    expect(props.change).toHaveBeenCalled();
    expect(props.change).toHaveBeenCalledWith('interaction.duration', '30');
  });
});
