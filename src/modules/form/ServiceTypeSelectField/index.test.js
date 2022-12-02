import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import ServiceTypeSelectField from './index';

const props = {
  disabled: false,
  field: {},
  placeholder: 'placeholder text',
  options: [
    {
      name: 'Category 1',
      children: [
        { name: 'benefits for category 1' },
        { name: 'education for category 2' },
      ],
    },
    {
      name: 'Category 3',
      children: [
        { name: 'Moving assistance for category 3' },
        { name: 'Taxes for category 3' },
      ],
    },
  ],
  searchChoices: false,
  className: '',
  id: '',
  registerField: jest.fn(),
  searchPlaceholderValue: 'placeholder value',
  touch: jest.fn(),
  validations: {},
};


describe('ServiceTypeSelectField', () => {
  it('renders', () => {
    const createNodeMock = (element) => {
      if (element.type === 'select') {
        return {
          addEventListener: jest.fn(),
        };
      }
      return null;
    };

    const options = { createNodeMock };
    expect(renderer.create(<ServiceTypeSelectField {...props} />, options)).toMatchSnapshot();
  });

  it('loads correct filter options when search is entered', () => {
    const wrapper = shallow(<ServiceTypeSelectField {...props} />);
    const search = 'Category 3';
    const expected = { options: [props.options[1]] };

    return wrapper.instance().loadOptions(search).then((data) => {
      expect(data).toEqual(expected);
    });
  });

  it('resets options', () => {
    const createNodeMock = (element) => {
      if (element.type === 'select') {
        return {
          addEventListener: jest.fn(),
        };
      }
      return null;
    };

    const options = { createNodeMock };
    const instance = renderer.create(<ServiceTypeSelectField {...props} />, options);
    const selectField = instance.getInstance().selectField;
    const onSearch = jest.spyOn(selectField, 'onSearch');

    selectField.choices.input = { value: 'foo' };

    instance.getInstance().resetOptions();

    expect(selectField.choices.input.value).toEqual('');
    expect(onSearch).toHaveBeenCalledWith({ detail: { value: '' } });
    expect(props.touch).toHaveBeenCalled();
  });
});
