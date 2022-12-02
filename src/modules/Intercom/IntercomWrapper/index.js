import { Component } from 'react';
import PropTypes from 'prop-types';
import IntercomHelper from '../IntercomHelper';

class IntercomWrapper extends Component {
  static componentGracefulUnmount() {
    IntercomHelper.decrementIntercomSessions();

    // clean up our window event listener!!
    window.removeEventListener('beforeunload', IntercomWrapper.componentGracefulUnmount);
  }

  UNSAFE_componentWillMount() {
    const { session, source, intercomId, companies, name, userId, userHash, userEmail } = this.props;

    // set up a listener for this window event, if a page is refreshed or closed, we need
    // to update the intercomSessions, we can't depend on componentWillUnmount here
    window.addEventListener('beforeunload', IntercomWrapper.componentGracefulUnmount);

    // Update Intercom here with a new session or possible updated intercom session
    IntercomHelper.bootUpdate({
      session,
      intercomId,
      source,
      companies,
      name,
      userId,
      intercomUserHash: userHash,
      userEmail,
    });
    // { session, intercomId, source, companies = undefined, name = undefined, userId = undefined, intercomUserHash = undefined }
    // add intercom session to any existing intercomSessions in localStorage
    // we will use amount of intercomSessions in localStorage to determine if we need to call Intercom('shutdown')
    // if a new tab or window is open, we want to track it,
    // we do so by tracking the mounting/unmounting of this IntercomWrapper
    IntercomHelper.incrementIntercomSessions();
  }

  componentWillUnmount() {
    // we want to call this Class function to adjust the intercomSessions in localStorage
    // if we log out, the componentWillUnmount will be called
    IntercomWrapper.componentGracefulUnmount();
  }

  render() {
    return this.props.children;
  }
}

IntercomWrapper.defaultProps = {
  companies: undefined,
  name: undefined,
  userHash: undefined,
  userId: undefined,
  userEmail: undefined,
};

IntercomWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  intercomId: PropTypes.string.isRequired,
  session: PropTypes.object.isRequired,
  source: PropTypes.string.isRequired,
  companies: PropTypes.array,
  userHash: PropTypes.string,
  name: PropTypes.string,
  userId: PropTypes.string,
  userEmail: PropTypes.string,
};

export default IntercomWrapper;
