import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { InputField, CheckBoxField } from '@unite-us/ui';
import classNames from 'classnames';

const EmailField = (props) => {
  const {
    id,
    className,
    label,
    emailAddressPath,
    primaryPath,
    emailInputClassName,
    emailPrimaryClassName,
    primary,
  } = props;

  const emailContainerClass = () => classNames({
    'ui-email-field': true,
  }, className);

  const emailInputClass = () => classNames({
    'ui-email-field__input': true,
  }, emailInputClassName);

  const emailPrimaryClass = () => classNames({
    'ui-email-field__checkbox': true,
  }, emailPrimaryClassName);

  return (
    <div className={emailContainerClass()}>
      <InputField
        id={id}
        className={emailInputClass()}
        name="email"
        label={label}
        {..._.get(props, emailAddressPath, {})}
      />
      {
        primary ?
          <CheckBoxField
            id="checkbox-field-primary"
            className={emailPrimaryClass()}
            label="Primary"
            {..._.get(props, primaryPath, {})}
          /> : null
      }
    </div>
  );
};

EmailField.propTypes = {
  /** id for reference */
  id: PropTypes.string.isRequired,
  /** className for reference */
  className: PropTypes.string,
  /** label text for button */
  label: PropTypes.string,
  /** email input field path name */
  emailAddressPath: PropTypes.string,
  /** email checkbox field path primary */
  primaryPath: PropTypes.string,
  /** email input className */
  emailInputClassName: PropTypes.string,
  /** email primary checkbox className */
  emailPrimaryClassName: PropTypes.string,
  /** If true, display the primary checkbox */
  primary: PropTypes.bool,
};

EmailField.defaultProps = {
  className: '',
  emailAddressPath: 'email',
  primaryPath: 'primary',
  label: '',
  emailInputClassName: '',
  emailPrimaryClassName: '',
  primary: true,
};

export default EmailField;
