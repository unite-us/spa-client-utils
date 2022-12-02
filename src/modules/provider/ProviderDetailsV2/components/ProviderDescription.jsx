import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { get, isEmpty } from 'lodash';
import DraftEditorField from 'modules/form/DraftEditorField';
import ExpandableContainer from 'modules/ExpandableContainer';
import HoursOfOperationV2 from 'modules/hours/HoursOfOperationV2';
import ContactInformation from 'modules/contact/ContactInformation';

const ProviderDescription = ({ className, provider, isInNetworkGroup, showMore }) => {
  const description = get(provider, 'description');

  const {
    email_addresses,
    phone_numbers,
    primary_contact_name,
    website_url,
  } = provider;

  const showContactInfo =
    !isEmpty(email_addresses) ||
    !isEmpty(phone_numbers) ||
    !isEmpty(primary_contact_name) ||
    !isEmpty(website_url);

  return (
    <div className={classNames('provider-description', className)} >
      <ExpandableContainer
        controlled
        hideToggle
        id="detail-description-expandable"
        isOpen={showMore}
        showGradient={false}
        useFirstChildHeight
      >
        {
          description &&
          <div className="provider-description__text">
            <DraftEditorField
              hideLabel
              id={`description-${get(provider, 'id')}`}
              label="Description"
              readOnly
              value={description}
            />
          </div>
        }

        {
          showContactInfo &&
            <ContactInformation
              email_addresses={email_addresses}
              headerText="Organization Contact Information"
              isInNetworkGroup={isInNetworkGroup}
              phone_numbers={phone_numbers}
              primary_contact_name={primary_contact_name}
              showMore={showMore}
              website_url={website_url}
            />
        }

        {
          !isEmpty(provider.hours) &&
            <HoursOfOperationV2
              className="ui-provider-card__hours"
              hours={provider.hours}
              isInNetworkGroup={isInNetworkGroup}
              showAll={showMore}
              showHoursIcon
              showMore={showMore}
              showToggle={showMore}
            />
        }
      </ExpandableContainer>
    </div>
  );
};

ProviderDescription.propTypes = {
  className: PropTypes.string,
  showMore: PropTypes.bool,
  provider: PropTypes.object.isRequired,
  isInNetworkGroup: PropTypes.bool,
};

ProviderDescription.defaultProps = {
  className: '',
  isInNetworkGroup: true,
  showMore: false,
};

export default ProviderDescription;
