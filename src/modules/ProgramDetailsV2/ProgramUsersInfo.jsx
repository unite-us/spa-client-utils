import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@unite-us/ui';

const ProgramUsersInfo = (props) => {
  const {
    program: {
      receiving_referrals,
    },
    showProgramUsersInfo,
  } = props;

  if (!receiving_referrals || !showProgramUsersInfo) {
    return null;
  }

  return (
    <div className="program-details-user-info">
      <Icon
        className="program-details-user-info__icon"
        icon="V2Warning"
        color="#2C405A"
      />
      <div className="program-details-user-info__text">
        Please make sure at least one user from your organization is assigned to this program. Go to the Users tab to add users to your organization and assign them to programs.
      </div>
    </div>
  );
};

ProgramUsersInfo.propTypes = {
  program: PropTypes.shape({
    receiving_referrals: PropTypes.bool.isRequired,
  }).isRequired,
  showProgramUsersInfo: PropTypes.bool.isRequired,
};

export default ProgramUsersInfo;
