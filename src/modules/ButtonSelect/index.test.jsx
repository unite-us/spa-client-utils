import React from 'react';
import { shallow, mount } from 'enzyme';
import ButtonSelect from './index';

describe('ButtonSelect', () => {
  it('renders', () => {
    const comp = shallow(<ButtonSelect id="test-component" placeholder="label" />);

    expect(comp.find('.ui-button-select')).toHaveLength(1);
  });

  it('does the respective action value when handleOnChange is called', () => {
    const valueSpyOne = jest.fn();
    const valueSpyTwo = jest.fn();
    const valueSpyThree = jest.fn();

    const props = {
      options: [
        {
          label: 'Quick Action',
          value: '1',
          action: valueSpyOne,
        },
        {
          label: 'Quick Action',
          value: '2',
          action: valueSpyTwo,
        },
        {
          label: 'Quick action no function',
          value: '3',
          action: null,
        },
      ],
      id: 'test-component',
      placeholder: 'label',
    };

    const comp = mount(<ButtonSelect {...props} />);
    const compInstance = comp.instance();

    compInstance.handleOnChange('1');
    expect(valueSpyOne).toBeCalled();

    compInstance.handleOnChange('2');
    expect(valueSpyTwo).toBeCalled();

    compInstance.handleOnChange('3');
    expect(valueSpyThree).not.toBeCalled();
  });
});
