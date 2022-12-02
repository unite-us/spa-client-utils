import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@unite-us/ui';

const acceptanceInfo = {
  accept: {
    text: 'Accepting referrals',
    icon: <Icon icon="IconCheckCircle" color="#117E15" className="mr-quarter" />,
  },
  deny: {
    text: 'Not accepting referrals',
    icon: <Icon icon="IconTimesCircle" color="#CF2A2A" className="mr-quarter" />,
  },
  deactivate: {
    text: 'Deactivated',
    icon: <Icon icon="IconMinusCircle" size={13.7} color="#CF2A2A" className="mr-quarter" />,
  },
};

function ProgramAcceptance(props) {
  const {
    receiving_referrals,
    status,
    hide_referrals,
    is_active,
  } = props;

  if (hide_referrals && !is_active) {
    return (
      <div className="program-acceptance mt-half">
        {
          acceptanceInfo.deactivate.icon
        }
        {
          <p>{acceptanceInfo.deactivate.text}</p>
        }
      </div>
    );
  }
  return (
    <div className="program-acceptance mt-half">
      {
        receiving_referrals ?
          acceptanceInfo.accept.icon :
          acceptanceInfo.deny.icon
      }
      { receiving_referrals ?
        <p>{acceptanceInfo.accept.text}</p> :
        <p>{acceptanceInfo.deny.text} {status && `(${status})`}</p>
      }
    </div>
  );
}

ProgramAcceptance.propTypes = {
  receiving_referrals: PropTypes.bool.isRequired,
  status: PropTypes.string,
  hide_referrals: PropTypes.bool,
  is_active: PropTypes.bool,
};

ProgramAcceptance.defaultProps = {
  status: '',
  hide_referrals: false,
  is_active: false,
};

export default ProgramAcceptance;
