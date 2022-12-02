import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isEmpty, sortBy } from 'lodash';
import {
  Card,
  CardHeader,
  CardText,
  Divider,
  MoreOrLess,
} from '@unite-us/ui';
import addresses from 'modules/utils/addresses';
import groups from 'modules/utils/groups';
import Locations from 'modules/locations/Locations';
import { ProviderDescription } from './components';

const ProviderDetailsV2 = (props) => {
  const {
    center,
    className,
    clickableAddress,
    initiallyCollapsed,
    openLink,
    provider,
    providerLocations,
    showMore,
    title,
  } = props;

  const originLatLng = [center.lat, center.lng];
  const calculatedDistances = providerLocations.map(
    address => addresses.calculateDistance(address, originLatLng),
  );
  const locationsByDistance = sortBy(calculatedDistances, add => add.distanceVal) || [];
  const isInNetworkGroup = groups.isInNetworkGroup(provider);

  return (
    <Card className={classNames('provider-details mb-one', className)}>
      <CardHeader
        className="provider-details__header"
        title={title}
      />
      <CardText>
        { initiallyCollapsed ?
          <MoreOrLess>
            <ProviderDescription
              className="provider-details__section"
              provider={provider}
              isInNetworkGroup={isInNetworkGroup}
              openLink={openLink}
            />

            { !isEmpty(providerLocations) && <Divider className="provider-details__divider" /> }

            <Locations
              className="provider-details__section"
              clickableAddress={clickableAddress}
              isInNetworkGroup={isInNetworkGroup}
              locations={locationsByDistance}
              showMore={showMore}
            />
          </MoreOrLess> :

          <div>
            <ProviderDescription
              className="provider-details__section"
              provider={provider}
              isInNetworkGroup={isInNetworkGroup}
              openLink={openLink}
              showMore
            />

            { !isEmpty(providerLocations) && <Divider className="provider-details__divider" /> }

            <Locations
              className="provider-details__section mb-one"
              clickableAddress={clickableAddress}
              isInNetworkGroup={isInNetworkGroup}
              locations={locationsByDistance}
              showMore
            />
          </div>
        }
      </CardText>
    </Card>
  );
};

ProviderDetailsV2.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  className: PropTypes.string,
  clickableAddress: PropTypes.bool,
  provider: PropTypes.object,
  initiallyCollapsed: PropTypes.bool,
  openLink: PropTypes.func,
  providerLocations: PropTypes.array,
  showMore: PropTypes.bool.isRequired,
  title: PropTypes.string,
};

ProviderDetailsV2.defaultProps = {
  center: { lat: 0, lng: 0 },
  className: '',
  clickableAddress: false,
  provider: {},
  initiallyCollapsed: true,
  openLink: window.open,
  providerLocations: [],
  title: 'About',
};

export default ProviderDetailsV2;
