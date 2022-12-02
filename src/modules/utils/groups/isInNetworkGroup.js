import { get } from 'lodash';
import constants from 'modules/utils/constants';

export default function isInNetworkGroup(group) {
  return get(group, 'group_type') === constants.IN_NETWORK_GROUP_TYPE || get(group, 'licensed') === true;
}
