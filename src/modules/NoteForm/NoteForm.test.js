import React from 'react';
import { shallow } from 'enzyme';
import { head, reject } from 'lodash';
import MockDate from 'mockdate';
import durationOptions from 'testUtils/duration.json';
import { NoteForm } from './NoteForm';
import {
  NOTE_TYPE_OPTIONS,
  NOTE_TYPE_VALUES,
} from './utils/constants';

const NOTE_FORM = 'note';

MockDate.set('09/21/2019 13:00:00');
const date = new Date() / 1000;

const initialValues = {
  occurred_on: date,
  type: 'note',
};

const props = {
  autofill: jest.fn(),
  change: jest.fn(),
  clearFields: jest.fn(),
  durationOptions,
  handleSubmit: jest.fn(),
  initialize: jest.fn(),
  onCancel: jest.fn(),
  onSubmit: jest.fn().mockImplementation(() => Promise.resolve('successful')),
  initialValues,
  submitting: false,
};

const setStateSpy = jest.spyOn(NoteForm.prototype, 'setState');

describe('NoteForm', () => {
  afterEach(() => {
    props.autofill.mockClear();
    props.change.mockClear();
    props.clearFields.mockClear();
    props.handleSubmit.mockClear();
    props.initialize.mockClear();
    props.onCancel.mockClear();
    props.onSubmit.mockClear();
    setStateSpy.mockClear();
  });

  describe('renders', () => {
    it('renders form', () => {
      const wrapper = shallow(<NoteForm {...props} />);
      expect(wrapper.find('form')).toHaveLength(1);
    });

    it('renders note field', () => {
      const wrapper = shallow(<NoteForm {...props} />);
      const formFields = wrapper.find('Field');

      expect(formFields).toHaveLength(1);
      expect(formFields.prop('name')).toEqual('note');
    });

    it('renders note type radio buttons', () => {
      const wrapper = shallow(<NoteForm {...props} />);
      const noteTypeField = wrapper.find('RadioField');
      const noteTypeOptions = noteTypeField.prop('options');

      expect(noteTypeField).toHaveLength(1);
      expect(noteTypeField.prop('className')).toEqual('ui-note-form__note-type-field');
      expect(noteTypeOptions).toEqual(NOTE_TYPE_OPTIONS);
    });

    it("renders InteractionTypeField only when noteType is 'interaction'", () => {
      const wrapper = shallow(<NoteForm {...props} />);
      expect(wrapper.find('InteractionTypeField')).toHaveLength(0);

      wrapper.setState({ noteType: 'interaction' });
      expect(wrapper.find('InteractionTypeField')).toHaveLength(1);

      wrapper.setState({ noteType: 'not-interaction' });
      expect(wrapper.find('InteractionTypeField')).toHaveLength(0);
    });

    it("renders ServiceProvidedField only when noteType is 'provided_service'", () => {
      const wrapper = shallow(<NoteForm {...props} />);
      expect(wrapper.find('ServiceProvidedField')).toHaveLength(0);

      wrapper.setState({ noteType: 'provided_service' });
      expect(wrapper.find('ServiceProvidedField')).toHaveLength(1);

      wrapper.setState({ noteType: 'not-provided_service' });
      expect(wrapper.find('ServiceProvidedField')).toHaveLength(0);
    });

    it("removes 'Service Provided' option when 'hideServiceProvidedField' is true", () => {
      const wrapper = shallow(<NoteForm {...props} hideServiceProvidedField />);
      const noteTypeOptions = reject(NOTE_TYPE_OPTIONS,
        ['value', NOTE_TYPE_VALUES.PROVIDED_SERVICE],
      );

      expect(wrapper.find('RadioField').prop('options')).toEqual(noteTypeOptions);
    });

    it('renders call to action buttons', () => {
      const wrapper = shallow(<NoteForm {...props} />);
      const callToActionButtons = wrapper.find('Button');
      expect(callToActionButtons).toHaveLength(2);

      const cancelButton = wrapper.find('Button').at(0);
      expect(cancelButton.prop('label')).toEqual('Cancel');
      expect(cancelButton.prop('secondary')).toBeTruthy();

      const addButton = wrapper.find('Button').at(1);
      expect(addButton.prop('label')).toEqual('Add Note');
      expect(addButton.prop('primary')).toBeTruthy();
      expect(addButton.prop('type')).toEqual('submit');
    });
  });

  describe('onSubmit', () => {
    const values = { note: { note: 'foo' } };

    it('submits', async () => {
      const wrapper = shallow(<NoteForm {...props} />);
      const noteType = wrapper.instance().state.noteType;
      const resetFormSpy = jest.spyOn(wrapper.instance(), 'resetForm');

      await wrapper.instance().onSubmit(values);

      expect(props.onSubmit).toHaveBeenCalledWith({
        collection_class: 'note',
        interaction: values[noteType],
      });
      expect(resetFormSpy).toHaveBeenCalled();
    });

    it('does not reset if the onSubmit results in error', () => {
      const onSubmit = jest.fn().mockImplementation(() => Promise.resolve(new Error()));
      const wrapper = shallow(<NoteForm {...props} onSubmit={onSubmit} />);
      const resetFormSpy = jest.spyOn(wrapper.instance(), 'resetForm');

      wrapper.instance().onSubmit(values);
      expect(resetFormSpy).not.toHaveBeenCalled();
    });
  });

  it('onCancel', () => {
    const wrapper = shallow(<NoteForm {...props} />);
    const button = wrapper.find('.ui-note-form__cancel-btn');

    expect(button).toHaveLength(1);

    button.simulate('click');

    expect(wrapper.instance().props.initialize).toHaveBeenCalled();
    expect(wrapper.instance().props.initialize).toHaveBeenCalledWith(initialValues);
    expect(wrapper.instance().props.onCancel).toHaveBeenCalled();
  });

  it('resetForm', () => {
    const wrapper = shallow(<NoteForm {...props} />);
    wrapper.instance().resetForm();
    const defaultState = wrapper.instance().initialState;

    expect(wrapper.instance().props.initialize).toHaveBeenCalled();
    expect(wrapper.instance().props.initialize).toHaveBeenCalledWith(initialValues);
    expect(wrapper.instance().state).toEqual(defaultState);
  });

  it('clearFields', () => {
    const wrapper = shallow(<NoteForm {...props} />);

    wrapper.instance().clearFields('someField');

    expect(wrapper.instance().props.clearFields).toHaveBeenCalled();
    expect(wrapper.instance().props.clearFields)
      .toHaveBeenCalledWith(NOTE_FORM, false, false, 'someField');
  });

  it('handleDurationChange', () => {
    const wrapper = shallow(<NoteForm {...props} />);
    const e = 'foo';
    const selectedDuration = '30';

    wrapper.instance().handleDurationChange(e, selectedDuration);
    expect(wrapper.instance().state.duration).toEqual('30');
    expect(wrapper.instance().props.change).toHaveBeenCalled();
    expect(wrapper.instance().props.change).toHaveBeenCalledWith('interaction.duration', '30');
  });

  describe('handleInteractionTypeChange', () => {
    const wrapper = shallow(<NoteForm {...props} />);

    it("clears 'duration' field when interaction type is 'email'", () => {
      const e = { target: { value: 'email' } };

      wrapper.instance().handleInteractionTypeChange(e);
      expect(wrapper.instance().state.interactionType).toEqual('email');
      expect(wrapper.instance().props.clearFields).toHaveBeenCalled();
      expect(wrapper.instance().props.clearFields)
        .toHaveBeenCalledWith(NOTE_FORM, false, false, 'interaction.duration');
    });

    it("sets duration field value from component state when interaction type not 'email'", () => {
      const e = { target: { value: 'not-email' } };

      wrapper.setState({ duration: '15' });
      wrapper.instance().handleInteractionTypeChange(e);

      expect(wrapper.instance().state.interactionType).toEqual('not-email');
      expect(wrapper.instance().props.change).toHaveBeenCalled();
      expect(wrapper.instance().props.change).toHaveBeenCalledWith('interaction.duration', '15');
    });
  });

  it('handleNoteChange', () => {
    const wrapper = shallow(<NoteForm {...props} />);
    const e = 'foo';
    const note = 'Some note text';

    wrapper.instance().handleNoteChange(e, note);
    expect(wrapper.instance().props.change).toHaveBeenCalled();
    expect(wrapper.instance().props.change).toHaveBeenCalledWith('note.note', note);
  });

  describe('handleNoteTypeChange', () => {
    const defaultDuration = head(props.durationOptions).value;

    it('stores the selected note type in local state', () => {
      const wrapper = shallow(<NoteForm {...props} />);
      const e = { target: { value: 'note' } };

      wrapper.instance().handleNoteTypeChange(e);

      expect(wrapper.instance().state.noteType).toEqual('note');
    });

    it('stores default duration in local state', () => {
      const wrapper = shallow(<NoteForm {...props} />);
      const e = { target: { value: 'interaction' } };

      wrapper.instance().handleNoteTypeChange(e);

      expect(wrapper.instance().state.duration).toEqual(defaultDuration);
    });

    it('it does not store duration in state if note type is not interaction', () => {
      const wrapper = shallow(<NoteForm {...props} />);
      const e = { target: { value: 'note' } };

      wrapper.instance().handleNoteTypeChange(e);

      expect(wrapper.instance().state.duration).toEqual(null);
      expect(setStateSpy).not.toHaveBeenCalledWith({ duration: defaultDuration });
    });
  });

  it('validations', () => {
    const wrapper = shallow(<NoteForm {...props} />);
    expect(wrapper.instance().validations[0]()).toEqual('Required');
  });
});
