import React from 'react';
import { shallow } from 'enzyme';
import { ShareForm } from './ShareForm';
import InfoPopover from '../../InfoPopover';

const props = {
  email: '',
  phone: '',
  handleSubmit: jest.fn(),
  onCancel: jest.fn(),
  onSend: jest.fn().mockImplementation(() => Promise.resolve(new Error())),
  reset: jest.fn(),
  sharedGroups: [
    { id: 'shared-group-1' },
    { id: 'shared-group-2' },
  ],
  sharesUrl: 'shares-url.com',
  open: false,
  id: 'test-id',
};

describe('ShareForm', () => {
  afterEach(() => {
    props.handleSubmit.mockClear();
    props.onCancel.mockClear();
    props.onSend.mockClear();
    props.reset.mockClear();
  });

  it('renders', () => {
    const wrapper = shallow(<ShareForm {...props} />);
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it('renders the phone field and send button', () => {
    const wrapper = shallow(<ShareForm {...props} messageType="sms" hideCancelButton />);
    expect(wrapper.find('#share-phone-field')).toHaveLength(1);
    expect(wrapper.find('#share-email-field')).toHaveLength(0);
    expect(wrapper.find('#share-send-button')).toHaveLength(1);
    expect(wrapper.find('#share-cancel-button')).toHaveLength(0);
  });

  it('renders the email field and cancel/send buttons', () => {
    const wrapper = shallow(<ShareForm {...props} messageType="email" />);
    expect(wrapper.find('#share-email-field')).toHaveLength(1);
    expect(wrapper.find('#share-phone-field')).toHaveLength(0);
    expect(wrapper.find('#share-send-button')).toHaveLength(1);
    expect(wrapper.find('#share-cancel-button')).toHaveLength(1);
  });

  it('renders the print buttons', () => {
    const wrapper = shallow(<ShareForm {...props} messageType="print" />);
    expect(wrapper.find('#share-print-button')).toHaveLength(1);
    expect(wrapper.find('#share-send-button')).toHaveLength(0);
  });

  it('resets when the drawer closes', () => {
    const reset = jest.fn();
    const wrapper = shallow(<ShareForm {...props} open reset={reset} />);
    wrapper.setProps({ open: false });
    expect(reset).toHaveBeenCalled();
  });

  it('does not reset when other props update', () => {
    const reset = jest.fn();
    const wrapper = shallow(<ShareForm {...props} open reset={reset} />);
    wrapper.setProps({ foo: 'bar' });
    expect(reset).not.toHaveBeenCalled();
  });

  describe('#onPrint', () => {
    let mockClickEvent;

    beforeEach(() => {
      mockClickEvent = { preventDefault: jest.fn() };
    });

    afterEach(() => {
      mockClickEvent.preventDefault.mockRestore();
    });

    it('opens a window and focuses that window', () => {
      const oldGlobalOpen = global.open;
      const focus = jest.fn();
      global.open = jest.fn(() => ({ focus }));
      ShareForm.defaultProps.handlePrint = global.open; // Have to set this for the test because default prop is evaluted on js load.
      const url = 'shares-url.com/?groupId=shared-group-1,shared-group-2&print=true';
      const wrapper = shallow(<ShareForm {...props} messageType="print" />);
      wrapper.instance().onPrint(mockClickEvent);
      expect(global.open).toHaveBeenCalledWith(url, '_blank');
      expect(mockClickEvent.preventDefault).toHaveBeenCalledTimes(1);
      expect(focus).toHaveBeenCalled();
      global.open = oldGlobalOpen;
    });

    it('uses the handlePrint prop', () => {
      const handlePrintSpy = jest.fn();
      const url = 'shares-url.com/?groupId=shared-group-1,shared-group-2&print=true';
      const wrapper = shallow(<ShareForm {...props} messageType="print" handlePrint={handlePrintSpy} />);
      wrapper.instance().onPrint(mockClickEvent);
      expect(handlePrintSpy).toHaveBeenCalledWith(url, '_blank');
      expect(mockClickEvent.preventDefault).toHaveBeenCalledTimes(1);
    });

    it('calls onPrint prop', () => {
      const onPrint = jest.fn();
      const wrapper = shallow(<ShareForm {...props} messageType="print" onPrint={onPrint} />);
      wrapper.instance().onPrint(mockClickEvent);
      expect(onPrint).toHaveBeenCalled();
      expect(mockClickEvent.preventDefault).toHaveBeenCalledTimes(1);
    });
  });

  describe('#onSend', () => {
    const values = { messageType: 'email', email: '1112223333' };

    it('calls onSend prop', () => {
      const wrapper = shallow(<ShareForm {...props} />);
      wrapper.instance().onSend(values);
      expect(props.onSend).toHaveBeenCalledWith({ messageType: 'email', to: '1112223333' });
    });
    it('does not reset if the onSend result Error', () => {
      const wrapper = shallow(<ShareForm {...props} />);
      wrapper.instance().onSend(values);
      expect(props.reset).not.toHaveBeenCalled();
    });
    it('resets if the onSend result is successful', () => {
      const onSend = jest.fn().mockImplementation(() => Promise.resolve('successful'));
      const wrapper = shallow(<ShareForm {...props} onSend={onSend} />);
      return wrapper.instance().onSend(values).then(() => {
        expect(props.reset).toHaveBeenCalled();
      });
    });
    it('drawer closes on successful share', () => {
      const onSend = jest.fn().mockImplementation(() => Promise.resolve('successful'));
      const wrapper = shallow(<ShareForm {...props} onSend={onSend} />);
      wrapper.instance().onSend(values);
      return wrapper.instance().onSend(values).then(() => {
        expect(props.onCancel).toHaveBeenCalled();
      });
    });
  });

  describe('#onCancel', () => {
    it('calling onCancel component method, resets the form and calls onCancel prop', () => {
      const wrapper = shallow(<ShareForm {...props} />);
      wrapper.instance().onCancel();
      expect(props.onCancel).toHaveBeenCalledTimes(1);
      expect(props.reset).toHaveBeenCalledTimes(1);
    });
  });

  describe('#onChangeOrReset', () => {
    it('calls reset when no onChangeMessageType props are passed', () => {
      const wrapper = shallow(<ShareForm {...props} />);
      wrapper.instance().onChangeOrReset();
      expect(props.reset).toHaveBeenCalledTimes(1);
    });

    it('calls onChangeMessageType to have been called when passed', () => {
      const shareFormProps = {
        ...props,
        onChangeMessageType: jest.fn(),
      };
      const wrapper = shallow(<ShareForm {...shareFormProps} />);
      wrapper.instance().onChangeOrReset();
      expect(shareFormProps.onChangeMessageType).toHaveBeenCalledTimes(1);
    });
  });

  describe('labels', () => {
    it('correctly render share method label', () => {
      const wrapper = shallow(<ShareForm {...props} messageType="sms" hideCancelButton />);
      const shareField = wrapper.find('Field#share-message-type');
      expect(shareField.prop('label')).toEqual('Share Method');
    });

    it('renders InfoPopover inside label', () => {
      const wrapper = shallow(<ShareForm {...props} messageType="sms" hideCancelButton />);
      const shareField = wrapper.find('Field#share-message-type');
      const shareTextLabel = shareField.prop('options')[0].label;
      const InfoPopoverInLabel = shareTextLabel.props.children[1];
      expect(InfoPopoverInLabel.type).toEqual(InfoPopover);
    });
  });
});
