import React from 'react';
import { shallow } from 'enzyme';
import InlineEditField from './index';

describe('InlineEditField', () => {
  const baseProps = {
    id: 'inline1',
    label: 'Inline Field 1',
    onFieldSave: jest.fn(),
    value: 'Value',
  };
  it('renders', () => {
    const comp = shallow(<InlineEditField {...baseProps} />);

    expect(comp.find('.ui-inline-edit-field')).toHaveLength(1);
    expect(comp.find('Display')).toHaveLength(1);
    expect(comp.state('localValue')).toBe('Value');
  });

  it('switches to edit mode', () => {
    const onFieldEdit = jest.fn();
    const props = {
      onFieldEdit,
    };
    const comp = shallow(<InlineEditField {...baseProps} {...props} />);

    comp.instance().onEditClick();
    expect(comp.state('editMode')).toBeTruthy();
    expect(onFieldEdit).toHaveBeenCalled();
    expect(comp.find('EditField')).toHaveLength(1);
  });

  it('it forces the display mode if disabled', () => {
    const onFieldEdit = jest.fn();
    const props = {
      onFieldEdit,
      disabled: true,
    };
    const comp = shallow(<InlineEditField {...baseProps} {...props} />);

    comp.instance().onEditClick();
    expect(comp.state('editMode')).toBeTruthy();
    expect(onFieldEdit).toHaveBeenCalled();
    expect(comp.find('EditField')).toHaveLength(0);
    expect(comp.find('Display')).toHaveLength(1);
  });

  it('cancels edition', () => {
    const onFieldCancel = jest.fn();
    const props = {
      onFieldCancel,
    };
    const comp = shallow(<InlineEditField {...baseProps} {...props} />);
    const event = { preventDefault: jest.fn() };
    comp.setState({
      editMode: true,
      localValue: 'something else',
      fieldMeta: {
        ...comp.state('fieldMeta'),
        dirty: true,
        touched: true,
      },
    });
    comp.instance().onCancelEdit(event);
    expect(onFieldCancel).toHaveBeenCalled();
    expect(comp.find('EditField')).toHaveLength(0);
    expect(comp.state('editMode')).toBeFalsy();
    expect(comp.state('localValue')).toBe('Value');
    expect(comp.state('fieldMeta')).toEqual({
      valid: true,
      invalid: false,
      touched: false,
      pristine: true,
      dirty: false,
      visited: false,
      error: undefined,
    });
  });

  describe('Saves the changes', () => {
    it('saves the value', () => {
      const onFieldSave = jest.fn();
      const props = {
        onFieldSave,
      };
      const event = { preventDefault: jest.fn() };
      const comp = shallow(<InlineEditField {...baseProps} {...props} />);
      comp.setState({
        editMode: true,
        localValue: 'new value',
      });
      comp.instance().onSaveEdit(event);
      expect(onFieldSave).toHaveBeenCalledWith('new value');
      expect(comp.state('editMode')).toBeFalsy();
    });

    it('saves the value when using a promise', async () => {
      const onFieldSave = jest.fn(value => Promise.resolve(value));
      const props = {
        onFieldSave,
      };
      const event = { preventDefault: jest.fn() };
      const comp = shallow(<InlineEditField {...baseProps} {...props} />);
      comp.setState({
        editMode: true,
        localValue: 'new value',
      });
      comp.instance().onSaveEdit(event);
      expect(onFieldSave).toHaveBeenCalledWith('new value');
      expect(comp.state('isSaving')).toBeTruthy();

      await comp.update();

      expect(comp.state('isSaving')).toBeFalsy();
      expect(comp.state('editMode')).toBeFalsy();
    });

    it('doesn t save and call onFieldError if the field is erroneous', () => {
      const onFieldSave = jest.fn();
      const onFieldError = jest.fn();
      const props = {
        onFieldSave,
        onFieldError,
      };
      const event = { preventDefault: jest.fn() };
      const comp = shallow(<InlineEditField {...baseProps} {...props} />);
      comp.setState({
        editMode: true,
        localValue: 'new value',
        fieldMeta: {
          ...comp.state('fieldMeta'),
          valid: false,
          error: 'something s wrong',
        },
      });
      comp.instance().onSaveEdit(event);
      expect(onFieldSave).not.toHaveBeenCalled();
      expect(onFieldError).toHaveBeenCalledWith('something s wrong');
      expect(comp.state('editMode')).toBeTruthy();
    });
  });

  it('handles the field changes', () => {
    const onFieldChange = jest.fn();
    const props = {
      onFieldChange,
    };
    const event = {
      target: { value: 'new value' },
    };
    const comp = shallow(<InlineEditField {...baseProps} {...props} />);
    comp.instance().onChange(event);
    expect(comp.state('localValue')).toBe('new value');
    expect(comp.state('fieldMeta').dirty).toBeTruthy();
    expect(comp.state('fieldMeta').pristine).toBeFalsy();
    expect(onFieldChange).toHaveBeenCalledWith('new value');
  });

  it('handles the field changes when the value is directly passed', () => {
    const onFieldChange = jest.fn();
    const props = {
      onFieldChange,
    };
    const value = { label: 'some option', value: 'opt1' };
    const comp = shallow(<InlineEditField {...baseProps} {...props} />);
    comp.instance().onChange(value);
    expect(comp.state('localValue')).toEqual(value);
    expect(comp.state('fieldMeta').dirty).toBeTruthy();
    expect(comp.state('fieldMeta').pristine).toBeFalsy();
    expect(onFieldChange).toHaveBeenCalledWith(value);
  });

  it('handles the blur callback', () => {
    const onFieldBlur = jest.fn();
    const props = {
      onFieldBlur,
    };
    const comp = shallow(<InlineEditField {...baseProps} {...props} />);
    comp.instance().onBlur();

    const fieldMeta = comp.state('fieldMeta');
    expect(fieldMeta.touched).toBeTruthy();
    expect(fieldMeta.visited).toBeTruthy();
    expect(onFieldBlur).toHaveBeenCalled();
  });

  it('validates the field value', () => {
    const comp = shallow(<InlineEditField {...baseProps} />);
    const validationFunc = jest.fn(() => 'some error');

    comp.setProps({ fieldValidations: validationFunc });
    comp.instance().validate();

    expect(comp.state('fieldMeta').error).toBe('some error');
    expect(comp.state('fieldMeta').valid).toBeFalsy();

    comp.setProps({ fieldValidations: undefined });
    comp.instance().validate();

    expect(comp.state('fieldMeta').error).toBeUndefined();
    expect(comp.state('fieldMeta').valid).toBeTruthy();

    comp.setProps({
      fieldValidations: [
        jest.fn(() => 'first error'),
        jest.fn(() => 'second error'),
      ],
    });
    comp.instance().validate();

    expect(comp.state('fieldMeta').error).toBe('first error, second error');
    expect(comp.state('fieldMeta').valid).toBeFalsy();
  });

  it('calls the fieldComponent validate method', () => {
    const comp = shallow(<InlineEditField {...baseProps} />);
    const compRef = {
      validate: jest.fn(() => 'comp error'),
    };

    comp.instance().setFieldRef(compRef);
    comp.instance().validate();

    expect(comp.state('fieldMeta').error).toBe('comp error');
    expect(comp.state('fieldMeta').valid).toBeFalsy();
  });
});
