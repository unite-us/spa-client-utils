import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import mockStorage from '../../../testUtils/mockStorage';
import SystemAlertBanner from './index';


describe('SystemAlertBanner', () => {
  global.localStorage = mockStorage();

  afterEach(() => {
    global.localStorage.removeItem('systemAlerts');
  });

  const currentUser = {
    id: '1',
  };
  const someMessage = {
    text: 'this is great, really',
    id: 'some-text-1.0.0',
  };


  it('displays a banner', () => {
    const testRenderer = renderer.create(
      <SystemAlertBanner
        text={someMessage.text}
        messageId={someMessage.id}
        currentUser={currentUser}
      />,
    );

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it('hides the banner when you click dismiss button', () => {
    const comp = shallow(
      <SystemAlertBanner
        text={someMessage.text}
        messageId={someMessage.id}
        currentUser={currentUser}
      />,
    );

    comp.find('#system-alert-banner-dismiss-btn').simulate('click');


    expect(comp.find('.system-alert-banner')).toHaveLength(0);
  });

  it('stores message id and user id in a systemAlerts value in localStorage', async () => {
    const comp = shallow(
      <SystemAlertBanner
        text={someMessage.text}
        messageId={someMessage.id}
        currentUser={currentUser}
      />,
    );

    const alerts = global.localStorage.getItem('systemAlerts');
    const parsedAlerts = JSON.parse(alerts);

    // make sure we are starting off with a null
    expect(parsedAlerts).toBeNull();

    // dismiss the banner
    await comp.find('#system-alert-banner-dismiss-btn').simulate('click');

    const newAlerts = global.localStorage.getItem('systemAlerts');
    const parsedNewAlerts = JSON.parse(newAlerts);

    // expect systemAlerts to be in localStorage
    expect(parsedNewAlerts).toEqual({
      1: ['some-text-1.0.0'],
    });
  });

  it('stores message id and user id in a systemAlerts value in localStorage', async () => {
    const comp = shallow(
      <SystemAlertBanner
        text={someMessage.text}
        messageId={someMessage.id}
        currentUser={currentUser}
      />,
    );
    const newSystemAlerts = {
      1: ['some-text-1.0.0.0'],
    };

    localStorage.setItem('systemAlerts', JSON.stringify(newSystemAlerts));

    const alerts = global.localStorage.getItem('systemAlerts');
    const parsedAlerts = JSON.parse(alerts);

    expect(parsedAlerts).toEqual({
      1: [
        'some-text-1.0.0.0',
      ],
    });


    localStorage.setItem('systemAlerts', JSON.stringify(newSystemAlerts));
    // dismiss the banner
    await comp.find('#system-alert-banner-dismiss-btn').simulate('click');

    const newAlerts = global.localStorage.getItem('systemAlerts');
    const parsedNewAlerts = JSON.parse(newAlerts);

    // expect systemAlerts to be in localStorage
    expect(parsedNewAlerts).toEqual({
      1: [
        'some-text-1.0.0.0',
        'some-text-1.0.0',
      ],
    });
  });
});
