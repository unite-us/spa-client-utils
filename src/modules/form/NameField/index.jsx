import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  InputField,
  SelectField,
} from '@unite-us/ui';
import ShowHide from 'modules/ShowHide';

const NameField = (props) => {
  const {
    id,
    className,
    firstNamePath,
    lastNamePath,
    middleNameInitPath,
    nicknamesPath,
    titlePath,
    titleOptions,
    titleLabelKey,
    titleValueKey,
    suffixOptions,
    suffixLabelKey,
    suffixValueKey,
    suffixPath,
    hideTitle,
    hideFirstName,
    hideLastName,
    hideMiddleName,
    hideSuffix,
    hideNicknames,
  } = props;

  const nameFieldClass = () => classNames({
    'ui-name-field': true,
  }, className);

  return (
    <div
      id={id}
      className={nameFieldClass()}
    >
      <ShowHide hide={hideTitle}>
        <SelectField
          id="title"
          name="title"
          label="Title"
          options={titleOptions}
          labelKey={titleLabelKey}
          valueKey={titleValueKey}
          {..._.get(props, titlePath, {})}
        />
      </ShowHide>

      <ShowHide hide={hideFirstName}>
        <InputField
          id="first-name"
          name="first_name"
          label="First Name"
          {..._.get(props, firstNamePath, {})}
        />
      </ShowHide>

      <ShowHide hide={hideLastName}>
        <InputField
          id="last-name"
          name="last_name"
          label="Last Name"
          {..._.get(props, lastNamePath, {})}
        />
      </ShowHide>

      <ShowHide hide={hideMiddleName}>
        <InputField
          id="middle-name-initial"
          name="middle-name-initial"
          label="Middle Initial"
          {..._.get(props, middleNameInitPath, {})}
        />
      </ShowHide>

      <ShowHide hide={hideSuffix}>
        <SelectField
          id="suffix"
          name="suffix"
          label="Suffix"
          options={suffixOptions}
          labelKey={suffixLabelKey}
          valueKey={suffixValueKey}
          {..._.get(props, suffixPath, {})}
        />
      </ShowHide>

      <ShowHide hide={hideNicknames}>
        <InputField
          id="nicknames"
          name="nick-names"
          label="Nicknames"
          {..._.get(props, nicknamesPath, {})}
        />
      </ShowHide>
    </div>
  );
};

NameField.propTypes = {
  /** id for reference */
  id: PropTypes.string.isRequired,
  /** className for reference */
  className: PropTypes.string,
  /** Path to first name field */
  firstNamePath: PropTypes.string,
  /** Path to last name field */
  lastNamePath: PropTypes.string,
  /** Path to middle name field */
  middleNameInitPath: PropTypes.string,
  /** Path to nick name field */
  nicknamesPath: PropTypes.string,
  /** Path to suffix field */
  suffixPath: PropTypes.string,
  /** Path tot title field */
  titlePath: PropTypes.string,
  /** select Value for suffix key */
  suffixLabelKey: PropTypes.string,
  /** Select options for suffix */
  suffixOptions: PropTypes.array,
  /** Select for suffix value */
  suffixValueKey: PropTypes.string,
  /** Select Value for title key */
  titleLabelKey: PropTypes.string,
  /** Select options for title */
  titleOptions: PropTypes.array,
  /** Select Value for title */
  titleValueKey: PropTypes.string,
  /** If true hides title */
  hideTitle: PropTypes.bool,
  /** If true hides first name */
  hideFirstName: PropTypes.bool,
  /** If true hides last name */
  hideLastName: PropTypes.bool,
  /** If true hides middle name */
  hideMiddleName: PropTypes.bool,
  /** If true hides suffix */
  hideSuffix: PropTypes.bool,
  /** If true hides nicknames */
  hideNicknames: PropTypes.bool,
};

NameField.defaultProps = {
  className: '',
  firstNamePath: 'first_name',
  lastNamePath: 'last_name',
  middleNameInitPath: 'middle_name_initial',
  nicknamesPath: 'nicknames',
  suffixLabelKey: 'display_name',
  suffixOptions: [],
  suffixPath: 'suffix',
  suffixValueKey: undefined,
  titleLabelKey: 'display_name',
  titleOptions: [],
  titlePath: '',
  titleValueKey: undefined,
  hideTitle: false,
  hideFirstName: false,
  hideLastName: false,
  hideMiddleName: false,
  hideSuffix: false,
  hideNicknames: false,
};

export default NameField;
