import { find, map } from 'lodash';

const getCCGroupIds = (networkId, networks) => map(
  (find(networks, { id: networkId }) || {}).coordination_centers || [],
  'id',
);

export default getCCGroupIds;
