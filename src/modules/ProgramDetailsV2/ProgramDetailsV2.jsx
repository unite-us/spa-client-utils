import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import {
  Card,
  CardHeader,
  CardText,
  Divider,
  MoreOrLess,
} from '@unite-us/ui';
import Locations from 'modules/locations/Locations';
import ServiceAreas from 'modules/ServiceAreas';
import ProgramAcceptance from './ProgramAcceptance';
import ProgramDescription from './ProgramDescription';
import ProgramEligibility from './ProgramEligibility';
import ProgramUsersInfo from './ProgramUsersInfo';

const ProgramDetailsV2 = (props) => {
  const {
    className,
    clickableAddress,
    feeScheduleProgramIconDetails,
    initiallyCollapsed,
    isFeeScheduleProgram,
    openLink,
    originLatLng,
    program: {
      locations,
      service_areas,
      name,
      receiving_referrals,
      status,
      is_active,
    },
    program,
    sectionEmpty,
    rightHeaderComponent,
    showProgramUsersInfo,
  } = props;

  const RightHeaderComponent = rightHeaderComponent;

  const serviceAreas = (
    <>{!isEmpty(service_areas) && <ServiceAreas
      className="program-details__section"
      service_areas={service_areas}
    />}</>);

  return (
    <Card className={classNames('program-details', className)}>
      <CardHeader
        className={`program-details__header ${className}`}
        headerIconDetails={feeScheduleProgramIconDetails}
        showHeaderIcon={isFeeScheduleProgram}
        title={name}
      >
        <ProgramAcceptance
          receiving_referrals={receiving_referrals}
          status={status}
          hide_referrals
          is_active={is_active}
        />
        {rightHeaderComponent && <RightHeaderComponent />}
      </CardHeader>
      <CardText>
        { initiallyCollapsed ?
          <MoreOrLess>
            <ProgramUsersInfo program={program} showProgramUsersInfo={showProgramUsersInfo} />
            <ProgramDescription
              className="program-details__section"
              openLink={openLink}
              program={program}
              sectionEmpty={sectionEmpty}
            />

            { !isEmpty(locations) && <Divider className="program-details__divider" /> }

            <Locations
              className="program-details__section"
              clickableAddress={clickableAddress}
              locations={locations}
              originLatLng={originLatLng}
            />

            { (!isEmpty(locations) || !isEmpty(service_areas)) && <Divider className="program-details__divider" /> }

            {serviceAreas}

            { !isEmpty(service_areas) && <Divider className="program-details__divider" /> }

            <ProgramEligibility
              className="program-details__section"
              program={program}
              sectionEmpty={sectionEmpty}
            />
          </MoreOrLess> :

          <div>
            <ProgramUsersInfo program={program} showProgramUsersInfo={showProgramUsersInfo} />
            <ProgramDescription
              className="program-details__section"
              openLink={openLink}
              program={program}
              sectionEmpty={sectionEmpty}
              showMore
            />

            { !isEmpty(locations) && <Divider className="program-details__divider" /> }

            <Locations
              className="program-details__section"
              clickableAddress={clickableAddress}
              locations={locations}
              originLatLng={originLatLng}
              showMore
            />

            { (!isEmpty(locations) || !isEmpty(service_areas)) && <Divider className="program-details__divider" /> }

            {serviceAreas}

            { !isEmpty(service_areas) && <Divider className="program-details__divider" /> }

            <ProgramEligibility
              className="program-details__section"
              program={program}
              sectionEmpty={sectionEmpty}
              showMore
            />
          </div>
        }
      </CardText>
    </Card>
  );
};

ProgramDetailsV2.propTypes = {
  className: PropTypes.string,
  clickableAddress: PropTypes.bool,
  initiallyCollapsed: PropTypes.bool,
  openLink: PropTypes.func,
  originLatLng: PropTypes.array,
  isFeeScheduleProgram: PropTypes.bool,
  feeScheduleProgramIconDetails: PropTypes.object,
  program: PropTypes.shape({
    name: PropTypes.string,
    receiving_referrals: PropTypes.bool,
    status: PropTypes.string,
    is_active: PropTypes.bool,
    locations: PropTypes.array,
    service_areas: PropTypes.array,
  }).isRequired,
  sectionEmpty: PropTypes.shape({
    eligibility: PropTypes.bool,
    geography: PropTypes.bool,
  }),
  /**
   * Property to pass a component that will render in the header.
   * This feature is used to render an edit program link in the upper right.
   */
  rightHeaderComponent: PropTypes.func,
  showProgramUsersInfo: PropTypes.bool,
};

ProgramDetailsV2.defaultProps = {
  className: '',
  clickableAddress: false,
  feeScheduleProgramIconDetails: {},
  initiallyCollapsed: true,
  isFeeScheduleProgram: false,
  openLink: window.open,
  originLatLng: [],
  program: {},
  sectionEmpty: {
    eligibility: false,
    geography: false,
  },
  rightHeaderComponent: null,
  showProgramUsersInfo: false,
};

export default ProgramDetailsV2;
