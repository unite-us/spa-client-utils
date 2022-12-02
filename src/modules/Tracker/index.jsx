import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import EventTracker from '../utils/tracker/EventTracker';
import filterPayload from '../utils/tracker/filterPayload';
import TrackerContext from './context';

let globalState = {
  getConfig: null,
  source: null,
};

export const trackEvent = (
  eventName = 'Unknown Event',
  payload = {},
  defaultData = {},
) => {
  const { getConfig, source } = globalState;
  if (!eventName || !payload || !defaultData || !getConfig) {
    const msg = 'trackEvent missing arguments';
    if (window.Rollbar) window.Rollbar.error(msg, { eventName, payload });
    if (window.newrelic) window.newrelic.noticeError(new Error(msg));
    // eslint-disable-next-line no-console
    return console.error(msg);
  }
  const filteredPayload = filterPayload({ source, payload, defaultData });
  return EventTracker.trackClick(eventName, filteredPayload, getConfig());
};

const setGlobalState = (getConfig, source) => {
  globalState = { getConfig, source };
};

export default class Tracker extends Component {
  constructor(props) {
    super(props);
    const { getConfig, source } = this.props;
    setGlobalState(getConfig, source);
    this.eventTracker = this.eventTracker.bind(this);
  }

  getChildContext() {
    return { eventTracker: this.eventTracker };
  }

  UNSAFE_componentWillReceiveProps() {
    const { getConfig, source } = this.props;
    setGlobalState(getConfig, source);
  }

  eventTracker(eventName = 'Unknown Event', payload = {}, defaultData = {}) {
    const { source, getConfig } = this.props;
    setGlobalState(getConfig, source);
    trackEvent(eventName, payload, defaultData);
  }

  render() {
    return (
      <TrackerContext.Provider value={this.eventTracker}>
        {Children.only(this.props.children)}
      </TrackerContext.Provider>
    );
  }
}

Tracker.propTypes = {
  children: PropTypes.element.isRequired,
  source: PropTypes.string.isRequired,
  getConfig: PropTypes.func.isRequired,
};

Tracker.childContextTypes = {
  eventTracker: PropTypes.func,
};
