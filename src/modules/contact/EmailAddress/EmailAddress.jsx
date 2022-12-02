import React from 'react';
import PropTypes from 'prop-types';
import { truncate } from 'lodash';
import classnames from 'classnames';

const EmailAddress = ({ className, disableLink, emailAddress }) => {
  const email = emailAddress.email_address ? emailAddress.email_address : emailAddress;

  return (
    <span className={classnames('ui-email-address', className)}>
      { disableLink ?
        email :
        <a
          href={`mailto:${email}`}
          title={email}
        >
          {truncate(email, { length: 40 })}
        </a>
      }
    </span>
  );
};

EmailAddress.propTypes = {
  /** className */
  className: PropTypes.string,
  /** true to disable the mailto link */
  disableLink: PropTypes.bool,
  /** email address string or object */
  emailAddress: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
};

EmailAddress.defaultProps = {
  className: '',
  disableLink: false,
  isInNetworkGroup: true,
};

export default EmailAddress;
