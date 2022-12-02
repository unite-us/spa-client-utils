import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import { Divider } from '@unite-us/ui';
import ContactInformation from 'modules/contact/ContactInformation';
import DraftEditorField from 'modules/form/DraftEditorField';
import ServiceTypes from 'modules/ServiceTypes';

const ProgramDescription = (props) => {
  const {
    className,
    program: {
      description,
      email_addresses,
      phone_numbers,
      service_types,
      website_url,
    },
    showMore,
    sectionEmpty,
  } = props;

  const showContactInfo =
    !isEmpty(email_addresses) ||
    !isEmpty(phone_numbers) ||
    !isEmpty(website_url);

  return (
    <div className={classNames('program-description', className)} >
      {
        !isEmpty(service_types) && (
          <div className="program-description__service-types">
            <ServiceTypes serviceTypes={service_types} />
          </div>
        )
      }
      {
        showMore && (
          <div className={classNames({ hidden: !description })}>
            {!sectionEmpty.geography || !sectionEmpty.eligibility ?
              (<Divider className="program-description__divider" />) : null}
            {
              showContactInfo &&
                <ContactInformation
                  className="mb-two"
                  email_addresses={email_addresses}
                  headerText="Program Contact Information"
                  phone_numbers={phone_numbers}
                  showMore={showMore}
                  website_url={website_url}
                />
            }

            <h4 className="mb-half">Description</h4>
            <DraftEditorField
              className="mb-two"
              hideLabel
              id="program-description-text"
              label="Description"
              readOnly
              value={description}
            />
          </div>
        )
      }
    </div>
  );
};

ProgramDescription.propTypes = {
  className: PropTypes.string,
  program: PropTypes.shape({
    description: PropTypes.string,
    email_addresses: PropTypes.array,
    phone_numbers: PropTypes.array,
    service_types: PropTypes.array,
    website_url: PropTypes.string,
  }).isRequired,
  showMore: PropTypes.bool,
  sectionEmpty: PropTypes.object,
};

ProgramDescription.defaultProps = {
  className: '',
  originLatLng: [],
  showMore: false,
  sectionEmpty: {
    eligibility: false,
    geography: false,
  },
};

export default ProgramDescription;
