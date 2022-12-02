import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@unite-us/ui';

class SystemAlertBanner extends Component {
  constructor(props) {
    super(props);

    this.hideSystemAlertBanner = this.hideSystemAlertBanner.bind(this);

    this.state = {
      hideBanner: false,
    };
  }

  componentDidMount() {
    const {
      currentUser,
      messageId,
    } = this.props;

    const { id } = currentUser;

    // grab systemAlerts out of localStorage
    const systemAlerts = localStorage.getItem('systemAlerts');

    if (systemAlerts) {
      // don't try to parse a null, bad things happen
      const parsedAlerts = JSON.parse(systemAlerts);

      // check to see if there is a key for the current user
      // in systemAlerts that contains the message id
      if (parsedAlerts[id] && parsedAlerts[id].includes(messageId)) {
        // hide the message

        this.hideSystemAlertBanner();
      }
    }
  }

  hideSystemAlertBanner() {
    const {
      currentUser,
      messageId,
    } = this.props;

    const { id } = currentUser;

    const systemAlerts = localStorage.getItem('systemAlerts');
    // get existing systemAlerts out of localStorage and parse if exists

    const parsedAlerts = systemAlerts ? JSON.parse(systemAlerts) : {};

    // get current user's existing hidden system alerts
    const hiddenAlerts = parsedAlerts[id] || [];

    // create new system alerts object including current user and message id
    const newSystemAlerts = {
      ...parsedAlerts,
      [id]: [...new Set([...hiddenAlerts, messageId])],
    };

    // hide the banner
    this.setState({
      hideBanner: true,
    });

    // add message id to systemAlerts and stick back in localStorage
    localStorage.setItem('systemAlerts', JSON.stringify(newSystemAlerts));
  }

  render() {
    const { text } = this.props;
    const { hideBanner } = this.state;

    if (hideBanner) {
      return null;
    }

    return (
      <div className="system-alert-banner">
        <div className="system-alert-banner__icon">
          <Icon
            color="#2C405A"
            icon="IconInfoCircle"
            size={28}
          />
        </div>
        <div className="system-alert-banner__text-container">{text}</div>
        <div className="system-alert-banner__dismiss-container">
          <button
            className="system-alert-banner__dismiss"
            id="system-alert-banner-dismiss-btn"
            type="button"
            onClick={this.hideSystemAlertBanner}
          >
            <Icon
              color="#FFF"
              icon="IconCross"
              size={12}
            />
          </button>
        </div>
      </div>
    );
  }
}

SystemAlertBanner.propTypes = {
  currentUser: PropTypes.object.isRequired,
  messageId: PropTypes.string.isRequired,
  text: PropTypes.node.isRequired,

};

export default SystemAlertBanner;
