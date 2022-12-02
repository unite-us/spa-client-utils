import React from 'react';
import { shallow, mount } from 'enzyme';
import ActionSelect from './index';

describe('ActionSelect', () => {
  it('renders', () => {
    shallow(<ActionSelect id="test-component" />);
  });

  it('renders the main container', () => {
    const component = shallow(<ActionSelect id="test-component" />);

    expect(component.find('.ui-action-select')).toHaveLength(1);
  });

  it('sets state when handleCancelClick is called', () => {
    const component = mount(<ActionSelect id="test-component" />);
    const cancelButton = component.find('.cancel-button');

    cancelButton.simulate('click', { preventDefault: jest.fn() });

    expect(cancelButton).toHaveLength(1);
    expect(component.state('loading')).toBeFalsy();
    expect(component.state('selectedAction')).toBeUndefined();
  });

  it('sets state and calls onChange prop when handleOnChange is called', () => {
    const props = {
      actions: [
        {
          label: 'Async Action',
          value: '1',
          action: jest.fn(),
        },
        {
          label: 'Quick Action',
          value: '2',
          action: jest.fn(),
        },
      ],
      id: 'test-component',
      onChange: jest.fn(),
    };
    const component = shallow(<ActionSelect {...props} />);

    component.instance().handleOnChange('2');
    expect(component.state('selectedAction')).toEqual(props.actions[1]);
    expect(props.onChange).toHaveBeenCalledWith(props.actions[1]);
  });

  it('sets state when handleConfirmClick is called', async () => {
    const props = {
      actions: [
        {
          label: 'Async Action',
          value: '1',
          action: jest.fn(),
        },
        {
          label: 'Quick Action',
          value: '2',
          action: jest.fn(() => new Promise(resolve => resolve(42))),
        },
      ],
      id: 'test-component',
    };
    const component = mount(<ActionSelect {...props} />);
    await component.instance().handleOnChange('2');

    const confirmButton = component.find('.confirm-button');
    await confirmButton.simulate('click', { preventDefault: jest.fn() });
    await component.update();

    expect(confirmButton).toHaveLength(1);
    expect(component.state('selectedAction')).toBeUndefined();
  });

  it('renders a disabled SelectField when disabled prop is true', () => {
    const component = mount(<ActionSelect disabled id="action-select-id" />);
    const selectField = component.find('SelectField');
    expect(selectField.props().disabled).toBe(true);
  });
});
